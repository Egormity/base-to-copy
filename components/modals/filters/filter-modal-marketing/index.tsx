import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { useState } from "react";

import { useFilterMarketingStore } from "@/store/filters/marketingFilterStore";

import { useGetDictionariesDivisions } from "@/api/dictionaries";
import { useGetMarketingCycleStatuses } from "@/api/dictionaries/marketingcycle-statuses/get";

import styles from "./FilterModal.module.scss";
import { FilterModalItem } from "./FilterModalItem";

const FilterModalMarketing = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-marketing"]?.isOpen;
	const toggleSidebar = () => toggleModal("filter-marketing");

	const [searchDivisions, setSearchDivisions] = useState("");

	const { items: posts, isLoading: isLoadingPosts } =
		useGetDictionariesDivisions(searchDivisions);

	const { items: statuses, isLoading: isLoadingStatuses } =
		useGetMarketingCycleStatuses();

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useFilterMarketingStore();

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
									type="calendar"
									typeValue="id"
									filters={filters}
									addFilter={addFilter}
									label="Календарь"
									name={["StartDate", "EndDate"]}
									isLoading={isLoadingStatuses}
									removeFilter={removeFilter}
									data={statuses}
									setDatesTemporal={undefined}
									temporalDefaultValue={undefined}
									setTemporalType={undefined}
									temporalDefaultCalendarType={undefined}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									addFilter={addFilter}
									label="Статус"
									name="StatusIds"
									isLoading={isLoadingStatuses}
									removeFilter={removeFilter}
									data={statuses}
									isSearchable={false}
									setDatesTemporal={undefined}
									temporalDefaultValue={undefined}
									setTemporalType={undefined}
									temporalDefaultCalendarType={undefined}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchDivisions}
									addFilter={addFilter}
									label="Подразделения"
									name="DivisionIds"
									onChange={setSearchDivisions}
									isLoading={isLoadingPosts}
									removeFilter={removeFilter}
									data={posts}
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

export default FilterModalMarketing;
