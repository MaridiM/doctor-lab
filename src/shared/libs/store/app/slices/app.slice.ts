import { StateCreator } from 'zustand'

import { IAppSlice } from '../types'

export const appSlice: StateCreator<IAppSlice> = (set, get) => ({
    // States
    isSidebarOpen: true,

    // Actions
    setIsSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
})
