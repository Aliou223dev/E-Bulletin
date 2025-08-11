import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  UserCheck, 
  UserPlus, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Eye, 
  Check, 
  X,
  RotateCcw,
  UserX
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardAdmin() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newGestionnaire, setNewGestionnaire] = useState({
    nom: "",
    prenom: "",
    email: "",
    secteur: ""
  });

  // Mock data
  const admin = {
    nom: "DIALLO Seydou",
    role: "Administrateur Système"
  };

  const demandesAdhesion = [
    {
      id: 1,
      nom: "COULIBALY Mariam",
      matricule: "12345678",
      email: "mariam.coulibaly@gov.ml",
      dateNaissance: "1985-03-15",
      telephone: "+223 70 12 34 56",
      numeroNina: "1234567890123",
      dateDemande: "2024-01-15",
      statut: "En attente"
    },
    {
      id: 2,
      nom: "SIDIBÉ Ousmane",
      matricule: "87654321",
      email: "ousmane.sidibe@gov.ml",
      dateNaissance: "1990-07-22",
      telephone: "+223 75 98 76 54",
      numeroNina: "9876543210987",
      dateDemande: "2024-01-14",
      statut: "En attente"
    }
  ];

  const gestionnaires = [
    {
      id: 1,
      nom: "SANGARÉ Moussa",
      email: "moussa.sangare@gov.ml",
      secteur: "Direction Ressources Humaines",
      dateCreation: "2023-12-01",
      statut: "Actif"
    },
    {
      id: 2,
      nom: "BERTHÉ Aminata",
      email: "aminata.berthe@gov.ml",
      secteur: "Direction Financière",
      dateCreation: "2023-11-15",
      statut: "Inactif"
    }
  ];

  const handleApprouverDemande = (id: number, nom: string) => {
    toast({
      title: "Demande approuvée",
      description: `La demande de ${nom} a été approuvée avec succès.`,
    });
  };

  const handleRejeterDemande = (id: number, nom: string) => {
    toast({
      title: "Demande rejetée",
      description: `La demande de ${nom} a été rejetée.`,
      variant: "destructive"
    });
  };

  const handleCreateGestionnaire = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gestionnaire créé",
      description: `Le compte gestionnaire pour ${newGestionnaire.prenom} ${newGestionnaire.nom} a été créé.`,
    });
    setNewGestionnaire({ nom: "", prenom: "", email: "", secteur: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elegant">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Administration Système</h1>
            <p className="text-white/80">Bienvenue, {admin.nom}</p>
            <p className="text-white/60 text-sm">{admin.role}</p>
          </div>
          <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link to="/">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="demandes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demandes">
              <UserCheck className="h-4 w-4 mr-2" />
              Demandes
            </TabsTrigger>
            <TabsTrigger value="gestionnaires">
              <Users className="h-4 w-4 mr-2" />
              Gestionnaires
            </TabsTrigger>
            <TabsTrigger value="comptes">
              <Settings className="h-4 w-4 mr-2" />
              Gestion Comptes
            </TabsTrigger>
            <TabsTrigger value="creation">
              <UserPlus className="h-4 w-4 mr-2" />
              Nouveau Gestionnaire
            </TabsTrigger>
          </TabsList>

          <TabsContent value="demandes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Demandes d'Adhésion en Attente</CardTitle>
                <CardDescription>
                  Validez ou rejetez les demandes d'adhésion des agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demandesAdhesion.map((demande) => (
                    <Card key={demande.id} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                              <UserCheck className="h-6 w-6 text-accent" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{demande.nom}</h3>
                              <div className="text-sm text-muted-foreground space-y-1 mt-1">
                                <p>Matricule: {demande.matricule}</p>
                                <p>Email: {demande.email}</p>
                                <p>Téléphone: {demande.telephone}</p>
                                <p>Date de demande: {new Date(demande.dateDemande).toLocaleDateString('fr-FR')}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{demande.statut}</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Détails
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => handleApprouverDemande(demande.id, demande.nom)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approuver
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejeterDemande(demande.id, demande.nom)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gestionnaires" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Liste des Gestionnaires</CardTitle>
                <CardDescription>
                  Gérez les comptes gestionnaires existants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un gestionnaire..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {gestionnaires.map((gestionnaire) => (
                    <Card key={gestionnaire.id} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{gestionnaire.nom}</h3>
                              <p className="text-sm text-muted-foreground">{gestionnaire.email}</p>
                              <p className="text-sm text-muted-foreground">{gestionnaire.secteur}</p>
                              <p className="text-xs text-muted-foreground">
                                Créé le {new Date(gestionnaire.dateCreation).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant={gestionnaire.statut === "Actif" ? "default" : "secondary"}>
                              {gestionnaire.statut}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Réinitialiser MDP
                            </Button>
                            <Button 
                              size="sm" 
                              variant={gestionnaire.statut === "Actif" ? "destructive" : "default"}
                            >
                              {gestionnaire.statut === "Actif" ? (
                                <>
                                  <UserX className="h-4 w-4 mr-1" />
                                  Désactiver
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  Activer
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comptes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Comptes</CardTitle>
                <CardDescription>
                  Activation, désactivation et réinitialisation des comptes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Interface de gestion des comptes</p>
                  <p className="text-sm">Fonctionnalités à implémenter</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="creation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Créer un Compte Gestionnaire</CardTitle>
                <CardDescription>
                  Ajoutez un nouveau gestionnaire au système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateGestionnaire} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        value={newGestionnaire.prenom}
                        onChange={(e) => setNewGestionnaire({...newGestionnaire, prenom: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        value={newGestionnaire.nom}
                        onChange={(e) => setNewGestionnaire({...newGestionnaire, nom: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newGestionnaire.email}
                        onChange={(e) => setNewGestionnaire({...newGestionnaire, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secteur">Secteur de gestion</Label>
                      <Input
                        id="secteur"
                        value={newGestionnaire.secteur}
                        onChange={(e) => setNewGestionnaire({...newGestionnaire, secteur: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Créer le compte gestionnaire
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}