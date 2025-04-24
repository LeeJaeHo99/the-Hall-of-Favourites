import { create } from "zustand";

export const usePagination = create((set) => ({
    pagination: 0,
    setPagination: (page) => set({pagination: page}),
}))

export const useIsSaturday = create(set => ({
    isSaturday: new Date().getDay() === 6,
    setIsSaturday: () => set({ isSaturday: new Date().getDay() === 6 }),
}));

export const useIsSunday = create(set => ({
    isSunday: new Date().getDay() === 0,
    setIsSunday: () => set({ isSunday: new Date().getDay() === 0 }),
}));