export type UserRole= "AGENT" | "ADMIN" | "GESTIONNAIRE";
export type Status= "ACTIVE" | "BLOCKED";
export const UserRoleValues = {
  AGENT: "AGENT" as const,
  ADMIN: "ADMIN" as const,
  GESTIONNAIRE: "GESTIONNAIRE" as const
};
export interface User{
    id: string;
    email:string;
    username:string;
    role:UserRole;
    status:Status;
    utCompte:string;
    utTitrePoste:string;
    utTelephone:string;
    utDateDebut:string;
    utDateFin:string;
    utMatricule:string;
    utNumOrdre:string;
}

