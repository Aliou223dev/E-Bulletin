import { useState ,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {User} from "@/types/user"
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
  UserX,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AgentCreationForm } from "@/components/AgentCreationForm";
import { DetailModal } from "@/components/DetailModal";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdhesion } from '@/contexts/AdhesionContext';
import { useUser } from "@/contexts/UserContext";

export default function DashboardAdmin() {
  const { toast } = useToast();
   const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
   const { currentUser, logout } = useAuth();
   const {users,getUser,blockUser,unBlockUser,fetchUsers}= useUser();
  const [selectedAdhesion, setSelectedAdhesion] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { adhesions, acceptAdhesion, rejectAdhesion ,getAdhesion} = useAdhesion();
  const [newGestionnaire, setNewGestionnaire] = useState({
    nom: "",
    prenom: "",
    email: "",
    secteur: ""
  });
  const [initialLoad, setInitialLoad] = useState(true);


  // Mock data
  const admin = {
    nom: "DIALLO Seydou",
    role: "Administrateur Système"
  };

  // const demandesAdhesion = [
  //   {
  //     id: 1,
  //     nom: "COULIBALY Mariam",
  //     matricule: "12345678",
  //     email: "mariam.coulibaly@gov.ml",
  //     dateNaissance: "1985-03-15",
  //     telephone: "+223 70 12 34 56",
  //     numeroNina: "1234567890123",
  //     dateDemande: "2024-01-15",
  //     statut: "En attente"
  //   },
  //   {
  //     id: 2,
  //     nom: "SIDIBÉ Ousmane",
  //     matricule: "87654321",
  //     email: "ousmane.sidibe@gov.ml",
  //     dateNaissance: "1990-07-22",
  //     telephone: "+223 75 98 76 54",
  //     numeroNina: "9876543210987",
  //     dateDemande: "2024-01-14",
  //     statut: "En attente"
  //   }
  // ];

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

  const handleAcceptedAdhesion =  async (adhesionId: string)=> {
    setLoading(true)
    try {
     await acceptAdhesion(adhesionId)
      
           toast({
      title: "Demande approuvée",
      description: `La demande a été approuvée avec succès.`,
    });
      
    } catch (error) {
      
    }
    setLoading(false)
   
  };

  const handleRejectedAdhesion =  async (adhesionId: string) => {
    setLoading(true)
    try {
       await rejectAdhesion(adhesionId)
      
      toast({
      title: "Demande rejetée",
      description: `La demande a été rejetée.`,
      variant: "destructive"
    });
      
      
    } catch (error) {
      console.error("Erreur lors du rejet:", error);
    }
    setLoading(false)
   
  };
  const handleBlock = async (userId: string) => {
    setLoading(true);
  try {
    const user = users.find(u => u.id === userId);
    // Vérification frontale avant l'appel API
    if (user?.status === "BLOCKED") {
      toast({
        title: "Déjà bloqué",
        description: "Cet utilisateur est déjà bloqué",
        variant: "destructive"
      });
      return;
    }
    
    await blockUser(userId);
    toast({ title: "Utilisateur bloqué avec succès" });
  } catch (error) {
    toast({
      title: "Erreur",
      description: error.response?.data?.message || "Échec du blocage",
      variant: "destructive"
    });
  }finally {
    setLoading(false);
  }
};

const handleUnBlock = async (userId: string) => {
  try {
    const user = users.find(u => u.id === userId);
    // Vérification frontale avant l'appel API
    if (user?.status === "ACTIVE") {
      toast({
        title: "Déjà actif", 
        description: "Cet utilisateur est déjà actif",
        variant: "default"
      });
      return;
    }
    
    await unBlockUser(userId);
    toast({ title: "Utilisateur débloqué avec succès" });
  } catch (error) {
    toast({
      title: "Erreur",
      description: error.response?.data?.message || "Échec du déblocage",
      variant: "destructive"
    });
  }
};


  const handleCreateGestionnaire = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Gestionnaire créé",
      description: `Le compte gestionnaire pour ${newGestionnaire.prenom} ${newGestionnaire.nom} a été créé.`,
    });
    setNewGestionnaire({ nom: "", prenom: "", email: "", secteur: "" });
  };

  const handleVoirDetails = async (adhesionId: string) => {
    try {
      const adhesionDetails = await getAdhesion(adhesionId);
      if (adhesionDetails) {
        setSelectedAdhesion(adhesionDetails);
        setIsDetailModalOpen(true);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails:", error);
      // Vous pouvez aussi ajouter un toast d'erreur ici
    }
  };
const handleLogout = async () => {
    try {
      logout();
      navigate('/login');
      toast({ title: "Déconnexion réussie" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la déconnexion"
      });
    }
  };
  if (!currentUser) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Chargement des données utilisateur...</p>
    </div>
  );
}

if (currentUser.role !== "ADMIN") {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Accès non autorisé</p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elegant">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Administration Système</h1>
            <p className="text-white/80">Bienvenue, {currentUser?.username}</p>
            <p className="text-white/60 text-sm">{currentUser?.role}</p>
          </div>
          <Button 
          variant="ghost" className="text-white hover:bg-white/20" asChild onClick={handleLogout}>
            <Link to="/login">
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
                  {adhesions.map((adhesion) => {
                    // Ajoutez ce log pour voir le statut de chaque adhésion
                    console.log(`Adhésion ID: ${adhesion.id}, Statut: ${adhesion.adhesionStatus}`);
                    
                    return (
                      <Card key={adhesion.id} className="hover:shadow-card transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <UserCheck className="h-6 w-6 text-accent" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{adhesion.name}<span>  </span>{adhesion.surname}</h3>
                                <div className="text-sm text-muted-foreground space-y-1 mt-1">
                                  <p>Matricule: {adhesion.matricule}</p>
                                  <p>Email: {adhesion.email}</p>
                                  <p>Téléphone: {adhesion.phone}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                adhesion.adhesionStatus === "APPROVED" ? "default" :
                                adhesion.adhesionStatus=== "REJECTED" ? "destructive" : 
                                "secondary"
                              }>
                                {adhesion.adhesionStatus}
                              </Badge>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  console.log(`Détails demandés pour adhésion ID: ${adhesion.id}, Statut: ${adhesion.adhesionStatus}`);
                                  handleVoirDetails(adhesion.id);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Détails
                              </Button>

                              {/* Bouton Approuver */}
                              {adhesion.adhesionStatus !== "REJECTED" && (
                                <Button 
                                  size="sm" 
                                  onClick={() => {
                                    console.log(`Tentative d'approbation pour adhésion ID: ${adhesion.id}, Statut actuel: ${adhesion.adhesionStatus}`);
                                    adhesion.adhesionStatus !== "APPROVED" && handleAcceptedAdhesion(adhesion.id);
                                  }}
                                  className={`bg-primary hover:bg-primary/90 ${
                                    adhesion.adhesionStatus=== "APPROVED" ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                                  disabled={adhesion.adhesionStatus === "APPROVED"||loading}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  
                                  {adhesion.adhesionStatus=== "APPROVED" ? "Approuvé" : "Approuver"}
                                
                                </Button>
                              )}

                              {/* Bouton Rejeter */}
                              {adhesion.adhesionStatus!== "APPROVED" && (
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    console.log(`Tentative de rejet pour adhésion ID: ${adhesion.id}, Statut actuel: ${adhesion.adhesionStatus}`);
                                    adhesion.adhesionStatus !== "REJECTED" && handleRejectedAdhesion(adhesion.id);
                                  }}
                                  className={adhesion.adhesionStatus === "REJECTED" ? "opacity-50 cursor-not-allowed" : ""}
                                  disabled={adhesion.adhesionStatus=== "REJECTED"||loading}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                 
                                  {adhesion.adhesionStatus === "REJECTED" ? "Rejeté" : "Rejeter"}
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
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
                  Activation et désactivation des comptes
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
                  {users.map((user) => (
                    <Card key={user.id} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Users className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{user.username}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              {/* <p className="text-sm text-muted-foreground">{gestionnaire.secteur}</p> */}
                              <p className="text-xs text-muted-foreground">
                                Créé le {new Date(user.utDateDebut).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant={user.status === "ACTIVE" ? "default" : "secondary"}>
                              {user.status ==="ACTIVE"?"actif":"bloqué"}
                            </Badge> 
                            {/* <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Réinitialiser MDP
                            </Button> */}
                            
                            {user.status === "ACTIVE" ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={async () => {
                                  await handleBlock(user.id);
                                  // Optionnel: Recharger les données ou mettre à jour l'état local
                                }}
                                className="flex items-center gap-1"
                              >
                                <UserX className="h-4 w-4" />
                                Désactiver
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={async () => {
                                  await handleUnBlock(user.id); 
                                  // Optionnel: Recharger les données ou mettre à jour l'état local
                                }}
                                className="flex items-center gap-1"
                              >
                                <UserCheck className="h-4 w-4" />
                                Activer
                              </Button>
                            )}
                            
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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

            {/* Section Création Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Créer un Compte Agent</CardTitle>
                <CardDescription>
                  Ajoutez un nouvel agent au système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgentCreationForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <DetailModal
        demande={selectedAdhesion}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onApprove={handleAcceptedAdhesion}
        onReject={handleRejectedAdhesion}
      />
    </div>
  );
}