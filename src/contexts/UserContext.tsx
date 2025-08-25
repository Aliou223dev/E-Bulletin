import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import * as userService from '@/services/userService';

interface UserContextType {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  getUser: (userId: string) => Promise<User | null>;
  createUser: (userData: User) => Promise<User>;
  updateUser: (userId: string,userData:User) => Promise<User | null>;
  
  blockUser:(userId:string) => Promise<User | null>;
  unBlockUser:(userId:string) => Promise<User | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (userId: string): Promise<User | null> => {
    setLoading(true);
    try {
      const user = await userService.getUserById(userId);
      setCurrentUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError('Failed to fetch user');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: User): Promise<User> => {
    setLoading(true);
    try {
      const newUser = await userService.createAgent(userData);
      setUsers(prev => [...prev, newUser]);
      setError(null);
      return newUser;
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string,userData:User): Promise<User | null> => {
    setLoading(true);
    try {
      const updatedUser = await userService.updateUser(userId,userData);
      setUsers(prev => 
        prev.map(user => user.id === userId ? updatedUser : user)
      );
      if (currentUser?.id === userId) {
        setCurrentUser(updatedUser);
      }
      setError(null);
      return updatedUser;
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const blockUser = async (userId:string): Promise<User | null> => {
    setLoading(true);
    try {
      const updatedUser = await userService.blockUser(userId);
      setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: "BLOCKED" } : user
      )
    );
      if (currentUser?.id === userId) {
        setCurrentUser(updatedUser);
      }
      setError(null);
      
      return updatedUser;
    } catch (err) {
      setError('Failed to block user');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }
  const unBlockUser = async (userId:string): Promise<User | null> => {
    setLoading(true);
    try {
      const updatedUser = await userService.unBlockUser(userId);
     setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: "ACTIVE" } : user
      )
    );
      if (currentUser?.id === userId) {
        setCurrentUser(updatedUser);
      }
      setError(null);
      
      return updatedUser;
    } catch (err) {
      setError('Failed to unblock user');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  // Charge les utilisateurs au montage
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        loading,
        error,
        fetchUsers,
        getUser,
        createUser,
        updateUser,
       
        blockUser,
        unBlockUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};