import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { FC, useState } from "react";

import { useFilterDivisionEmployeeStore } from "@/store/filters/divisionEmployFilterStore";

import { useGetEmployeePost } from "@/api/commons";

import styles from "../filter-modal-employee/FilterModal.module.scss";
import { IFilterModal } from "../filter-modal-employee/filter.interface";
import FilterModalItem from "../filter-modal-organization/FilterModalItem";

const FilterModalDivisionEmployee: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-company-structure"]?.isOpen;
	const toggleSidebar = () => toggleModal("filter-company-structure");

	const [searchPosts, setSearchPosts] = useState("");

	const { items: posts, isLoading: isLoadingPosts } =
		useGetEmployeePost(searchPosts);

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useFilterDivisionEmployeeStore();

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
									value={searchPosts}
									addFilter={addFilter}
									label="Должность"
									name="postId"
									onChange={setSearchPosts}
									isLoading={isLoadingPosts}
									removeFilter={removeFilter}
									data={posts}
								/>

								<FilterModalItem
									name="ShowNotActive"
									type="select"
									filters={filters}
									addFilter={addFilter}
									label="Показать неработающих"
									removeFilter={removeFilter}
									value={""}
									data={[]}
									onChange={() => {}}
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

export default FilterModalDivisionEmployee;
