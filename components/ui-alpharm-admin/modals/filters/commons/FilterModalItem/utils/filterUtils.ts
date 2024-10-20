import { Filter } from "@/store/filters/organizationFilterStore";

export const findFilter = (appliedFilters: Filter[], name: string) => {
	return appliedFilters.find((item) => item.name === name);
};

export const filterItemByFilter = (
	filter: Filter | undefined,
	itemField: Array<{ id: string }>
) => {
	if (
		filter &&
		itemField &&
		filter.values.length > 0 &&
		!filter.values.some((filterValue) =>
			//@ts-ignore
			itemField.some((value) => value.id === filterValue)
		)
	)
		return false;

	return true;
};

export const filterItemByFilterActive = (
	onlyActiveFilter: Filter | undefined,
	itemField: boolean | undefined
) => {
	if (onlyActiveFilter?.values[0] && !itemField) return false;

	return true;
};
