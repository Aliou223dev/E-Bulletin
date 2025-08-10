import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import governmentEmblem from "@/assets/government-emblem.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={governmentEmblem} 
              alt="République Française" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">
                Bulletins de Paie
              </span>
              <span className="text-xs text-muted-foreground">
                Service de l'État
              </span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#fonctionnalites" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#roles" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Rôles
            </a>
            <a href="#securite" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Sécurité
            </a>
          </nav>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" className="gap-2">
              <LogIn className="h-4 w-4" />
              Se connecter
            </Button>
            <Button variant="government" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Demande d'adhésion
            </Button>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-background/95 backdrop-blur">
            <nav className="flex flex-col space-y-3">
              <a href="#fonctionnalites" className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                Fonctionnalités
              </a>
              <a href="#roles" className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                Rôles
              </a>
              <a href="#securite" className="px-3 py-2 text-sm font-medium hover:bg-accent rounded-md">
                Sécurité
              </a>
              <div className="pt-3 border-t flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start gap-2">
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </Button>
                <Button variant="government" className="justify-start gap-2">
                  <UserPlus className="h-4 w-4" />
                  Demande d'adhésion
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};