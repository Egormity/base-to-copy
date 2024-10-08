export interface IFilterModal {}

export interface IItemFilterModal {
	isSearchable?: boolean;
	label: string;
	type: "list" | "radio";
	variants: Array<{
		label: string;
	}>;

	data: any;
}
