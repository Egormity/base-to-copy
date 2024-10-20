import { type FC, useState } from "react";

import styles from "./FilterModalItem.module.scss";
import type { IItemFilterModal } from "./FilterModalItem.types";
import CalendarFilter from "./variants/calendar";
import HeaderVariantFilter from "./variants/header";
import ListFilter from "./variants/list";

const FilterModalItem: FC<IItemFilterModal> = ({
	label,
	type,
	data = [],
	name,
	value,
	filters,
	onChange,
	addFilter,
	isLoading,
	typeValue,
	hasNextPage,
	isSearchable = true,
	removeFilter,
	fetchNextPage,
	appliedFilters,
	isFetchingNextPage,
}) => {
	const selectedFilter = filters.find((filter) => filter.name === name);
	const [isOpen, setIsOpen] = useState(false || !!selectedFilter);

	return (
		<li className={styles["wrapper-item"]}>
			{type !== "calendar" && (
				<HeaderVariantFilter
					//@ts-ignore
					type={type}
					label={label}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					selectedFilter={selectedFilter}
					removeFilter={removeFilter}
					addFilter={addFilter}
					name={name}
				/>
			)}

			{isOpen && type === "list" && (
				<ListFilter
					data={data}
					name={name}
					value={value}
					onChange={onChange}
					typeValue={typeValue}
					isLoading={isLoading}
					addFilter={addFilter}
					removeFilter={removeFilter}
					isSearchable={isSearchable}
					valuesChecked={selectedFilter?.values || []}
					//
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
				/>
			)}

			{type === "calendar" && (
				<CalendarFilter
					name={name}
					onChange={onChange}
					addFilter={addFilter}
					appliedFilters={appliedFilters}
				/>
			)}

			{type === "target" && <div>Target</div>}
		</li>
	);
};

export default FilterModalItem;
