import { useModalStore } from "@store/modalStore";
import { FC } from "react";

import { useFilterEmployStore } from "@/store/filters/employFilterStore";

import FilterContainer from "../../commons/FilterContainer";
import FilterModalItem from "../../commons/FilterModalItem";
import type { IFilterModal } from "../../commons/filter.interface";

import { getDataFilterEmployee } from "./hooks/getDataFilterEmployee";

const FilterModal: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-employee"]?.isOpen || false;
	const toggleSidebar = () => toggleModal("filter-employee");

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useFilterEmployStore();

	const { data, setSearchParam } = getDataFilterEmployee({
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

export default FilterModal;
