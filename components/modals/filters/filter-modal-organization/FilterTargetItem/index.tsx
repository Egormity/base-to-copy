import { ReactComponent as IconCancel } from "@assets/icons/red-cross-icon.svg";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { ToggleSwitch } from "@/components/ui/inputs";

import styles from "../FilterModalItem/FilterModalItem.module.scss";

interface IFilterTargetItem {
	setIsTarget: Dispatch<SetStateAction<boolean>>;
	changeFilter: (name: string, value: any) => void;
	removeFilter: (name: string, value: any) => void;
	setAllTargetsSelected: (value: any) => void;
	deleteFilter: (name: string) => void;
	appliedFilters: any[];
	filters: any[];
}

const FilterTargetItem: FC<IFilterTargetItem> = ({
	setIsTarget,
	changeFilter,
	setAllTargetsSelected,
	deleteFilter,
	appliedFilters,
	filters,
}) => {
	const targetFilter = filters.find((filter) => filter.name === "isTarget");
	const targetFilterIds = filters.find(
		(filter) => filter.name === "targetUserIds"
	);

	const appliedTargetFilter = appliedFilters.find(
		(filter) => filter.name === "isTarget"
	);

	const [isToggled, setIsToggled] = useState(
		appliedTargetFilter?.values[0] || targetFilterIds?.values
	);

	const handleToggleChange = () => {
		setIsToggled(!isToggled);
		changeFilter("isTarget", !isToggled);

		if (isToggled) {
			deleteFilter("targetUserIds");
		}
	};

	useEffect(() => {
		if (!targetFilter?.values) setIsToggled(false);
	}, appliedTargetFilter);

	const handleRemoveTarget = (id: string) => {
		const updatedTargets = targetFilterIds?.values?.filter(
			(target: { id: string; name: string; postName: string }) =>
				target.id !== id
		);

		setAllTargetsSelected(false);
		changeFilter("targetUserIds", updatedTargets);
	};

	return (
		<li className={styles["wrapper-item"]}>
			<label className={styles["container-item"]}>
				<span>Таргет</span>
				<ToggleSwitch
					checked={isToggled}
					onChange={handleToggleChange}
				/>
			</label>
			{isToggled && (
				<>
					<div>
						<span
							className="text-[#BDBDBD] text-sm underline cursor-pointer"
							onClick={() => setIsTarget(true)}
						>
							Выбрать коллегу для отслеживания
						</span>
					</div>
					<ul className="flex flex-col gap-2">
						{targetFilterIds?.values?.map(
							(target: { id: string; name: string; postName: string }) => (
								<li
									key={target.id}
									className="p-2 border-[#E9E9E9] border-[1px] rounded-lg"
								>
									<div className="flex flex-row justify-between">
										<div className="flex flex-col gap-2">
											<div className="text-sm">{target.name}</div>
											<div className="text-[#9B9B9B] text-[10px]">
												{target.postName}
											</div>
										</div>
										<div
											className="cursor-pointer"
											onClick={() => handleRemoveTarget(target.id)}
										>
											<IconCancel color="#F63E16" />
										</div>
									</div>
								</li>
							)
						)}
					</ul>
				</>
			)}
		</li>
	);
};

export default FilterTargetItem;
