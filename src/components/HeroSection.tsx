import { Button } from "@/components/ui/button";
import { FileText, Shield, Users, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background avec overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Bâtiment gouvernemental français"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/80" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Consultation des Bulletins de Paie
            <span className="block text-accent mt-2">
              Agents de l'État
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Accédez à vos bulletins de salaire en ligne de manière sécurisée et autonome. 
            Une solution moderne pour les agents et gestionnaires de l'administration publique.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 animate-bounce-subtle"
              asChild
            >
              <Link to="/demande-adhesion">
                <FileText className="mr-2 h-5 w-5" />
                Demander l'accès
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <Link to="/login">
                <Users className="mr-2 h-5 w-5" />
                Espace Gestionnaire
              </Link>
            </Button>
          </div>

          {/* Points clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <Shield className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-white mb-1">Sécurisé</h3>
              <p className="text-white/80 text-sm">
                Authentification robuste et données chiffrées
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <Smartphone className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-white mb-1">Responsive</h3>
              <p className="text-white/80 text-sm">
                Accessible sur mobile, tablette et ordinateur
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
              <FileText className="h-8 w-8 text-accent mb-2" />
              <h3 className="font-semibold text-white mb-1">Autonome</h3>
              <p className="text-white/80 text-sm">
                Consultation libre 24h/24 et 7j/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};