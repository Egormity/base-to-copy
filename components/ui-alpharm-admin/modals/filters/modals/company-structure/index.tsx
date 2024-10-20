import { useModalStore } from "@store/modalStore";
import { FC } from "react";

import { useFilterDivisionEmployeeStore } from "@/store/filters/divisionEmployFilterStore";

import FilterContainer from "../../commons/FilterContainer";
import FilterModalItem from "../../commons/FilterModalItem";
import type { IFilterModal } from "../../commons/filter.interface";

import { getDataFilterCompanyStructure } from "./hooks/getDataFilterCompanyStructure";

const FilterModalDivisionEmployee: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-company-structure"]?.isOpen || false;
	const toggleSidebar = () => toggleModal("filter-company-structure");

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useFilterDivisionEmployeeStore();

	const { data, setSearchParam } = getDataFilterCompanyStructure({
		isOpen,
	});

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

			<FilterModalItem
				name="ShowNotActive"
				type="select"
				filters={filters}
				addFilter={addFilter}
				label="Показать неработающих"
				removeFilter={removeFilter}
			/>
		</FilterContainer>
	);
};

export default FilterModalDivisionEmployee;
