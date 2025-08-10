import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from "lucide-react";

export const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Authentification Sécurisée",
      description: "Système de connexion robuste avec gestion des sessions sécurisées",
      details: [
        "Mots de passe chiffrés",
        "Sessions temporisées",
        "Protection anti-bruteforce"
      ]
    },
    {
      icon: Lock,
      title: "Chiffrement des Données",
      description: "Toutes les données sensibles sont chiffrées en transit et au repos",
      details: [
        "Chiffrement AES-256",
        "Connexion HTTPS/TLS",
        "Certificats sécurisés"
      ]
    },
    {
      icon: Eye,
      title: "Contrôle d'Accès",
      description: "Gestion fine des droits selon le rôle et le secteur de gestion",
      details: [
        "Accès par rôle défini",
        "Isolation des données",
        "Traçabilité des actions"
      ]
    },
    {
      icon: Server,
      title: "Infrastructure Sécurisée",
      description: "Hébergement sur des serveurs certifiés et conformes aux normes",
      details: [
        "Centres de données français",
        "Sauvegarde redondante",
        "Monitoring 24h/24"
      ]
    }
  ];

  const complianceItems = [
    "Conformité RGPD",
    "Normes de sécurité étatiques",
    "Audit de sécurité régulier",
    "Certification ISO 27001"
  ];

  return (
    <section id="securite" className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sécurité & Conformité
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La protection de vos données personnelles et professionnelles est notre priorité absolue. 
            Découvrez nos mesures de sécurité de niveau gouvernemental.
          </p>
        </div>

        {/* Fonctionnalités de sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] animate-slide-up bg-card border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Conformité */}
        <Card className="max-w-4xl mx-auto bg-card border-border/50 shadow-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-accent-foreground" />
            </div>
            <CardTitle className="text-2xl text-foreground">Conformité Réglementaire</CardTitle>
            <CardDescription className="text-muted-foreground">
              Respect strict des réglementations en vigueur pour la protection des données de l'administration publique
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complianceItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};