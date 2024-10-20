import { useModalStore } from "@store/modalStore";
import type { FC } from "react";

import { useFilterLibraryStore } from "@/store/filters/libraryFilterStore";

import { useGetLibraryFilters } from "@/hooks/useGetLibraryFilters";

import FilterContainer from "../../commons/FilterContainer";
import FilterModalItem from "../../commons/FilterModalItem";
import type { IFilterModal } from "../../commons/filter.interface";

const FilterModal: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const isOpen = modals["filter-library"]?.isOpen || false;
	const toggleSidebar = (): void => {
		toggleModal("filter-library");
	};

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
		<FilterContainer
			isOpen={isOpen}
			toggleSidebar={toggleSidebar}
			handleApply={handleApply}
			handleClear={handleClear}
		>
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
		</FilterContainer>
	);
};

export default FilterModal;
