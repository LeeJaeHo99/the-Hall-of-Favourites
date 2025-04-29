import { create } from "zustand";
import { PaginationStore, IsSaturdayStore, IsSundayStore } from '../types/types';

export const usePagination = create<PaginationStore>((set) => ({
    pagination: 0,
    setPagination: (page) => set({pagination: page}),
}))

export const useIsSaturday = create<IsSaturdayStore>(set => ({
    isSaturday: new Date().getDay() === 6,
    setIsSaturday: () => set({ isSaturday: new Date().getDay() === 6 }),
}));

export const useIsSunday = create<IsSundayStore>(set => ({
    isSunday: new Date().getDay() === 0,
    setIsSunday: () => set({ isSunday: new Date().getDay() === 0 }),
}));