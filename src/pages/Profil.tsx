import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";
const Profil = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isChanging,setIsChanging]= useState(false)
  const {updateUser}= useUser();
  const {currentUser,changePassword}= useAuth();
 
  // Simulation d'un utilisateur connecté
  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    utCompte:currentUser.utCompte,
    utTitrePoste:currentUser.utTitrePoste,
    utTelephone:currentUser.utTelephone,
    utDateDebut:currentUser.utDateDebut,
    utDateFin:currentUser.utDateFin,
    utMatricule:currentUser.utMatricule,
    utNumOrdre:currentUser.utNumOrdre,
  });
   const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
 const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        userId:""
      });
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setIsChanging(false);
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
    }
  };

  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsChanging(false);
  };


 
  const handleCancel = () => {
    setUser(user);
    setIsEditing(false);
  };
   const handleSave = async (userId:string) => {
     
    setIsEditing(true)
     
     try {
       await updateUser(userId,{
         ...user,
         role:currentUser.role ,// Valeur par défaut
         status:currentUser.status,
         id: "" // Généré côté serveur
       });
 
       toast({
         title: "Modification effectuée",
         description: "Votre modification du profil est un succes"
       });
       setIsEditing(false);
       // Reset form
      setUser(user)
     } catch (error) {
       toast({
         title: "Erreur",
         description: "La modification du profil a rencontré une erreur",
         variant: "destructive"
       });
     }
   };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
            <p className="text-muted-foreground">Gérez vos informations personnelles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="" alt={user.username} />
                  <AvatarFallback className="text-2xl">
                    {user.username.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user.username}</CardTitle>
              <CardDescription>{user.utTitrePoste}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-center text-sm text-muted-foreground">
                <p>Matricule: {user.utMatricule}</p>
                
              </div>
              <Separator />
              <div className="text-center">
                {/* <Button variant="outline" size="sm" className="w-full">
                  Changer la photo
                </Button> */}
              </div>
            </CardContent>
          </Card>

          {/* Main Profile Section */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>
                  {isEditing ? "Modifiez vos informations" : "Vos informations d'identification"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(currentUser.id)}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">Nom complet</Label>
                  {isEditing ? (
                    <Input
                      id="nom"
                      value={user.username}
                      onChange={(e) => setUser({...user, username: e.target.value})}
                      maxLength={100}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{user.username}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{user.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="matricule">Matricule</Label>
                  <p className="text-lg font-medium mt-1 text-muted-foreground">{user.utMatricule}</p>
                  <small className="text-xs text-muted-foreground">Non modifiable</small>
                </div>

                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  {isEditing ? (
                    <Input
                      id="telephone"
                      value={user.utTelephone}
                      onChange={(e) => setUser({...user, utTelephone: e.target.value})}
                      maxLength={8}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{user.utTelephone}</p>
                  )}
                </div>

                {/* <div>
                  <Label htmlFor="grade">Grade</Label>
                  {isEditing ? (
                    <Input
                      id="grade"
                      value={editData.grade}
                      onChange={(e) => setEditData({...editData, grade: e.target.value})}
                      maxLength={100}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{user.grade}</p>
                  )}
                </div> */}

                <div>
                  <Label htmlFor="poste">Poste Occupé</Label>
                  {isEditing ? (
                    <Input
                      id="poste"
                      value={user.utTitrePoste}
                      onChange={(e) => setUser({...user, utTitrePoste: e.target.value})}
                      maxLength={100}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{user.utTitrePoste}</p>
                  )}
                </div>

                {/* <div>
                  <Label htmlFor="ministere">Ministère</Label>
                  {isEditing ? (
                    <Input
                      id="ministere"
                      value={editData.ministere}
                      onChange={(e) => setEditData({...editData, ministere: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">{user.ministere}</p>
                  )}
                </div> */}

                <div>
                  <Label htmlFor="numeroOrdre">Numéro d'Ordre</Label>
                  <p className="text-lg font-medium mt-1 text-muted-foreground">{user.utNumOrdre}</p>
                  <small className="text-xs text-muted-foreground">Non modifiable</small>
                </div>

                <div>
                  <Label htmlFor="dateDebut">Date de Début</Label>
                  {isEditing ? (
                    <Input
                      id="dateDebut"
                      type="date"
                      value={user.utDateDebut}
                      onChange={(e) => setUser({...user, utDateDebut: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">
                      {new Date(user.utDateDebut).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="dateFin">Date de Fin</Label>
                  {isEditing ? (
                    <Input
                      id="dateFin"
                      type="date"
                      value={user.utDateFin}
                      onChange={(e) => setUser({...user, utDateFin: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium mt-1">
                      {new Date(user.utDateFin).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
            <CardDescription>Gérez vos paramètres de sécurité</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mot de passe</p>
                <p className="text-sm text-muted-foreground">
                  {isChanging ? "Entrez vos nouveaux identifiants" : "Dernière modification il y a 30 jours"}
                </p>
              </div>
              {!isChanging ? (
                <Button size="sm" variant="outline" onClick={() => setIsChanging(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Changer le mot de passe
                </Button>
              ) : null}
            </div>

            {isChanging && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mot de passe actuel *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmez le nouveau mot de passe *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handlePasswordChange}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button size="sm" variant="outline" onClick={handlePasswordCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Separator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profil;