import { debounce } from "@mui/material";
import cn from "classnames";
import {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";

import { DEBOUNCE_MS_DELAY } from "@/utils/constants/debounce";

import Loader from "../../common/loader";

import styles from "./select.module.scss";

interface ISelectModal {
	name: string;
	value: string;
	onChange: Dispatch<SetStateAction<string>>;
	data: {
		id: number | string;
		name: string;
		subtitle?: string;
	}[];
	valuesChecked?: number[];
	typeValue?: string;
	addFilter: (name: string, value: number) => void;
	removeFilter: (name: string, value: number) => void;
	isLoading?: boolean;
	isSearchable?: boolean;
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
	isSearchable = true,
	isLoading,
}) => {
	const [selectedValues, setSelectedValues] = useState<number[]>(valuesChecked);

	const [inputValue, setInputValue] = useState<string>(value);
	const onChangeDebounced = useCallback(
		debounce((value: any) => {
			onChange(value);
		}, DEBOUNCE_MS_DELAY),
		[]
	);
	useEffect(() => {
		onChangeDebounced(inputValue);
	}, [onChangeDebounced, inputValue]);

	useEffect(() => {
		setSelectedValues(valuesChecked);
	}, [valuesChecked]);

	const handleCheckboxChange = (value: number) => {
		setSelectedValues((prevValues) => {
			const newValues = prevValues.includes(value)
				? prevValues.filter((val) => val !== value)
				: [...prevValues, value];

			if (newValues.includes(value)) {
				addFilter(name, value);
			} else {
				removeFilter(name, value);
			}

			return newValues;
		});
	};

	return (
		<div className="max-h-[250px]">
			{isSearchable && (
				<div className="flex  w-[350px] bg-[#F6F6F6] p-2 mb-4 max-h-[34px] rounded-lg text-sm">
					<input
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value);
						}}
						className="w-full flex-1 outline-none bg-transparent"
						placeholder="Поиск"
					/>
				</div>
			)}

			{isLoading ? (
				<div className="w-full h-full max-h-[calc(100vh-70px)] flex items-center">
					<Loader />
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
											checked={selectedValues.includes(
												//@ts-ignore
												typeValue ? item[typeValue] : item?.id
											)}
											onChange={() =>
												handleCheckboxChange(
													//@ts-ignore
													typeValue ? item[typeValue] : item?.id
												)
											}
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
