import { create } from 'zustand'

import { appSlice } from './slices'
import { IAppSlice } from './types'

type TBoundStore = IAppSlice

export const useStore = create<TBoundStore>()((...args) => ({
    ...appSlice(...args)
}))
