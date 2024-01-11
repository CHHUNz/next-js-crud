import {create} from "zustand";

export const useUserStore = create<{
    updateData: any,
    open: boolean,
    isUpdate: boolean,
    setOpen: (open: boolean) => void
    setIsUpdate: (isUpdate: boolean) => void
    setUpdateData: (updateData: any) => void
}>(set => ({
    updateData: {},
    open: false,
    isUpdate: false,
    setOpen: (open: boolean) => set((state): any => ({...state, open})),
    setIsUpdate: (isUpdate: boolean) => set((state): any => ({...state, isUpdate})),
    setUpdateData: (updateData: any) => set((state): any => ({...state, updateData})),
}))
