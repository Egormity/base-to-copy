export interface IFilterModal {}

export interface IItemFilterModal {
	isSearchable?: boolean;
	name: string;
	label: string;
	type: "list" | "radio";

	data: [];
}
