import {User as UserProfile,UserRole} from "@/types/user"


export interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean; // Pour le chargement initial du profil ou pendant le login/logout
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
   changePassword: (request: PasswordChangeRequest) => Promise<void>; 
  checkAuthStatus: () => Promise<void>; // Pour vérifier si l'utilisateur est déjà logué au chargement de l'app
}


export interface LoginCredentials {
    email: string;
    password: string;
    role:UserRole
}
export interface PasswordChangeRequest {
    userId: string;
    currentPassword: string; // Envoyé en clair de manière sécurisée (HTTPS)
    newPassword: string;     // Idem
}