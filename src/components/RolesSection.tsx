import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, Shield, FileText, Printer, Settings, CheckCircle, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export const RolesSection = () => {
  const roles = [
    {
      icon: User,
      title: "Agent de l'État",
      description: "Consultation autonome de vos bulletins de paie",
      features: [
        "Demande d'adhésion en ligne",
        "Consultation par année et mois",
        "Gestion du profil personnel",
        "Accès sécurisé 24h/24"
      ],
      action: "Demander l'accès",
      variant: "government" as const
    },
    {
      icon: Users,
      title: "Gestionnaire RH",
      description: "Gestion des bulletins de votre secteur",
      features: [
        "Consultation de vos bulletins",
        "Impression des bulletins d'équipe",
        "Vue d'ensemble du secteur",
        "Rapports et statistiques"
      ],
      action: "Accès gestionnaire",
      variant: "default" as const
    },
    {
      icon: Shield,
      title: "Administrateur",
      description: "Administration complète du système",
      features: [
        "Validation des adhésions",
        "Création de comptes gestionnaires",
        "Activation/Désactivation",
        "Réinitialisation des mots de passe"
      ],
      action: "Accès admin",
      variant: "secondary" as const
    }
  ];

  return (
    <section id="roles" className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trois Niveaux d'Accès
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une solution adaptée à chaque profil utilisateur avec des fonctionnalités 
            spécifiques selon votre rôle dans l'administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] animate-slide-up bg-card border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{role.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={role.variant} 
                    className="w-full mt-6 gap-2"
                    asChild
                  >
                    <Link to={index === 0 ? "/demande-adhesion" : "/login"}>
                      {index === 0 && <UserPlus className="h-4 w-4" />}
                      {index === 1 && <Users className="h-4 w-4" />}
                      {index === 2 && <Settings className="h-4 w-4" />}
                      {role.action}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};