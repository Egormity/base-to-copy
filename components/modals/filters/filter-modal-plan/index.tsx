import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { useState } from "react";

import { useFilterMarketingPlanStore } from "@/store/filters/marketingPlanFilterStore";

import { useGetTargetGroups } from "@/api/commons";
import { useGetMarketingTargetpanelStatuses } from "@/api/dictionaries/targetpanel-statuses/get";

import styles from "../filter-modal-marketing/FilterModal.module.scss";
import FilterModalItem from "../filter-modal-organization/FilterModalItem";

const FilterModalPlan = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-plans"]?.isOpen;
	const toggleSidebar = () => toggleModal("filter-plans");

	const [searchTargetGroup, setSearchTargeGroup] = useState("");

	const { items: statuses, isLoading: isLoadingStatuses } =
		useGetMarketingTargetpanelStatuses();
	const { items: targetGroups, isLoading: isLoadingTargetGroups } =
		useGetTargetGroups(searchTargetGroup);

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
									data={statuses}
									label="Статус"
									name="TargetPanelStatusIds"
									addFilter={addFilter}
									removeFilter={removeFilter}
									isLoading={isLoadingStatuses}
									isSearchable={false}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									data={targetGroups}
									label="Целевая группа"
									name="TargetGroupIds"
									addFilter={addFilter}
									removeFilter={removeFilter}
									value={searchTargetGroup}
									onChange={setSearchTargeGroup}
									isLoading={isLoadingTargetGroups}
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

export default FilterModalPlan;
