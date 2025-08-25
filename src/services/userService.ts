import { User, UserRole } from "@/types/user";
import axiosInstance from "@/utilis/AxiosInstance";
import { request } from "https";

export const getAllUsers = async (): Promise<User[] | null> => {
  const response = await axiosInstance.get('/admin/displayUsers')

  return response.data;
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const response = await axiosInstance.get(`/admin/displayUser/${userId}`);

  return response.data;
};
export const updateUser= async (userId: string,userData:User): Promise<User | null> => {
    const response = await axiosInstance.put(`/users/editUser/${userId}`,userData);

    return response.data;
}


export const createAgent = async (userData: User): Promise<User> => {
  const response = await axiosInstance.post(`/admin/createAgent`,userData)

  return response.data
}
export const blockUser= async (userId:string):Promise<User | null> =>{
  const response= await axiosInstance.patch(`/admin/blockUser/${userId}`)

  return response.data
}
export const unBlockUser= async (userId:string):Promise<User | null> =>{
  const response= await axiosInstance.patch(`/admin/unblockUser/${userId}`)

  return response.data
}
