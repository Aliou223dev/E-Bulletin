import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Calendar, Phone, Mail, CreditCard, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function DemandeAdhesion() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    matricule: "",
    prenom: "",
    nom: "",
    dateNaissance: "",
    telephone: "",
    email: "",
    numeroNina: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic
    console.log("Demande d'adhésion:", formData);
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande d'adhésion a été transmise avec succès. Vous recevrez une réponse par email.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="container max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Demande d'Adhésion</h1>
          <p className="text-muted-foreground mt-2">
            Remplissez ce formulaire pour accéder à vos bulletins de paie
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-primary" />
              Informations personnelles
            </CardTitle>
            <CardDescription>
              Toutes les informations sont obligatoires pour valider votre identité
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="matricule" className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Matricule
                  </Label>
                  <Input
                    id="matricule"
                    placeholder="Ex: 12345678"
                    value={formData.matricule}
                    onChange={(e) => handleInputChange("matricule", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange("prenom", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom de famille"
                    value={formData.nom}
                    onChange={(e) => handleInputChange("nom", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateNaissance" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date de naissance
                  </Label>
                  <Input
                    id="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Numéro de téléphone
                  </Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="+223 XX XX XX XX"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange("telephone", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroNina" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Numéro NINA
                </Label>
                <Input
                  id="numeroNina"
                  placeholder="Numéro d'identification nationale"
                  value={formData.numeroNina}
                  onChange={(e) => handleInputChange("numeroNina", e.target.value)}
                  required
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Informations importantes :</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Votre demande sera examinée par l'administration</li>
                  <li>• Un email de confirmation vous sera envoyé</li>
                  <li>• Le traitement peut prendre 2-3 jours ouvrables</li>
                  <li>• Assurez-vous que toutes les informations sont correctes</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1" variant="government">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Envoyer la demande
                </Button>
                <Button type="button" variant="outline" className="flex-1" asChild>
                  <Link to="/login">
                    Déjà un compte ? Se connecter
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}