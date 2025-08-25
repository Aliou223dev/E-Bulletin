import axiosInstance from "@/utilis/AxiosInstance";
import { LoginCredentials,PasswordChangeRequest } from "@/types/auth";

const authService = {
    login: async (data: LoginCredentials) => {
        try {
            // 1. Appel à /login (stocke le cookie HttpOnly automatiquement)
            await axiosInstance.post("/auth/login", data);
            
            // 2. Récupération des données utilisateur via /me
            const profileResponse = await axiosInstance.get('/auth/me');
            return profileResponse.data;
            
        } catch (error) {
            console.error(`Erreur de connexion: ${error}`);
            throw error;
        }
    },

    getCurrentUserProfile: async () => {
        try {
            const response = await axiosInstance.get('/auth/me');
            return response.data;
        } catch (error) {
            console.error('Erreur de récupération du profil:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            // Force une suppression côté client
            document.cookie = 'JWT_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    },
    changePassword: async (request: PasswordChangeRequest): Promise<void> => {
        try {
            const response = await axiosInstance.patch('/auth/change-password', request);
            return response.data;
        } catch (error) {
            console.error('Erreur lors du changement de mot de passe:', error);
            throw error;
        }
    }
};

export default authService;