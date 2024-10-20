import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { type FC, useEffect, useState } from "react";

import { useOrganizationTargetFilterStore } from "@/store/filters/organizationTargetStore";

import FilterContainer from "../../commons/FilterContainer";
import styles from "../../commons/FilterModal.module.scss";
import FilterModalItem from "../../commons/FilterModalItem";
import FilterTargetItem from "../../commons/FilterTargetItem";
import FilterTargetPanel from "../../commons/FilterTargetPanel";
import type { IFilterModal } from "../../commons/filter.interface";

import { getDataFilterOrganizations } from "./hooks/getDataFilterOrganizations";

const FilterModalOrganizationsTargetPanel: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-organizations-target-panel"]?.isOpen || false;
	const toggleSidebar = () => toggleModal("filter-organizations-target-panel");

	const [allTargetsSelected, setAllTargetsSelected] = useState(false);
	const [isTarget, setIsTarget] = useState(false);

	const {
		applyFilters,
		clearFilters,
		filters,
		appliedFilters,
		addFilter,
		removeFilter,
		changeFilter,
		deleteFilter,
	} = useOrganizationTargetFilterStore();

	const { data, setSearchParam } = getDataFilterOrganizations({
		filters: filters,
		isOpen: isOpen,
	});

	useEffect(() => {
		filters.find((item) => item.name === "masterInstitutionTypeIds")?.values;
	}, [filters]);

	const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		//
		applyFilters();
		toggleSidebar();
	};

	const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		//
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
					<>
						{isTarget ? (
							<FilterTargetPanel
								setIsTarget={setIsTarget}
								allTargetsSelected={allTargetsSelected}
								setAllTargetsSelected={setAllTargetsSelected}
								//
								filters={filters}
								addFilter={addFilter}
								removeFilter={removeFilter}
							/>
						) : (
							<FilterContainer
								isOpen={isOpen}
								toggleSidebar={toggleSidebar}
								handleApply={handleApply}
								handleClear={handleClear}
							>
								{Object.entries(data).map(([key, value]) =>
									value.type === "target" ? (
										<FilterTargetItem
											filters={filters}
											appliedFilters={appliedFilters}
											deleteFilter={deleteFilter}
											changeFilter={changeFilter}
											removeFilter={removeFilter}
											//
											setIsTarget={setIsTarget}
											setAllTargetsSelected={setAllTargetsSelected}
										/>
									) : (
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
									)
								)}
							</FilterContainer>
						)}
					</>
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

export default FilterModalOrganizationsTargetPanel;
