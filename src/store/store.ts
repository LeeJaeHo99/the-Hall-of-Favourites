import { create } from "zustand";

export const usePagination = create((set) => ({
    pagination: 0,
    setPagination: (page) => set({pagination: page}),
}))