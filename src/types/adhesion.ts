export type AdhesionStatus= "PENDING" | "APPROVED" | "REJECTED";

export interface Adhesion{
    id:string;
    name:string;
    surname:string;
    matricule:string;
    nina:string;
    phone:string;
    birthDate:string;
    email:string;
    adhesionStatus:AdhesionStatus;
}