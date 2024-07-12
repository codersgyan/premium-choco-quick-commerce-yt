import { create } from 'zustand';

type NewDeliveryPersonState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewDeliveryPerson = create<NewDeliveryPersonState>((set) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});
