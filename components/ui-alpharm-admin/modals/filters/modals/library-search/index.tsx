import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import type { FC } from "react";

import { useLibrarySearchFilterStore } from "@/store/filters/librarySearchFilterStore";

import { useGetLibraryFilters } from "@/hooks/useGetLibraryFilters";

import styles from "../../commons/FilterModal.module.scss";
import FilterModalItem from "../../commons/FilterModalItem";
import type { IFilterModal } from "../../commons/filter.interface";

import FilterModalLibrarySearchItemTree from "./FilterModalLibrarySearchItemTree";

const FilterModalLibrarySearch: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-library-search"]?.isOpen || false;

	const toggleSidebar = (): void => {
		toggleModal("filter-library-search");
	};

	// SEARCH STATE
	const {
		searchBrands,
		searchClassifiers,
		searchSpecialities,
		searchInstitutionTypes,

		setSearchBrands,
		setSearchClassifiers,
		setSearchSpecialities,
		setSearchInstitutionTypes,

		brands,
		classifiers,
		specialities,
		institutionTypes,

		isLoadingBrandsAndClassifiers,
		isLoadingSpecialities,
		isLoadingInstitutionTypes,

		fetchNextPageBrandsAndClassifiers,
		fetchNextPageSpecialities,
		fetchNextPageInstitutionTypes,

		hasNextPageBrandsAndClassifiers,
		hasNextPageSpecialities,
		hasNextPageInstitutionTypes,

		isFetchingNextPageBrandsAndClassifiers,
		isFetchingNextPageSpecialities,
		isFetchingNextPageInstitutionTypes,
	} = useGetLibraryFilters(isOpen);

	const {
		applyFilters,
		clearFilters,
		filters,
		addFilter,
		removeFilter,
		appliedFilters,
	} = useLibrarySearchFilterStore();

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
									value={searchBrands}
									addFilter={addFilter}
									label="Бренд"
									name="Brands"
									isSearchable
									// @ts-ignore
									onChange={setSearchBrands}
									isLoading={isLoadingBrandsAndClassifiers}
									removeFilter={removeFilter}
									data={brands} // @ts-ignore
									fetchNextPage={fetchNextPageBrandsAndClassifiers}
									hasNextPage={hasNextPageBrandsAndClassifiers}
									isFetchingNextPage={isFetchingNextPageBrandsAndClassifiers}
								/>

								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchClassifiers}
									addFilter={addFilter}
									label="Препарат"
									name="Classifiers"
									// @ts-ignore
									onChange={setSearchClassifiers}
									isLoading={isLoadingBrandsAndClassifiers}
									removeFilter={removeFilter}
									data={classifiers} // @ts-ignore
									fetchNextPage={fetchNextPageBrandsAndClassifiers}
									hasNextPage={hasNextPageBrandsAndClassifiers}
									isFetchingNextPage={isFetchingNextPageBrandsAndClassifiers}
								/>

								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchSpecialities}
									addFilter={addFilter}
									label="Специализация"
									name="Specialities"
									// @ts-ignore
									onChange={setSearchSpecialities}
									isLoading={isLoadingSpecialities}
									removeFilter={removeFilter}
									data={specialities} // @ts-ignore
									fetchNextPage={fetchNextPageSpecialities}
									hasNextPage={hasNextPageSpecialities}
									isFetchingNextPage={isFetchingNextPageSpecialities}
								/>

								<FilterModalItem
									type="list"
									typeValue="id"
									filters={filters}
									value={searchInstitutionTypes}
									addFilter={addFilter}
									label="Организация"
									name="InstitutionTypes"
									// @ts-ignore
									onChange={setSearchInstitutionTypes}
									isLoading={isLoadingInstitutionTypes}
									removeFilter={removeFilter}
									data={institutionTypes} // @ts-ignore
									fetchNextPage={fetchNextPageInstitutionTypes}
									hasNextPage={hasNextPageInstitutionTypes}
									isFetchingNextPage={isFetchingNextPageInstitutionTypes}
								/>

								<FilterModalLibrarySearchItemTree
									filters={filters}
									appliedFilters={appliedFilters}
									label="Папки"
									name="Folders"
									addFilter={
										addFilter as (name: string, value: number | string) => void
									}
									removeFilter={
										removeFilter as (
											name: string,
											value: number | string
										) => void
									}
								/>

								<FilterModalItem
									name="Только активные"
									type="select"
									filters={filters}
									addFilter={addFilter}
									label="Искать только по активным"
									removeFilter={removeFilter}
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

export default FilterModalLibrarySearch;
