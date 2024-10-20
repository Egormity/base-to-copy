export interface IFilterModal {}

export interface IItemFilterModal {
	isSearchable?: boolean;
	label: string;
	type: "list" | "radio";
	variants: {
		label: string;
	}[];

	data: any;
}
