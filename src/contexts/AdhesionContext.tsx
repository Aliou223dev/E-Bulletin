import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as adhesionService from '@/services/adhesionService';
import { Adhesion } from '@/types/adhesion';

interface AdhesionContextType {
  adhesions: Adhesion[];
  loading: boolean;
  error: string | null;
  fetchAdhesions: () => Promise<void>;
  getAdhesion: (id: string) => Promise<Adhesion | null>;
  rejectAdhesion: (id: string) => Promise<void>;
  acceptAdhesion: (id: string) => Promise<void>;
  sendAdhesion:(adhesionData:Adhesion) => Promise<Adhesion | null>
  selectedAdhesion: Adhesion | null;
  setSelectedAdhesion: (adhesion: Adhesion | null) => void;
}

const AdhesionContext = createContext<AdhesionContextType | undefined>(undefined);

export const AdhesionProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    adhesions: [] as Adhesion[],
    loading: false,
    error: null as string | null,
    selectedAdhesion: null as Adhesion | null
  });

  const fetchAdhesions = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await adhesionService.getAllAdhesions();
      setState(prev => ({
        ...prev,
        adhesions: data || [],
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Erreur lors du chargement des demandes',
        loading: false
      }));
    }
  };
  const sendAdhesion= async (adhesionData:Adhesion) =>{
    setState(prev => ({ ...prev, loading: true }))
    try {
      const newAd= await adhesionService.sendAdhesion(adhesionData)
      setState(prev => ({ ...prev, newAd }))
      return newAd
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erreur lors de la récupération' }));
      return null;
    }finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }
  const getAdhesion = async (id: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const adhesion = await adhesionService.getAdhesionById(id);
      setState(prev => ({ ...prev, selectedAdhesion: adhesion }));
      return adhesion;
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Erreur lors de la récupération' }));
      return null;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const rejectAdhesion = async (id: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
    const updated=  await adhesionService.rejectAdhesionById(id);
      await fetchAdhesions(); // Rafraîchit la liste
      
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Échec du rejet de la demande' }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const acceptAdhesion = async (id: string) => {
    setState(prev => ({ ...prev, loading: true }));
    try {
    const updated=  await adhesionService.acceptAdhesionById(id);
      await fetchAdhesions(); // Rafraîchit la liste
     
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Échec de l\'acceptation' }));
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchAdhesions();
  }, []);

  return (
    <AdhesionContext.Provider
      value={{
        adhesions: state.adhesions,
        loading: state.loading,
        error: state.error,
        selectedAdhesion: state.selectedAdhesion,
        setSelectedAdhesion: (adhesion) => setState(prev => ({ ...prev, selectedAdhesion: adhesion })),
        fetchAdhesions,
        getAdhesion,
        rejectAdhesion,
        acceptAdhesion,
        sendAdhesion
      }}
    >
      {children}
    </AdhesionContext.Provider>
  );
};

export const useAdhesion = () => {
  const context = useContext(AdhesionContext);
  if (!context) {
    throw new Error('useAdhesion doit être utilisé dans AdhesionProvider');
  }
  return context;
};