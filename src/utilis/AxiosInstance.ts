import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiResponse, ApiError } from '@/types/api'
export const BASE_URL = 'http://localhost:8080/api'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur de réponse pour gérer les erreurs (notamment 401)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>): AxiosResponse => response,

  async (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      console.warn('Session expirée.')

      if (!localStorage.getItem('logout_triggered')) {
        localStorage.setItem('logout_triggered', 'true')

        alert('Votre session a expiré, veuillez vous reconnecter.')

        // Redirige vers la page de login
        window.location.href = '/login'

        // Nettoyage pour éviter les boucles infinies
        setTimeout(() => {
          localStorage.removeItem('logout_triggered')
        }, 3000)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
