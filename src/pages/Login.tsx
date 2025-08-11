import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt:", loginData);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Connexion</h1>
          <p className="text-muted-foreground mt-2">
            Accédez à votre espace personnel
          </p>
        </div>

        <Tabs defaultValue="agent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agent" className="text-xs">
              <UserPlus className="h-3 w-3 mr-1" />
              Agent
            </TabsTrigger>
            <TabsTrigger value="gestionnaire" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Gestionnaire
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agent">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  Espace Agent
                </CardTitle>
                <CardDescription>
                  Consultez vos bulletins de paie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-email">Email</Label>
                    <Input
                      id="agent-email"
                      type="email"
                      placeholder="votre.email@gov.ml"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-password">Mot de passe</Label>
                    <Input
                      id="agent-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="government">
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <Link to="/demande-adhesion" className="text-primary hover:underline text-sm">
                    Pas encore de compte ? Demander l'adhésion
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gestionnaire">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Espace Gestionnaire
                </CardTitle>
                <CardDescription>
                  Gérez les bulletins de votre secteur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gest-email">Email</Label>
                    <Input
                      id="gest-email"
                      type="email"
                      placeholder="gestionnaire@gov.ml"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gest-password">Mot de passe</Label>
                    <Input
                      id="gest-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Espace Administrateur
                </CardTitle>
                <CardDescription>
                  Administration complète du système
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@gov.ml"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Mot de passe</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="secondary">
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link to="/" className="text-muted-foreground hover:text-primary text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}