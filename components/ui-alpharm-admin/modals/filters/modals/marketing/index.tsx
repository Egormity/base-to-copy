import { useModalStore } from "@store/modalStore";

import {
	Filter,
	useFilterMarketingStore,
} from "@/store/filters/marketingFilterStore";

import FilterContainer from "../../commons/FilterContainer";
import FilterModalItem from "../../commons/FilterModalItem";

import { useGetDataFilterMarketingCycle } from "./hooks/useGetDataFilterMarketingCycle";

const FilterModalMarketing = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-marketing"]?.isOpen || false;
	const toggleSidebar = () => toggleModal("filter-marketing");

	const { data, setSearchParam } = useGetDataFilterMarketingCycle({
		isOpen: isOpen,
	});

	const {
		applyFilters,
		appliedFilters,
		removesAppliedFilters,
		clearFilters,
		filters,
		addFilter,
		removeFilter,
	} = useFilterMarketingStore();

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
				filters={filters}
				addFilter={addFilter}
				label="Календарь"
				name={["StartDate", "EndDate"]}
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
					isSearchable={value.isSearchable}
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

export default FilterModalMarketing;
