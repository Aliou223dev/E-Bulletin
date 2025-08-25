import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Download, User, Calendar, Eye, LogOut, Printer, Search, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardGestionnaire() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("");
  const { toast } = useToast();
   const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
   const { currentUser, logout } = useAuth();

  // Mock data
  const gestionnaire = {
    nom: "SANGARÉ Moussa",
    secteur: "Direction Ressources Humaines",
    ministere: "Ministère de l'Éducation Nationale"
  };

  const agents = [
    { id: 1, nom: "TRAORÉ Aminata", matricule: "12345678", grade: "Administrateur Civil", service: "DRH" },
    { id: 2, nom: "KEITA Mamadou", matricule: "87654321", grade: "Attaché d'Administration", service: "DRH" },
    { id: 3, nom: "COULIBALY Fatoumata", matricule: "11223344", grade: "Secrétaire Principal", service: "Comptabilité" },
    { id: 4, nom: "DIARRA Ibrahim", matricule: "44332211", grade: "Administrateur Civil", service: "DRH" },
  ];

  const bulletins = [
    { id: 1, agentId: 1, mois: "Janvier", annee: "2024", montant: "450,000", statut: "Disponible" },
    { id: 2, agentId: 1, mois: "Février", annee: "2024", montant: "450,000", statut: "Disponible" },
    { id: 3, agentId: 2, mois: "Janvier", annee: "2024", montant: "380,000", statut: "Disponible" },
    { id: 4, agentId: 2, mois: "Février", annee: "2024", montant: "380,000", statut: "En cours" },
  ];

  const filteredAgents = agents.filter(agent => 
    agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.matricule.includes(searchTerm)
  );
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
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elegant">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Espace Gestionnaire</h1>
            <p className="text-white/80">Bienvenue, {currentUser?.username}</p>
            <p className="text-white/60 text-sm">{currentUser?.role}</p>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link to="/">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bulletins" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bulletins">
              <FileText className="h-4 w-4 mr-2" />
              Les Bulletins
            </TabsTrigger>
            <TabsTrigger value="equipe">
              <Users className="h-4 w-4 mr-2" />
              Mon Équipe
            </TabsTrigger>
            {/* <TabsTrigger value="profil">
              <User className="h-4 w-4 mr-2" />
              Mon Profil
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="bulletins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulletins de Paie</CardTitle>
                <CardDescription>
                  Consultation des bulletins de paie des agents de votre secteur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Année</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mois</label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Tous les mois" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="00">Tous les mois</SelectItem>
                        <SelectItem value="01">Janvier</SelectItem>
                        <SelectItem value="02">Février</SelectItem>
                        <SelectItem value="03">Mars</SelectItem>
                        <SelectItem value="04">Avril</SelectItem>
                        <SelectItem value="05">Mai</SelectItem>
                        <SelectItem value="06">Juin</SelectItem>
                        <SelectItem value="07">Juillet</SelectItem>
                        <SelectItem value="08">Août</SelectItem>
                        <SelectItem value="09">Septembre</SelectItem>
                        <SelectItem value="10">Octobre</SelectItem>
                        <SelectItem value="11">Novembre</SelectItem>
                        <SelectItem value="12">Décembre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {bulletins.slice(0, 2).map((bulletin) => (
                    <Card key={bulletin.id} className="hover:shadow-card transition-shadow">
                      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Bulletin {bulletin.mois} {bulletin.annee}</h3>
                            <p className="text-sm text-muted-foreground">
                              Salaire net: {bulletin.montant} FCFA
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={bulletin.statut === "Disponible" ? "default" : "secondary"}>
                            {bulletin.statut}
                          </Badge>
                          {bulletin.statut === "Disponible" && (
                            <>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                              <Button size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Télécharger
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipe" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion de l'Équipe</CardTitle>
                <CardDescription>
                  Consultation et impression des bulletins des agents de votre secteur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par nom ou matricule..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredAgents.map((agent) => (
                    <Card key={agent.id} className="hover:shadow-card transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                          <div className="flex items-center gap-4 mb-4 sm:mb-0">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                              <User className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-medium">{agent.nom}</h3>
                              <p className="text-sm text-muted-foreground">
                                {agent.grade} • {agent.matricule}
                              </p>
                              <p className="text-xs text-muted-foreground">{agent.service}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Voir bulletins
                            </Button>
                            <Button size="sm">
                              <Printer className="h-4 w-4 mr-1" />
                              Imprimer
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

          {/* <TabsContent value="profil" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>
                  Vos informations d'identification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nom complet</label>
                    <p className="text-lg font-medium">{gestionnaire.nom}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Secteur de gestion</label>
                    <p className="text-lg font-medium">{gestionnaire.secteur}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Ministère</label>
                    <p className="text-lg font-medium">{gestionnaire.ministere}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button variant="outline">
                    Modifier mon profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}