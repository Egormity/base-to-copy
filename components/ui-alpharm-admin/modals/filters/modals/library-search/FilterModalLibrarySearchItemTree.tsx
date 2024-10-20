import { ReactComponent as ArrowVertical } from "@assets/icons/arrow-vertical-icon.svg";
import { useRouter } from "@tanstack/react-router";
import cn from "classnames";
import { type FC, useState } from "react";

import LibraryTreeView from "@/components/ui/tree-view/LibraryTreeView";

import type { Filter } from "@/store/filters/organizationFilterStore";

import {
	MATERIALS_FOLDER_TYPE_ID,
	POLLS_FOLDER_TYPE_ID,
} from "@/utils/constants/library-types";

import styles from "../../commons/FilterModalItem/FilterModalItem.module.scss";

interface IItemFilterModal {
	label: string;
	name: string;
	filters: Array<Filter>;
	addFilter: (name: string, value: number | string) => void;
	removeFilter: (name: string, value: number | string) => void;
	appliedFilters: Array<Filter>;
}

const FilterModalLibrarySearchItemTree: FC<IItemFilterModal> = ({
	label,
	name,
	filters,
	addFilter,
	removeFilter,
	appliedFilters,
}) => {
	const selectedFilter = filters.find((filter) => filter.name === name);
	const [isOpen, setIsOpen] = useState(!!selectedFilter || false);
	const handlerVisible = (): void => {
		setIsOpen(!isOpen);
	};

	// FROM
	const router = useRouter();
	const from = router.latestLocation.pathname.split("/")[3] as
		| "materials"
		| "polls";

	// FOLDER TYPE ID
	let folderTypeId;
	if (from === "materials") folderTypeId = MATERIALS_FOLDER_TYPE_ID;
	if (from === "polls") folderTypeId = POLLS_FOLDER_TYPE_ID;

	return (
		<li className={styles["wrapper-item"]}>
			<label
				className={styles["container-item"]}
				onClick={handlerVisible}
			>
				<span>{label}</span>
				<ArrowVertical
					className={cn({
						"rotate-180": isOpen,
					})}
				/>
			</label>

			{isOpen && (
				<LibraryTreeView
					folderTypeId={folderTypeId || 1}
					className="border border-stone-200 rounded-xl"
					checkboxSelection
					icon={false}
					multiSelect
					isToChangeUrl={false}
					onCheckedItem={(item, checked) => {
						//@ts-ignore
						if (checked) removeFilter(name, item.id, item.name);
						//@ts-ignore
						else addFilter(name, item.id, item.name);
					}}
					//@ts-ignore
					checkedItems={
						appliedFilters
							?.find((item) => item.name === name)
							//@ts-ignore
							?.values.map((value) => ({ id: (value as { id: string }).id })) ||
						[]
					}
				/>
			)}
		</li>
	);
};

export default FilterModalLibrarySearchItemTree;
