import { ReactComponent as BackIcon } from "@assets/icons/arrrow-back-icon.svg";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import { FC } from "react";

interface ISelectModal {
	title: string;
}

const SelectModalTree: FC<ISelectModal> = ({ title }) => {
	return (
		<div>
			<div className="flex  items-center gap-1 float-start mb-8">
				<BackIcon />
				<div className="text-xl">{title}</div>
			</div>
			<div>
				<div className="flex  w-[350px] bg-[#F6F6F6] px-2 mb-4 max-h-[34px] rounded-lg">
					<input className="w-full flex-1 outline-none bg-transparent" />
					<SearchIcon className="w-[18px] ml-2" />
				</div>
				<div className="max-w-[350px] overflow-auto scrollbar-thin"></div>
			</div>
			<button className="w-[350px] bg-color-active py-3 rounded-3xl mt-3 text-white font-bold text-sm">
				Выбрать
			</button>
		</div>
	);
};

export default SelectModalTree;
