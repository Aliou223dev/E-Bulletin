import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import governmentEmblem from "@/assets/government-emblem.png";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Informations principales */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={governmentEmblem} 
                alt="République Française" 
                className="h-10 w-10 object-contain filter brightness-0 invert"
              />
              <div>
                <h3 className="text-lg font-bold">Bulletins de Paie</h3>
                <p className="text-sm opacity-80">Service numérique de l'État</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-4">
              Solution officielle de consultation des bulletins de paie pour les agents 
              de la fonction publique. Service sécurisé et conforme aux normes gouvernementales.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="opacity-80">Développé par :</span>
              <span className="font-semibold">Direction Numérique de l'État</span>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="font-semibold mb-4">Liens Utiles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
                  Guide d'utilisation
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
                  FAQ - Questions fréquentes
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
                  Politique de confidentialité
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
                  Mentions légales
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact et support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4" />
                <span>support.bulletins@gouv.fr</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-start gap-2 opacity-80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="leading-relaxed">
                  Direction Numérique<br />
                  75015 Paris, France
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Copyright et mentions */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 République Française. Tous droits réservés.</p>
          </div>
          <div className="flex items-center gap-6">
            <span>Version 1.0</span>
            <span>•</span>
            <span>Hébergé en France</span>
            <span>•</span>
            <span>Certifié SecNumCloud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};