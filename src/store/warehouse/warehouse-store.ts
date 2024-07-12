import { create } from 'zustand';

type NewWarehouseState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewWarehouse = create<NewWarehouseState>((set) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});
