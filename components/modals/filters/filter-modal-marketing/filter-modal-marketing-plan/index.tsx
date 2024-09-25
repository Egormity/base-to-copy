import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { useState } from "react";

import { useFilterMarketingPlanStore } from "@/store/filters/marketingPlanFilterStore";

import { useGetDictionariesTerritories } from "@/api/dictionaries";

import styles from "../FilterModal.module.scss";
import { FilterModalItem } from "../FilterModalItem";

const FilterModal = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-marketing-plan"]?.isOpen;
	const toggleSidebar = () => toggleModal("filter-marketing-plan");

	const [searchTerritories, setSearchTerritories] = useState("");

	const { items: territories, isLoading: isLoadingTerritories } =
		useGetDictionariesTerritories(searchTerritories);

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
		<>
			<div
				className={cn(styles["filter-wrapper"], {
					"w-[390px]": isOpen,
					"w-0": !isOpen,
				})}
			>
				{isOpen && (
					<>
						<div className={styles["filter-header"]}>
							<h1>Фильтр</h1>
							<CrossIcon onClick={toggleSidebar} />
						</div>
						<form>
							<div className="overflow-auto max-h-[calc(100vh-204px)] no-scrollbar">
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchTerritories}
									addFilter={addFilter}
									label="Статус"
									name="Status"
									onChange={setSearchTerritories}
									isLoading={isLoadingTerritories}
									removeFilter={removeFilter}
									data={territories}
									setDatesTemporal={undefined}
									temporalDefaultValue={undefined}
									setTemporalType={undefined}
									temporalDefaultCalendarType={undefined}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchTerritories}
									addFilter={addFilter}
									label="Целевая группа"
									name="Status"
									onChange={setSearchTerritories}
									isLoading={isLoadingTerritories}
									removeFilter={removeFilter}
									data={territories}
									setDatesTemporal={undefined}
									temporalDefaultValue={undefined}
									setTemporalType={undefined}
									temporalDefaultCalendarType={undefined}
								/>
							</div>
							<div className={styles["wrapper-buttons"]}>
								<button
									className={styles["button-apply"]}
									onClick={handleApply}
									children={"Применить"}
								/>

								<button
									className={styles["button-cancel"]}
									onClick={handleClear}
									children={"Сбросить"}
								/>
							</div>
						</form>
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

export default FilterModal;
