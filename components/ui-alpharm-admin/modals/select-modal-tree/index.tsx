import { ReactComponent as BackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import { FC, useState } from "react";

export type TreeNode = {
	itemId: string;
	label: string;
	children?: TreeNode[];
};

interface ISelectModal {
	title: string;
	data: TreeNode[];
	type?: "radio" | "checkbox";
	valuesChecked?:
		| { id: string; label: string }
		| { id: string; label: string }[];
	onCreate?: () => void;
	setIsModalOpen?: (value: boolean) => void;
	onSelect?: (
		value: { id: string; label: string } | { id: string; label: string }[]
	) => void;
}

type SelectedValue = { id: string; label: string };

const SelectModalTree: FC<ISelectModal> = ({
	title,
	onCreate,
	onSelect = () => {},
	setIsModalOpen = () => {},
	valuesChecked,
}) => {
	const [selectedValue] = useState<SelectedValue | null>(
		(valuesChecked as SelectedValue) || null
	);

	return (
		<div>
			<div className="flex  items-center gap-1 float-start mb-8">
				<BackIcon />
				<div className="text-xl">{title}</div>
			</div>
			<div>
				<div className="flex  w-[350px] bg-[#F6F6F6] px-2 mb-4 max-h-[34px] rounded-lg text-sm">
					<input
						className="w-full flex-1 outline-none bg-transparent"
						placeholder="Поиск"
					/>
					<SearchIcon className="w-[18px] ml-2" />
				</div>
				<div className="flex overflow-auto scrollbar-thin max-h-[270px]"></div>
			</div>

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
				<button
					type="button"
					disabled={!selectedValue}
					className="w-full bg-color-active py-3 rounded-3xl text-white font-bold text-sm mt-8 disabled:bg-opacity-button-disabled"
					onClick={() => {
						if (selectedValue) {
							onSelect(selectedValue);
						}
						setIsModalOpen(false);
					}}
				>
					Выбрать
				</button>
			</div>
		</div>
	);
};

export default SelectModalTree;
