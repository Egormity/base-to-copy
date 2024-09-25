import cn from "classnames";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import GIF from "@/assets/gif/loader/loader.gif";

import styles from "./select.module.scss";

interface ValuesChecked {
	id: number;
	name: string;
}

interface ISelectModal {
	name: string | string[];

	data: {
		id: number | string;
		name: string;
		subtitle?: string;
	}[];
	valuesChecked?: ValuesChecked[];
	typeValue?: string;
	addFilter: (name: string, value: number, itemName?: string) => void;
	removeFilter: (name: string, value: number, itemName?: string) => void;
	isLoading?: boolean;
	isSearchable?: boolean;

	onChange: Dispatch<SetStateAction<string>>;
	value: string;
}

const SelectTestFast: FC<ISelectModal> = ({
	data,
	valuesChecked = [],
	name,
	typeValue,
	addFilter,
	removeFilter,
	value = "",
	onChange,
	isLoading,
	isSearchable = true,
}) => {
	const [selectedValues, setSelectedValues] =
		useState<ValuesChecked[]>(valuesChecked);

	useEffect(() => {
		setSelectedValues(valuesChecked);
	}, [valuesChecked]);

	const handleCheckboxChange = (value: number, itemName?: string) => {
		setSelectedValues((prevValues) => {
			const newValue: ValuesChecked = { id: value, name: itemName || "" };
			const exists = prevValues.some((val) => val.id === value);

			let newValues: ValuesChecked[];
			if (exists) {
				newValues = prevValues.filter((val) => val.id !== value);
				removeFilter(name?.toString(), value, itemName);
			} else {
				newValues = [...prevValues, newValue];
				addFilter(name?.toString(), value, itemName);
			}

			return newValues;
		});
	};

	return (
		<div className="max-h-[250px]">
			{isSearchable && (
				<div className="flex flex-row w-[350px] bg-[#F6F6F6] p-2 mb-4 max-h-[34px] rounded-lg text-sm">
					<input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="w-full flex-1 outline-none bg-transparent"
						placeholder="Поиск"
					/>
				</div>
			)}
			{isLoading ? (
				<div className="w-full h-full max-h-[calc(100vh-60px)] flex items-center">
					<img
						src={GIF}
						className="m-auto"
					/>
				</div>
			) : (
				<div className="flex overflow-auto scrollbar-thin max-h-[200px]">
					<div className="space-y-4 max-w-[350px] text-left">
						{data.map((item) => (
							<label
								key={item.id}
								className="flex items-center space-x-2 cursor-pointer"
							>
								<div className={cn(styles["input-wrapper"])}>
									<div className={styles["input-container"]}>
										<input
											value={item.name}
											checked={selectedValues.some(
												(val) =>
													// @ts-ignore
													val.id === (typeValue ? item[typeValue] : item.id)
											)}
											onChange={() => {
												handleCheckboxChange(
													// @ts-ignore
													typeValue ? item[typeValue] : item.id,
													item.name
												);
											}}
											type="checkbox"
											id={`my-checkbox-${item.id}`}
										/>

										<label
											htmlFor={`my-checkbox-${item.id}`}
											className="text-lg "
										>
											<span />
										</label>
									</div>
								</div>
								<span className="text-sm text-wrap max-w-[300px]">
									{item.name}
								</span>
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default SelectTestFast;
