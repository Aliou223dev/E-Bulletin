import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Calendar, Phone, Mail, CreditCard, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAdhesion } from "@/contexts/AdhesionContext";
import { Adhesion } from "@/types/adhesion";
import { AdhesionStatus } from "@/types/adhesion";

export default function DemandeAdhesion() {
  const { toast } = useToast();
  const {sendAdhesion}= useAdhesion()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
       name:"",
       surname:"",
       matricule:"",
       nina:"",
       phone:"",
       birthDate:"",
       email:"",
       
  });

 const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
    setIsSubmitting(true)
     
     try {
       await sendAdhesion({
         ...formData,
         adhesionStatus: "PENDING", // Valeur par défaut
         id: "" // Généré côté serveur
       });
 
       toast({
         title: "Demande envoyée",
         description: "Votre demande a été envoyée, vous recevrez un mail dès qu'elle sera traitée"
       });
       setIsSubmitting(false);
       // Reset form
       setFormData({
          name:"",
          surname:"",
          matricule:"",
          nina:"",
          phone:"",
          birthDate:"",
          email:"",
       });
     } catch (error) {
       toast({
         title: "Erreur",
         description: "L'envoie de la demande a echouée",
         variant: "destructive"
       });
     }
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
                  <Label htmlFor="name">Prénom</Label>
                  <Input
                    id="name"
                    placeholder="Votre prénom"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Nom</Label>
                  <Input
                    id="surname"
                    placeholder="Votre nom de famille"
                    value={formData.surname}
                    onChange={(e) => handleInputChange("surname", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date de naissance
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Numéro de téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+223 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
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
                <Label htmlFor="nina" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Numéro NINA
                </Label>
                <Input
                  id="nina"
                  placeholder="Numéro d'identification nationale"
                  value={formData.nina}
                  onChange={(e) => handleInputChange("nina", e.target.value)}
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
                <Button type="submit" disabled={isSubmitting} className="flex-1" variant="government">
                  <UserPlus className="h-4 w-4 mr-2" />
                 {isSubmitting ? "Traitement…" : "Envoyer la demande"} 
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