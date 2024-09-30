import { ReactComponent as ArrowBackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import { useModalStore } from "@store/modalStore";
import cn from "classnames";
import { type FC, useState } from "react";

import { useContactFilterStore } from "@/store/filters/contactFilterStore";

import { useGetDictionariesTargetUsers } from "@/api/dictionaries";

import { Checkbox } from "../../../inputs/Checkbox";
import styles from "../filter-modal-organization/FilterModal.module.scss";
import type { IFilterModal } from "../filter-modal-organization/filter.interface";

const FilterModalLibraryPresentations: FC<IFilterModal> = () => {
	const { modals, toggleModal } = useModalStore();
	const isOpen = modals["filter-library-presentations"]?.isOpen;

	const { applyFilters, clearFilters, filters, addFilter, removeFilter } =
		useContactFilterStore();

	const [targetUser, setTargetUserSearch] = useState<any>([]);

	const [allTargetsSelected, setAllTargetsSelected] = useState(false);
	const [isTarget, setIsTarget] = useState(false);

	const toggleSidebar = (): void => {
		toggleModal("filter-library-presentations");
	};

	const handleApply = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		applyFilters();
		toggleSidebar();
	};

	const handleClear = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		clearFilters();
	};

	const handleSelectAllTargets = (checked: boolean): void => {
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
								{" "}
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
									<h1>Фильтр презентации</h1>
									<CrossIcon onClick={toggleSidebar} />
								</div>
								<form>
									{/* TODO: Add filters */}
									{/* <div className="overflow-auto max-h-[calc(100vh-204px)] no-scrollbar">
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
										<FilterModalItem
											type="list"
											typeValue="id"
											filters={filters}
											label="Тип контакта"
											name="ContactTypeIds"
											addFilter={addFilter}
											data={contactTypes}
											value={searchTypeContacts}
											removeFilter={removeFilter}
											onChange={setSearchTypeContacts}
											isLoading={isLoadingContactTypes}
										/>
										<FilterModalItem
											type="list"
											typeValue="id"
											filters={filters}
											label="Специализации"
											name="SpecialityIds"
											addFilter={addFilter}
											removeFilter={removeFilter}
											data={specializations}
											onChange={setSearchSpecialization}
											value={searchSpecialization}
											isLoading={isLoadingSpecialization}
										/>
										<FilterModalItem
											type="list"
											typeValue="id"
											filters={filters}
											data={placesWorks}
											label="Место работы"
											name="InstitutionIds"
											addFilter={addFilter}
											removeFilter={removeFilter}
											onChange={setSearchOrganization}
											value={searchOrganization}
											isLoading={isLoadingOrganizations}
										/>
										<FilterTargetItem
											deleteFilter={deleteFilter}
											setAllTargetsSelected={setAllTargetsSelected}
											appliedFilters={appliedFilters}
											setIsTarget={setIsTarget}
											changeFilter={changeFilter}
											removeFilter={removeFilter}
											filters={filters}
										/>
										<FilterModalItem
											type="list"
											data={status}
											label="Статус"
											value={searchStatus}
											onChange={setSearchStatus}
											typeValue="id"
											filters={filters}
											addFilter={addFilter}
											removeFilter={removeFilter}
											name="ContactWorkplaceStateIds"
											isLoading={isLoadingStatus}
										/>

										<FilterModalItem
											name="OpinionLeader"
											type="select"
											filters={filters}
											addFilter={addFilter}
											label="Лидер мнений"
											removeFilter={removeFilter}
											value={""}
											data={[]}
											onChange={() => {}}
										/>
										<FilterModalItem
											type="list"
											typeValue="id"
											onChange={setSearchContactCategory}
											value={searchContactCategory}
											label="Категория"
											filters={filters}
											data={category}
											addFilter={addFilter}
											removeFilter={removeFilter}
											name="ContactWorkplaceCategoryIds"
											isLoading={isLoadingCategory}
										/>
										<FilterModalItem
											type="list"
											name="City"
											onChange={serSearchCity}
											value={searchCity}
											data={cities}
											typeValue="name"
											filters={filters}
											addFilter={addFilter}
											label="Населенный пункт"
											removeFilter={removeFilter}
											isLoading={isLoadingCities}
										/>
									</div> */}

									{/* FIXME: Remove temporal filter slaceholders */}
									<div className="flex items-start flex-col px-5">
										<div>Brand</div>
										<div>Product</div>
										<div>Specialization</div>
										<div>Organization type</div>
										<div>File type (?? | ??)</div>
									</div>
									<div className={styles["wrapper-buttons"]}>
										<button
											className={styles["button-apply"]}
											onClick={handleApply}
										>
											Применить
										</button>
										<button
											className={styles["button-cancel"]}
											onClick={handleClear}
										>
											Сбросить
										</button>
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

export default FilterModalLibraryPresentations;