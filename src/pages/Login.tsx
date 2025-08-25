import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "../hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { register } from "module";
const loginSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

const Login = () => {
  const { login, isLoadingAuth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
 
  //const { theme } = useTheme();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);
    try {
      await login({
        email: values.email,
        password: values.password,
        role:"AGENT"
      });
      setIsSubmitting(true);
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à votre compte.",
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
      });
      setIsSubmitting(false);
    }
  }

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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agent-email">Email</Label>
                    <Input
                      id="agent-email"
                      type="email"
                      placeholder="votre.email@gov.ml"
                      autoComplete="email"
                      {...form.register("email")}
                      disabled={isLoadingAuth}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agent-password">Mot de passe</Label>
                    <Input
                      id="agent-password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="password"
                      {...form.register("password")}
                      disabled={isLoadingAuth}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="government" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LogIn className="mr-2 h-4 w-4 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Connexion
                      </>
                    )}
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gest-email">Email</Label>
                    <Input
                      id="gest-email"
                      type="email"
                      placeholder="gestionnaire@gov.ml"
                      autoComplete="email"
                      {...form.register("email")}
                      required
                      disabled={isLoadingAuth}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gest-password">Mot de passe</Label>
                    <Input
                      id="gest-password"
                      type="password"
                      placeholder="••••••••"
                      disabled={isLoadingAuth}
                      {...form.register("password")}
                      autoComplete="password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LogIn className="mr-2 h-4 w-4 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Connexion
                      </>
                    )}
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@gov.ml"
                      autoComplete="email"
                       {...form.register("email")} 
                      disabled={isLoadingAuth}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Mot de passe</Label>
                    <Input
                      id="admin-password"
                       placeholder="••••••••"
                      type="password"
                      autoComplete="password"
                      {...form.register("password")}
                      disabled={isLoadingAuth}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full"  disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LogIn className="mr-2 h-4 w-4 animate-spin" />
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Connexion
                      </>
                    )}
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
export default Login;