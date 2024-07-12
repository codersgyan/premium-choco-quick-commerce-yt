import { create } from 'zustand';

type NewInventoryState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewInventory = create<NewInventoryState>((set) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});
