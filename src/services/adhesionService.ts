import axiosInstance from "@/utilis/AxiosInstance";
import { Adhesion } from "@/types/adhesion";

export const getAllAdhesions = async (): Promise<Adhesion[] | null> => {
  const response = await axiosInstance.get('/admin/displayAllAdhesion')

  return response.data;
};
export const getAdhesionById = async (adhesionId: string): Promise<Adhesion | null> => {
  const response = await axiosInstance.get(`/admin/displayOneAdhesion/${adhesionId}`);

  return response.data;
};
export const rejectAdhesionById = async (adhesionId: string): Promise<Adhesion | null> => {
  const response = await axiosInstance.post(`/admin/rejectAdhesion/${adhesionId}`);

  return response.data;
};
export const acceptAdhesionById = async (adhesionId: string): Promise<Adhesion | null> => {
  const response = await axiosInstance.post(`/admin/acceptAdhesion/${adhesionId}`);

  return response.data;
};
export const sendAdhesion = async (adhesionData:Adhesion):Promise<Adhesion | null> => {
  const response = await axiosInstance.post(`/users/adhesion`,adhesionData);

  return response.data
}