import { ReactComponent as ArrowVertical } from "@assets/icons/arrow-vertical-icon.svg";
import cn from "classnames";
import { Dispatch, FC, SetStateAction, useState } from "react";

import { ToggleSwitch } from "@/components/ui/inputs";

import { Filter } from "@/store/filters/organizationFilterStore";

import SelectTestFast from "../../../select-modal-test-test";

import styles from "./FilterModalItem.module.scss";

interface IItemFilterModal {
	label: string;
	value?: string;
	name: string;
	filters: Filter[];
	typeValue?: string;
	type: "list" | "select";
	data?: { id: number | string; name: string; subtitle?: string }[];
	onChange?: Dispatch<SetStateAction<string>>;
	addFilter: (name: string, value: number) => void;
	removeFilter: (name: string, value: number) => void;
	isLoading?: boolean;
	isSearchable?: boolean;
}

const FilterModalItem: FC<IItemFilterModal> = ({
	label,
	type,
	data = [],
	name,
	value = "",
	filters,
	onChange = () => {},
	typeValue,
	addFilter,
	removeFilter,
	isLoading,
	isSearchable,
}) => {
	const selectedFilter = filters.find((filter) => filter.name === name);
	const [isOpen, setIsOpen] = useState(false || !!selectedFilter);

	const handleToggleChange = (checked: boolean) => {
		if (checked) {
			//@ts-ignore
			removeFilter(name, false);
			//@ts-ignore
			addFilter(name, true);
		} else {
			//@ts-ignore
			removeFilter(name, true);
			//@ts-ignore
			addFilter(name, false);
		}
	};

	const handlerVisible = () => setIsOpen(!isOpen);
	return (
		<li className={styles["wrapper-item"]}>
			<label
				className={styles["container-item"]}
				onClick={handlerVisible}
			>
				<span>{label}</span>
				{type === "list" ? (
					<ArrowVertical
						className={cn({
							"rotate-180": isOpen,
						})}
					/>
				) : (
					<ToggleSwitch
						//@ts-ignore
						checked={selectedFilter?.values[0]}
						onChange={handleToggleChange}
					/>
				)}
			</label>

			{isOpen && type === "list" && (
				<SelectTestFast
					isLoading={isLoading}
					data={data}
					name={name}
					value={value}
					onChange={onChange}
					typeValue={typeValue}
					addFilter={addFilter}
					removeFilter={removeFilter}
					isSearchable={isSearchable}
					//@ts-ignore
					valuesChecked={selectedFilter?.values || []}
				/>
			)}
		</li>
	);
};

export default FilterModalItem;
