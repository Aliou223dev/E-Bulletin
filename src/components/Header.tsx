import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, FileText, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
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
              alt="République du Mali" 
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">
                E-Bulletin
              </span>
              <span className="text-xs text-muted-foreground">
                République du Mali
              </span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#fonctionnalites" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Fonctionnalités
            </a>
          </nav>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-3">
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
              <div className="pt-3 border-t flex flex-col space-y-2">
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
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};