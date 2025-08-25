export interface ApiResponse<T> {
    data: T
    message?: string
    success?: boolean
}

// export interface ApiError {

//     status: number
//     message: string
//     errors?: {
//       [field: string]: string[]
//     }
//     path: string
// }
// src/types/errors.ts (ou un nom similaire)

export interface ApiError {
  status: number;       
  message: string;      
  error?: string | Record<string, string> | any; 
  path: string;         
  timestamp?: string;    
}

// Une fonction utilitaire pour vérifier si un objet est une ApiError (type guard)
export function isApiError(error: any): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof error.status === 'number' &&
    typeof error.message === 'string' &&
    typeof error.path === 'string'
    // Vous pouvez ajouter d'autres vérifications si nécessaire
  );
}

// Si le champ 'error' est toujours un objet de type Record<string, string> pour les erreurs de validation
// Vous pourriez avoir un type plus spécifique pour cela :
export interface ValidationErrorDetail {
  [fieldName: string]: string; // ex: { email: "Email is required", password: "Password is required" }
}

export interface ValidationApiError extends Omit<ApiError, 'error'> {
  error: ValidationErrorDetail; // Surcharge le type de 'error'
}

export function isValidationApiError(error: any): error is ValidationApiError {
  return isApiError(error) && typeof error.error === 'object' && !Array.isArray(error.error);
}



  