import { ReactComponent as ArrowVertical } from "@assets/icons/arrow-vertical-icon.svg";
import cn from "classnames";
import { Dispatch, type FC, SetStateAction } from "react";

import { ToggleSwitch } from "@/components/ui/inputs";

import { Filter } from "@/store/filters/organizationFilterStore";

import styles from "../../FilterModalItem.module.scss";

interface IHeaderVariantFilter {
	type: "list" | "select" | "calendar";
	label?: string;
	selectedFilter?: Filter;
	name?: string | string[];
	isOpen: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	removeFilter?: any;
	addFilter?: any;
}

const HeaderVariantFilter: FC<IHeaderVariantFilter> = ({
	type,
	label,
	selectedFilter,
	setIsOpen,
	name,
	isOpen,
	addFilter,
}) => {
	const handlerVisible = () => setIsOpen?.(!isOpen);

	const handleToggleChange = () =>
		//@ts-ignore
		addFilter(name, !selectedFilter?.values[0]?.id, name, undefined, true);

	return (
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
					checked={selectedFilter?.values[0]?.id}
					onChange={handleToggleChange}
				/>
			)}
		</label>
	);
};

export default HeaderVariantFilter;
