import { Skeleton, debounce } from "@mui/material";
import cn from "classnames";
import { type FC, useCallback, useEffect, useState } from "react";

import Loader from "@/components/ui/common/loader";

import { useGetMorePages } from "@/hooks/use-get-more-page";

import { DEBOUNCE_MS_DELAY } from "@/utils/constants/debounce";

import styles from "./select.module.scss";

interface ValuesChecked {
	id: number;
	name: string;
}

interface ISelectModal {
	value?: string;
	name: string | string[];
	valuesChecked?: ValuesChecked[];
	typeValue?: string;
	isLoading?: boolean;
	isSearchable?: boolean;

	data: {
		id: number | string;
		name: string;
		subtitle?: string;
	}[];

	addFilter: (name: string, value: number, itemName?: string) => void;
	removeFilter: (name: string, value: number, itemName?: string) => void;
	onChange?: (date: Date | [Date, Date] | string | null) => void;

	hasNextPage?: boolean;
	fetchNextPage?: () => void;
	isFetchingNextPage?: boolean;
}

const ListFilter: FC<ISelectModal> = ({
	data,
	valuesChecked = [],
	name,
	typeValue,
	addFilter,
	removeFilter,
	value = "",
	onChange = () => {},
	isLoading,
	isSearchable = true,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}) => {
	const [selectedValues, setSelectedValues] =
		useState<ValuesChecked[]>(valuesChecked);

	useEffect(() => setSelectedValues(valuesChecked), [valuesChecked]);

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

	const { loadMoreRef } = useGetMorePages({
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	});
	return (
		<div className="max-h-[250px]">
			{isSearchable && (
				<div className="flex  w-[350px] bg-[#F6F6F6] p-2 mb-4 max-h-[34px] rounded-lg text-sm">
					<input
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
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
					<div className="space-y-4 w-full px-2 text-left">
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
						{isFetchingNextPage && (
							<div className="flex items-center">
								<Skeleton className="w-full" />
							</div>
						)}
						<div
							ref={loadMoreRef}
							style={{ height: "1px" }}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ListFilter;
