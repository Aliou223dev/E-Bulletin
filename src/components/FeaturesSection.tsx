import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Download, Calendar, UserCheck, Lock, Monitor, Smartphone, Database } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Consultation Intuitive",
      description: "Interface simple et claire pour consulter vos bulletins de paie rapidement."
    },
    {
      icon: Search,
      title: "Recherche Avancée",
      description: "Filtrage par année et mois pour retrouver facilement les documents recherchés."
    },
    {
      icon: Download,
      title: "Téléchargement PDF",
      description: "Téléchargez et imprimez vos bulletins au format PDF haute qualité."
    },
    {
      icon: Calendar,
      title: "Historique Complet",
      description: "Accès à l'ensemble de votre historique de bulletins de paie."
    },
    {
      icon: UserCheck,
      title: "Gestion de Profil",
      description: "Mise à jour de vos informations personnelles en toute autonomie."
    },
    {
      icon: Lock,
      title: "Sécurité Renforcée",
      description: "Authentification forte et chiffrement des données sensibles."
    },
    {
      icon: Monitor,
      title: "Interface Responsive",
      description: "Optimisé pour tous les appareils : ordinateur, tablette, smartphone."
    },
    {
      icon: Database,
      title: "Données Fiables",
      description: "Synchronisation automatique avec les systèmes RH de l'administration."
    }
  ];

  return (
    <section id="fonctionnalites" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Fonctionnalités Principales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes les fonctionnalités conçues pour simplifier l'accès 
            à vos bulletins de paie et optimiser la gestion RH.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-card transition-all duration-300 hover:scale-[1.02] animate-slide-up bg-card border-border/50"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-foreground leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};