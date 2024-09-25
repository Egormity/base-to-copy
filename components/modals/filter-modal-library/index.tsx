import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { type FC, useState } from "react";

import { useFilterLibraryStore } from "@/store/filters/libraryFilterStore";

import {
	useGetOrganizationTypes,
	useGetProducts,
	useGetSpecializations,
} from "@/api/commons";

import FilterModalItem from "../filters/filter-modal-organization/FilterModalItem";

import styles from "./FilterModal.module.scss";
import type { IFilterModal } from "./filter.interface";

const FilterModal: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-library"]?.isOpen;
	const toggleSidebar = (): void => {
		toggleModal("filter-library");
	};

	const [searchBrand, setSearchBrand] = useState("");
	const [searchDrugs, setSearchDrugs] = useState("");
	const [searchSpecializations, setSearchSpecializations] = useState("");
	const [searchOrganizations, setSearchOrganizations] = useState("");

	const { items: products1, isLoading: isLoadingProducts1 } =
		useGetProducts(searchBrand);
	const brands = products1?.map((product) => ({
		id: product.id,
		name: product.name,
	}));

	const { items: products2, isLoading: isLoadingProducts2 } =
		useGetProducts(searchDrugs);
	const drugs = products2?.flatMap((product) => product.classifiers);

	const { items: specializations, isLoading: isLoadingSpecializations } =
		useGetSpecializations(searchSpecializations);
	const { items: organizations, isLoading: isLoadingOrganizations } =
		useGetOrganizationTypes(searchOrganizations);

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useFilterLibraryStore();

	const handleApply = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		applyFilters();
		toggleSidebar();
	};

	const handleClear = (event: React.MouseEvent<HTMLButtonElement>): void => {
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
									value={searchBrand}
									addFilter={addFilter}
									label="Бренд"
									name="brands"
									onChange={setSearchBrand}
									isLoading={isLoadingProducts1}
									removeFilter={removeFilter}
									data={brands}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchDrugs}
									addFilter={addFilter}
									label="Препарат"
									name="drugs"
									onChange={setSearchDrugs}
									isLoading={isLoadingProducts2}
									removeFilter={removeFilter}
									data={drugs}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchSpecializations}
									addFilter={addFilter}
									label="Специализация"
									name="specializations"
									onChange={setSearchSpecializations}
									isLoading={isLoadingSpecializations}
									removeFilter={removeFilter}
									data={specializations}
								/>
								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchOrganizations}
									addFilter={addFilter}
									label="Организация"
									name="organizations"
									onChange={setSearchOrganizations}
									isLoading={isLoadingOrganizations}
									removeFilter={removeFilter}
									data={organizations}
								/>
								<FilterModalItem
									name="showOnlyActive"
									type="select"
									filters={filters}
									addFilter={addFilter}
									label="Искать только по активным"
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

export default FilterModal;
