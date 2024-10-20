import create from "zustand";

interface FilterState {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
}

export const useLibraryDropdownVisibility = create<FilterState>((set) => ({
	isVisible: false,

	setIsVisible: (isVisible: boolean): void => {
		set({ isVisible });
	},
}));
