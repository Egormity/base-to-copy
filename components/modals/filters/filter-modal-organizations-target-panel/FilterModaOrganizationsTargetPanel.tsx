import { ReactComponent as ArrowBackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { type FC, useEffect, useState } from "react";

import { useOrganizationFilterStore } from "@/store/filters/organizationFilterStore";

import {
	useGetOrganizationCategory,
	useGetOrganizationTypes,
} from "@/api/commons";
import {
	useGetDictionariesCities,
	useGetDictionariesNetworks,
	useGetDictionariesOrganizationKinds,
	useGetDictionariesOrganizationStatus,
	useGetDictionariesTargetUsers,
} from "@/api/dictionaries";

import { Checkbox } from "../../../inputs/Checkbox";
import { IFilterModal } from "../filter-modal-employee/filter.interface";
import styles from "../filter-modal-organization/FilterModal.module.scss";
import FilterModalItem from "../filter-modal-organization/FilterModalItem";
import FilterTargetItem from "../filter-modal-organization/FilterTargetItem";

const FilterModalOrganizationsTargetPanel: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();

	const {
		applyFilters,
		clearFilters,
		filters,
		appliedFilters,
		addFilter,
		removeFilter,
		changeFilter,
		deleteFilter,
	} = useOrganizationFilterStore();

	const isOpen = modals["filter-organizations-target-panel"]?.isOpen;
	const toggleSidebar = () => toggleModal("filter-organizations-target-panel");

	const [searchCity, setSearchCity] = useState("");
	const [searchType, setSearchType] = useState("");
	const [searchKinds, setSearchKinds] = useState("");
	const [searchStatus, setSearchStatus] = useState("");
	const [searchCategory, setSearchCategory] = useState("");
	const [searchNetwork, setSearchNetwork] = useState("");
	//@ts-ignore
	const [typeIds, setTypeIds] = useState<number[]>([]);
	const [targetUser, setTargetUserSearch] = useState<any>([]);

	const [allTargetsSelected, setAllTargetsSelected] = useState(false);
	const [isTarget, setIsTarget] = useState(false);

	const { items: cities, isLoading: isLoadingCities } =
		useGetDictionariesCities(searchCity);
	const { items: organizationTypes, isLoading: isLoadingTypes } =
		useGetOrganizationTypes(searchType);
	const { items: organizationKinds, isLoading: isLoadingKinds } =
		useGetDictionariesOrganizationKinds(searchKinds);
	const { items: organizationStatus, isLoading: isLoadingStatus } =
		useGetDictionariesOrganizationStatus(searchStatus);
	const { items: organizationCategory, isLoading: isLoadingCategory } =
		useGetOrganizationCategory(searchCategory);

	useEffect(() => {
		filters.find((item) => item.name === "masterInstitutionTypeIds")?.values as
			| number[]
			| undefined;
	}, [filters]);

	const { items: networks, isLoading: isLoadingNetworks } =
		useGetDictionariesNetworks(typeIds, searchNetwork);

	const handleApply = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		applyFilters();
		toggleSidebar();
	};

	const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		clearFilters();
	};

	const handleSelectAllTargets = (checked: boolean) => {
		setAllTargetsSelected(checked);

		if (checked) {
			targetUsers?.forEach(
				(user: { postName: string; name: string; id: string }) =>
					addFilter("targetUserIds", user)
			);
		} else {
			targetUsers?.forEach(
				(user: { postName: string; name: string; id: string }) =>
					removeFilter("targetUserIds", user)
			);
		}
	};

	const handleSelectTargetUser = (
		user: { postName: string; name: string; id: string },
		checked: boolean
	) => {
		if (checked) {
			addFilter("targetUserIds", user);
		} else {
			removeFilter("targetUserIds", user);
			setAllTargetsSelected(false);
		}
	};

	const { items: targetUsers } = useGetDictionariesTargetUsers(targetUser);
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
							<>
								<div className="flex flex-row items-center justify-center px-4 gap-1">
									<ArrowBackIcon
										onClick={() => setIsTarget(false)}
										className="cursor-pointer"
									/>
									<h1 className="text-xl py-5">
										Выбор коллег для отслеживания
									</h1>
								</div>
								<div className="flex flex-row  bg-[#F6F6F6] mb-4 max-h-[34px] rounded-lg text-sm mx-4 px-2 py-2">
									<input
										value={targetUser}
										onChange={(e) => {
											setTargetUserSearch(e.target.value);
										}}
										className="w-full flex-1 outline-none bg-transparent"
										placeholder="Поиск"
									/>
								</div>
								<div className="px-4">
									<div className="mb-4">
										<Checkbox
											value={allTargetsSelected}
											label="Выделить всё"
											onChange={(e) => {
												handleSelectAllTargets(e.target.checked);
											}}
										/>
									</div>
									{targetUsers?.map(
										(user: { postName: string; name: string; id: string }) => (
											<Checkbox
												id={user.id}
												key={user.id}
												value={filters.some(
													(filter) =>
														filter.name === "targetUserIds" &&
														filter.values.some(
															//@ts-ignore
															(obj: { id: string }) => obj.id === user.id
														)
												)}
												label={user.name}
												subtitle={user.postName}
												onChange={(e) => {
													handleSelectTargetUser(user, e.target.checked);
												}}
											/>
										)
									)}
								</div>
							</>
						) : (
							<>
								<div className={styles["filter-header"]}>
									<h1>Фильтр</h1>
									<CrossIcon onClick={toggleSidebar} />
								</div>
								<form>
									<div className="overflow-auto max-h-[calc(100vh-204px)] no-scrollbar">
										<FilterModalItem
											type="list"
											typeValue="masterInstitutionTypeId"
											filters={filters}
											value={searchType}
											addFilter={addFilter}
											label="Тип учреждения"
											name="masterInstitutionTypeIds"
											onChange={setSearchType}
											isLoading={isLoadingTypes}
											removeFilter={removeFilter}
											data={organizationTypes}
										/>
										<FilterModalItem
											type="list"
											typeValue="id"
											filters={filters}
											addFilter={addFilter}
											label="Вид учреждения"
											data={organizationKinds}
											name="InstitutionKindIds"
											removeFilter={removeFilter}
											onChange={setSearchKinds}
											value={searchKinds}
											isLoading={isLoadingKinds}
										/>
										<FilterModalItem
											type="list"
											typeValue="id"
											label="Категории"
											filters={filters}
											addFilter={addFilter}
											removeFilter={removeFilter}
											name="InstitutionCategoryIds"
											data={organizationCategory}
											onChange={setSearchCategory}
											value={searchCategory}
											isLoading={isLoadingCategory}
										/>
										<FilterTargetItem
											setAllTargetsSelected={setAllTargetsSelected}
											appliedFilters={appliedFilters}
											setIsTarget={setIsTarget}
											deleteFilter={deleteFilter}
											changeFilter={changeFilter}
											removeFilter={removeFilter}
											filters={filters}
										/>
										<FilterModalItem
											name="City"
											type="list"
											data={cities}
											typeValue="name"
											filters={filters}
											addFilter={addFilter}
											label="Населенные пункты"
											removeFilter={removeFilter}
											isLoading={isLoadingCities}
											onChange={setSearchCity}
											value={searchCity}
										/>
										<FilterModalItem
											type="list"
											filters={filters}
											value={searchNetwork}
											addFilter={addFilter}
											label="Сеть"
											name="Network"
											onChange={setSearchNetwork}
											isLoading={isLoadingNetworks}
											removeFilter={removeFilter}
											data={networks}
										/>
										<FilterModalItem
											type="list"
											typeValue="id"
											label="Статус"
											filters={filters}
											addFilter={addFilter}
											data={organizationStatus}
											name="InstitutionStatusIds"
											removeFilter={removeFilter}
											value={searchStatus}
											onChange={setSearchStatus}
											isLoading={isLoadingStatus}
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
