import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import axiosInstance from "@/utilis/AxiosInstance"; // Non utilisé directement ici
import { AuthContextType,LoginCredentials ,PasswordChangeRequest} from "@/types/auth";
import { User as UserProfile } from "@/types/user"; // UserRole non utilisé ici
import authService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
//import { Navigate, useNavigate } from "react-router-dom";
// import { error } from "console"; // Non utilisé

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Appel séquentiel géré dans authService
      return await authService.login(credentials);
    },
    onSuccess: (userProfile) => {
      setCurrentUser(userProfile);
    },
    onError: (error) => {
      setCurrentUser(null);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      setCurrentUser(null);
      // Redirection recommandée via react-router
      window.location.href = '/login'; 
    }
  });
  const changePasswordMutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Mot de passe modifié avec succès",
        variant: "default",
      });
      // Optionnel : forcer une reconnexion
      logout();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Échec de la modification du mot de passe",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    const verifyAuthStatus = async () => {
      setIsLoadingAuth(true);
      try {
        const user = await authService.getCurrentUserProfile();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      }
      setIsLoadingAuth(false);
    };
    verifyAuthStatus();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // loginMutation.mutateAsync s'occupera de mettre à jour currentUser via onSuccess
    await loginMutation.mutateAsync(credentials);
    // Pas besoin de checkAuthStatus() ici
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    // La redirection/rechargement est gérée dans onSuccess de logoutMutation si besoin
    // Pour une redirection plus propre avec React Router :
    // Dans le composant où logout est appelé, après await logout(), faire navigate('/login');
    // Pour l'instant, si logoutMutation gère location.reload(), c'est ok.
    // Sinon, si vous voulez forcer un rechargement après la mutation pour nettoyer l'état :
    if (!logoutMutation.isError) { // ou une condition plus précise
        window.location.href="/"; // Ou mieux, utiliser navigate de react-router-domain
        //navigate("/"); 
    }
  };
  const changePassword = async (request: PasswordChangeRequest) => {
    
    await changePasswordMutation.mutateAsync(request);
  };
  // checkAuthStatus est maintenant interne et appelé verifyAuthStatus
  // Si vous avez besoin de le réexécuter manuellement :
  const checkAuthStatus = async () => {
    setIsLoadingAuth(true);
    try {
      const userProfile: UserProfile = await authService.getCurrentUserProfile();
      setCurrentUser(userProfile);
    } catch (error) {
      console.warn("Échec du rafraîchissement du statut d'authentification:", error);
      setCurrentUser(null);
    }
    setIsLoadingAuth(false);
  };


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser, // Dérivé directement
        isLoadingAuth, // Pour le check initial de session
        login,
        logout,
        changePassword,
        // checkAuthStatus, // Remplacé par refreshAuthStatus si besoin d'exposer
        checkAuthStatus, // Exposer la fonction de rafraîchissement manuel
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
