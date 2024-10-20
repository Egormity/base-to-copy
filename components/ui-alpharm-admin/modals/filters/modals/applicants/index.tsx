import { useModalStore } from "@store/modalStore";
import { FC } from "react";

import {
	Filter,
	useFilterApplicantsStore,
} from "@/store/filters/applicantsFilterStore";

import FilterContainer from "../../commons/FilterContainer";
import FilterModalItem from "../../commons/FilterModalItem";
import type { IFilterModal } from "../../commons/filter.interface";

import { getDataFilterApplicants } from "./hooks/getDataFilterApplicants";

const FilterModalApplicant: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();
	const isOpen = modals["filter-applicants"]?.isOpen || false;

	const toggleSidebar = () => toggleModal("filter-applicants");

	const {
		applyFilters,
		clearFilters,
		filters,
		addFilter,
		removeFilter,
		appliedFilters,
		removesAppliedFilters,
	} = useFilterApplicantsStore();

	const { data, setSearchParam } = getDataFilterApplicants({
		isOpen: isOpen,
	});

	const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		//
		const StartDateFilter = filters.filter(
			(item: Filter) => item.name === "StartDate"
		);

		const EndDateFilter = filters.filter(
			(item: Filter) => item.name === "EndDate"
		);

		if (StartDateFilter.length > 0 || EndDateFilter.length > 0)
			removesAppliedFilters(["StartDate", "EndDate"]);

		applyFilters();
		toggleSidebar();
	};

	const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		//
		clearFilters();
	};

	return (
		<FilterContainer
			isOpen={isOpen}
			toggleSidebar={toggleSidebar}
			handleApply={handleApply}
			handleClear={handleClear}
		>
			<FilterModalItem
				type="calendar"
				typeValue="id"
				label="Календарь"
				name={["StartDate", "EndDate"]}
				//
				filters={filters}
				addFilter={addFilter}
				removeFilter={removeFilter}
				appliedFilters={appliedFilters}
			/>

			{Object.entries(data).map(([key, value]) => (
				<FilterModalItem
					key={key}
					name={value.name}
					//@ts-ignore
					type={value.type}
					label={value.label}
					onChange={(valueSearch: string) =>
						setSearchParam((prev) => ({
							...prev,
							[key]: valueSearch,
						}))
					}
					//
					filters={filters}
					addFilter={addFilter}
					removeFilter={removeFilter}
					//
					data={value.data}
					value={value.searchParam}
					isLoading={value.isLoading}
					hasNextPage={value?.hasNextPage}
					fetchNextPage={value?.fetchNextPage}
					isFetchingNextPage={value?.isFetchingNextPage}
				/>
			))}
		</FilterContainer>
	);
};

export default FilterModalApplicant;
