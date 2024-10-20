import { ReactComponent as BackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import { FC, useState } from "react";

import { ButtonCreateText } from "@/components/ui/buttons/ButtonCreateText";
import CompanyStructuresTreeView from "@/components/ui/tree-view/CompanyStructuresTreeView";

import { ICompanyStructure } from "@/services/commons/company-structures/company-structure.types";

interface ISelectModal {
	title: string;
	type?: "radio" | "checkbox";
	valuesChecked?:
		| { id: string; label: string }
		| { id: string; label: string }[];
	onCreate?: () => void;
	setIsModalOpen?: (value: boolean) => void;
	onSelect?: (
		value:
			| ICompanyStructure
			| ICompanyStructure[]
			| { id: string; label: string }
			| { id: string; label: string }[]
	) => void;
	dontShowItemId?: string;
}

const SelectModalDivisionTree: FC<ISelectModal> = ({
	title,
	onCreate,
	onSelect = () => {},
	setIsModalOpen = () => {},
	dontShowItemId,
}) => {
	const [selectedValue, setSelectedValue] = useState<
		ICompanyStructure | undefined
	>();

	return (
		<div>
			<div className="flex items-center gap-1 mb-8">
				<BackIcon
					onClick={() => setIsModalOpen(false)}
					className="cursor-pointer"
				/>
				<div className="text-xl">{title}</div>
			</div>
			<div>
				<div className="flex w-[350px] bg-[#F6F6F6] px-2 mb-4 max-h-[34px] rounded-lg text-sm">
					<input
						className="w-full flex-1 outline-none bg-transparent"
						placeholder="Поиск"
					/>
					<SearchIcon className="w-[18px] ml-2" />
				</div>
				<div className="flex overflow-auto scrollbar-thin max-h-[270px]"></div>
			</div>

			<CompanyStructuresTreeView
				setNodeOnClick={setSelectedValue}
				dontShowItemIds={[dontShowItemId || ""]}
				isToChangeUrl={false}
			/>

			<div className="flex  gap-2">
				{onCreate && (
					<button
						type="button"
						className="w-full bg-color-active py-3 rounded-3xl text-white font-bold text-sm mt-8"
						onClick={onCreate}
					>
						Создать
					</button>
				)}

				<ButtonCreateText
					text="Выбрать"
					type="button"
					disabled={!selectedValue}
					onClick={() => {
						if (selectedValue) onSelect(selectedValue);
						setIsModalOpen(false);
					}}
					className="w-full mt-8"
				/>
			</div>
		</div>
	);
};

export default SelectModalDivisionTree;
