import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/UserContext";
import { UserRole,UserRoleValues } from "@/types/user";

export function AgentCreationForm() {
  const { toast } = useToast();
  const { createUser } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agent, setAgent] = useState({
    username: "", // Correspond à nomComplet
    email: "",
    password: "", // Correspond à motDePasse
    utCompte: "", // Correspond à compteUtilisateur
    utTitrePoste: "", // Correspond à posteOccupe
    utTelephone: "", // Correspond à telephone
    utDateDebut: "", // Correspond à dateDebut
    utDateFin: "", // Correspond à dateFin
    utMatricule: "", // Correspond à matricule
    utNumOrdre: "", // Correspond à numeroOrdre
    role: UserRoleValues.AGENT // Valeur par défaut
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createUser({
        ...agent,
        status: "ACTIVE", // Valeur par défaut
        id: "" // Généré côté serveur
      });

      toast({
        title: "Agent créé",
        description: `Le compte agent pour ${agent.username} a été créé avec succès.`,
      });
      setIsSubmitting(false);
      // Reset form
      setAgent({
        username: "",
        email: "",
        password: "",
        utCompte: "",
        utTitrePoste: "",
        utTelephone: "",
        utDateDebut: "",
        utDateFin: "",
        utMatricule: "",
        utNumOrdre: "",
        role: UserRoleValues.AGENT
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "La création de l'agent a échoué",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setAgent(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nom Complet (UT_NOM_PRENOM) *</Label>
          <Input
            id="username"
            value={agent.username}
            onChange={(e) => handleChange("username", e.target.value)}
            maxLength={100}
            required
          />
          <span className="text-xs text-muted-foreground">
            {agent.username.length}/100 caractères
          </span>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={agent.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe *</Label>
          <Input
            id="password"
            type="password"
            value={agent.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="utCompte">Compte Utilisateur (UT_COMPTE) *</Label>
          <Input
            id="utCompte"
            value={agent.utCompte}
            onChange={(e) => handleChange("utCompte", e.target.value)}
            maxLength={30}
            required
          />
          <span className="text-xs text-muted-foreground">
            {agent.utCompte.length}/30 caractères
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="utTitrePoste">Poste Occupé (UT_TITRE_POSTE) *</Label>
          <Input
            id="utTitrePoste"
            value={agent.utTitrePoste}
            onChange={(e) => handleChange("utTitrePoste", e.target.value)}
            maxLength={100}
            required
          />
          <span className="text-xs text-muted-foreground">
            {agent.utTitrePoste.length}/100 caractères
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="utTelephone">Téléphone (UT_TELEPHONE) *</Label>
          <Input
            id="utTelephone"
            value={agent.utTelephone}
            onChange={(e) => handleChange("utTelephone", e.target.value)}
            maxLength={8}
            pattern="[0-9]{8}"
            required
          />
          <span className="text-xs text-muted-foreground">
            8 chiffres requis ({agent.utTelephone.length}/8)
          </span>
        </div>
      

        <div className="space-y-2">
          <Label htmlFor="utDateDebut">Date de Début (UT_DATE_DEBUT) *</Label>
          <Input
            id="utDateDebut"
            type="date"
            value={agent.utDateDebut}
            onChange={(e) => handleChange("utDateDebut", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="utDateFin">Date de Fin (UT_DATE_FIN)</Label>
          <Input
            id="utDateFin"
            type="date"
            value={agent.utDateFin}
            onChange={(e) => handleChange("utDateFin", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="utMatricule">Matricule (UT_MATRICULE) *</Label>
          <Input
            id="utMatricule"
            value={agent.utMatricule}
            onChange={(e) => handleChange("utMatricule", e.target.value)}
            maxLength={8}
            required
          />
          <span className="text-xs text-muted-foreground">
            {agent.utMatricule.length}/8 caractères
          </span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="utNumOrdre">Numéro d'Ordre (UT_NUM_ORDRE) *</Label>
          <Input
            id="utNumOrdre"
            type="number"
            value={agent.utNumOrdre}
            onChange={(e) => handleChange("utNumOrdre", e.target.value)}
            required
          />
        </div>
      </div>
      
      <Button 
      type="submit"
      disabled={isSubmitting}
      className="w-full">
        <UserPlus className="h-4 w-4 mr-2" />
        
        {isSubmitting ? "Traitement…" : "Créer le compte agent"} 
      </Button>
    </form>
  );
}