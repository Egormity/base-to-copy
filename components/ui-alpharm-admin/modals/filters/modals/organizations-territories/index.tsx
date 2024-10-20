import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { FC } from "react";

import { useOrganizationTerritoriesFilterStore } from "@/store/filters/organizationTerritoriesFilterStore";

import FilterContainer from "../../commons/FilterContainer";
import styles from "../../commons/FilterModal.module.scss";
import FilterModalItem from "../../commons/FilterModalItem";
import type { IFilterModal } from "../../commons/filter.interface";

import { getDataFilterOrganizationTerritories } from "./hooks/getDataFilterOrganizationTerritories";

const FilterModalOrganizationTerritories: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-organizations-territories"]?.isOpen || false;
	const toggleSidebar = () => toggleModal("filter-organizations-territories");

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useOrganizationTerritoriesFilterStore();

	const { data, setSearchParam } = getDataFilterOrganizationTerritories({
		isOpen: isOpen,
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
		<>
			<div
				className={cn(styles["filter-wrapper"], {
					"w-[390px]": isOpen,
					"w-0": !isOpen,
				})}
			>
				{isOpen && (
					<FilterContainer
						isOpen={isOpen}
						handleApply={handleApply}
						handleClear={handleClear}
						toggleSidebar={toggleSidebar}
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
								//
								hasNextPage={value.hasNextPage}
								fetchNextPage={value.fetchNextPage}
								isFetchingNextPage={value.isFetchingNextPage}
							/>
						))}
					</FilterContainer>
				)}
			</div>
			{isOpen && (
				<div
					className={styles["bg-inset"]}
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

export default FilterModalOrganizationTerritories;
