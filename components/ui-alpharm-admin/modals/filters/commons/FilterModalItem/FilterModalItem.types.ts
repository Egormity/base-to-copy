import { Filter } from "@/store/filters/marketingFilterStore";

export type VariantDateFilter = "range" | "week" | "single" | "month" | null;
export interface IItemFilterModal {
	label: string;
	name: string | string[];
	value?: string;
	filters: Filter[];
	typeValue?: string;
	removeFilters?: any;
	type: "list" | "select" | "calendar" | "target";
	data?: { id: number | string; name: string; subtitle?: string }[];
	isLoading?: boolean;
	isSearchable?: boolean;
	onChange?:any;
	//
	appliedFilters?: any;
	addFilter: (name: string, value: number, itemName?: string) => void;
	removeFilter: (name: string, value?: number, itemName?: string) => void;
	//
	hasNextPage?: boolean;
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
}