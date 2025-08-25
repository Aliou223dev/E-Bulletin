import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DemandeAdhesion from "./pages/DemandeAdhesion";
import DashboardAgent from "./pages/DashboardAgent";
import DashboardGestionnaire from "./pages/DashboardGestionnaire";
import DashboardAdmin from "./pages/DashboardAdmin";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { AdhesionProvider } from "./contexts/AdhesionContext";
import Profil from "./pages/Profil";
import { PrivateRoute, AdminRoute } from "./components/routing/ProtectedRoutes";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <UserProvider>
      <AdhesionProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/demande-adhesion" element={<DemandeAdhesion />} />
          <Route path="/dashboard-agent" element={<PrivateRoute><DashboardAgent /></PrivateRoute>} />
          <Route path="/dashboard-gestionnaire" element={<PrivateRoute><DashboardGestionnaire /></PrivateRoute>} />
          <Route path="/dashboard-admin" element={<PrivateRoute><DashboardAdmin /></PrivateRoute>} />
          <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AdhesionProvider>
    </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
