import { useModalStore } from "@store/modalStore";

import { useFilterMarketingPlanStore } from "@/store/filters/marketingPlanFilterStore";

import FilterContainer from "../../commons/FilterContainer";
import FilterModalItem from "../../commons/FilterModalItem";

import { getDataFilterPlan } from "./hooks/getDataFilterPlan";

const FilterModalPlan = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-plans"]?.isOpen || false;
	const toggleSidebar = () => toggleModal("filter-plans");

	const { data, setSearchParam } = getDataFilterPlan({
		isOpen,
	});

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useFilterMarketingPlanStore();

	const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		applyFilters();
		toggleSidebar();
	};

	const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		clearFilters();
	};

	return (
		<FilterContainer
			isOpen={isOpen}
			toggleSidebar={toggleSidebar}
			handleApply={handleApply}
			handleClear={handleClear}
		>
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

export default FilterModalPlan;
