import { create } from "zustand";
import { PaginationStore } from '../types/common';

export const usePagination = create<PaginationStore>((set) => ({
    pagination: 0,
    setPagination: (page) => set({pagination: page}),
}))