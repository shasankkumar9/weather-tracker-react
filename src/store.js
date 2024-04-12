import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      userCoords: { latitude: null, longitude: null },
      setUserCoords: (userCoords) => set({ userCoords }),
      staleTime: 300000,
      setStaleTime: (staleTime) => set({ staleTime }),
    }),
    { name: 'user-data' },
  ),
);

export default useStore;
