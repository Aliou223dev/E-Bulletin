import { useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, FileText, LogIn, UserPlus, LogOut, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import governmentEmblem from "@/assets/government-emblem.png";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [displayName, setDisplayName] = useState("Utilisateur");
  const { currentUser, isAuthenticated, isLoadingAuth, logout } = useAuth();
  const navigate = useNavigate();
   const  {toast} = useToast();

  const getDashboardRoute = () => {
    if (!currentUser?.role) return '/';
    
    switch (currentUser.role) {
      case 'AGENT': return '/dashboard-agent';
      case 'GESTIONNAIRE': return '/dashboard-gestionnaire';
      case 'ADMIN': return '/dashboard-admin';
      default: return '/';
    }
  };

  const getRoleLabel = () => {
    if (!currentUser?.role) return '';
    
    switch (currentUser.role) {
      case 'AGENT': return 'Agent';
      case 'GESTIONNAIRE': return 'Gestionnaire';
      case 'ADMIN': return 'Administrateur';
      default: return '';
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate('/login');
      toast({ title: "Déconnexion réussie" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la déconnexion"
      });
    }
  };
   // Synchronisation immédiate après connexion
  useEffect(() => {
    if (currentUser) {
      setDisplayName(
        currentUser.username
      );
    } else {
      setDisplayName("Utilisateur");
    }
  }, [currentUser, isAuthenticated]); // Déclenché quand currentUser ou isAuthenticated change

  // Chargement initial
  if (isLoadingAuth) {
    return <div className="h-16 border-b"></div>; // Squelette de chargement
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={governmentEmblem} 
              alt="République du Mali" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">E-Bulletin</span>
              <span className="text-xs text-muted-foreground">République du Mali</span>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User className="h-4 w-4" />
                    {displayName}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardRoute()} className="w-full">
                      Dashboard {getRoleLabel()}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profil" className="w-full">
                      Voir le profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="gap-2" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4" />
                    Se connecter
                  </Link>
                </Button>
                <Button variant="government" className="gap-2" asChild>
                  <Link to="/demande-adhesion">
                    <UserPlus className="h-4 w-4" />
                    Demande d'adhésion
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-background/95 backdrop-blur">
            <div className="pt-3 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="justify-start gap-2" asChild>
                    <Link to={getDashboardRoute()}>
                      <User className="h-4 w-4" />
                      Dashboard {getRoleLabel()}
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2" asChild>
                    <Link to="/profil">
                      <User className="h-4 w-4" />
                      Voir le profil
                    </Link>
                  </Button>
                  <Button variant="ghost" className="justify-start gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start gap-2" asChild>
                    <Link to="/login">
                      <LogIn className="h-4 w-4" />
                      Se connecter
                    </Link>
                  </Button>
                  <Button variant="government" className="justify-start gap-2" asChild>
                    <Link to="/demande-adhesion">
                      <UserPlus className="h-4 w-4" />
                      Demande d'adhésion
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};