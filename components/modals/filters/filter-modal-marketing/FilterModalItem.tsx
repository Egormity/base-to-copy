import { ReactComponent as ArrowVertical } from "@assets/icons/arrow-vertical-icon.svg";
import cn from "classnames";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { Calendar } from "@/components/ui/common/calendar";
import { RadioButton, ToggleSwitch } from "@/components/ui/inputs";

import { Filter } from "@/store/filters/marketingFilterStore";

import Modal from "../../modal";

import styles from "./FilterModalItem.module.scss";
import Select from "./Select";

interface IItemFilterModal {
	label: string;
	name: string | string[];
	value?: string;

	filters: Filter[];
	typeValue?: string;

	type: "list" | "select" | "calendar";
	data?: { id: number | string; name: string; subtitle?: string }[];

	isLoading?: boolean;
	isSearchable?: boolean;
	// @ts-ignore
	setDatesTemporal;

	onChange?: Dispatch<SetStateAction<string>>;
	addFilter: (name: string, value: number, itemName?: string) => void;
	removeFilter: (name: string, value: number, itemName?: string) => void;
	// @ts-ignore
	temporalDefaultValue;
	// @ts-ignore
	setTemporalType;
	// @ts-ignore
	temporalDefaultCalendarType;
}

export const FilterModalItem: FC<IItemFilterModal> = ({
	label,
	type,
	data = [],
	name,
	filters,
	isSearchable,
	typeValue,
	addFilter,
	removeFilter,
	isLoading,
	setDatesTemporal,
	temporalDefaultValue,
	setTemporalType,
	temporalDefaultCalendarType,

	value = "",
	onChange = () => {},
}) => {
	const selectedFilter = filters.find((filter) => filter.name === name);
	const [isOpen, setIsOpen] = useState(true || !!selectedFilter);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [tempDate, setTempDate] = useState<Date | [Date, Date] | null>(null);
	// console.log(tempDate);

	useEffect(() => {
		// @ts-ignore
		if (tempDate && setDatesTemporal) setDatesTemporal(tempDate);
	}, [tempDate, setDatesTemporal]);

	const [selectedInterval, setSelectedInterval] = useState<
		"custom" | "week" | "single" | null
	>(null);

	const [selectedDateLabel, setSelectedDateLabel] =
		useState<string>("Не выбрано");

	// console.log(!!temporalDefaultValue);
	useEffect(() => {
		if (temporalDefaultValue && temporalDefaultValue.length !== 0) {
			//@ts-ignore
			onChange(temporalDefaultValue); //@ts-ignore
			if (Array.isArray(temporalDefaultValue)) {
				//@ts-ignore
				handleIntervalChange(temporalDefaultCalendarType || "custom"); //@ts-ignore
				setSelectedDateLabel(
					//@ts-ignore
					`${temporalDefaultValue?.[0].toLocaleDateString()} - ${temporalDefaultValue?.[1].toLocaleDateString()}` //@ts-ignore
				);
			} else {
				//@ts-ignore
				handleIntervalChange("single"); //@ts-ignore
				setSelectedDateLabel(temporalDefaultValue?.toLocaleDateString()); //@ts-ignore
			}
		}
		setIsOpenModal(false);
	}, []);

	const handleSave = (onChange: (date: Date | [Date, Date] | null) => void) => {
		if (tempDate) {
			onChange(tempDate);
			if (Array.isArray(tempDate)) {
				setSelectedDateLabel(
					`${tempDate[0].toLocaleDateString()} - ${tempDate[1].toLocaleDateString()}`
				);
			} else {
				setSelectedDateLabel(tempDate.toLocaleDateString());
			}
		}
		setIsOpenModal(false);
	};

	const handleCalendarModal = () => setIsOpenModal(!isOpenModal);

	const handleIntervalChange = (interval: "custom" | "week" | "single") => {
		setSelectedInterval(interval);
		//@ts-ignore
		setTemporalType(interval);
		setSelectedDateLabel("Не выбрано");
		setTempDate(null);
	};

	const handleLabelClick = () => {
		if (selectedInterval) {
			handleCalendarModal();
		}
	};

	const getStatusHeader = (mode?: "single" | "range" | "week") => {
		switch (mode) {
			case "single":
				return "дату";
			case "week":
				return "неделю";
			case "range":
				return "промежуток времени";
			default:
				return null;
		}
	};

	const handlerVisible = () => setIsOpen(!isOpen);

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

	return (
		<li className={styles["wrapper-item"]}>
			{type !== "calendar" && (
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
			)}

			{isOpen && type === "list" && (
				<Select
					isLoading={isLoading}
					data={data}
					name={name}
					value={value}
					onChange={onChange}
					typeValue={typeValue}
					addFilter={addFilter}
					removeFilter={removeFilter}
					valuesChecked={selectedFilter?.values || []}
					isSearchable={isSearchable}
				/>
			)}

			{type === "calendar" && (
				<>
					<div className="flex flex-col gap-2">
						<RadioButton
							value="custom"
							label="Свой интервал"
							checked={selectedInterval === "custom"}
							onChange={() => handleIntervalChange("custom")}
							name="interval"
						/>
						{selectedInterval === "custom" && (
							<span
								className="text-xs text-gray-500 cursor-pointer border-[1px] border-[#E4E4E4] w-fit p-2 rounded-full"
								onClick={handleLabelClick}
							>
								{selectedDateLabel}
							</span>
						)}

						<RadioButton
							value="week"
							label="Неделя"
							checked={selectedInterval === "week"}
							onChange={() => handleIntervalChange("week")}
							name="interval"
						/>
						{selectedInterval === "week" && (
							<span
								className="text-xs text-gray-500 cursor-pointer border-[1px] border-[#E4E4E4] w-fit p-2 rounded-full"
								onClick={handleLabelClick}
							>
								{selectedDateLabel}
							</span>
						)}

						<RadioButton
							value="month"
							label="День"
							checked={selectedInterval === "single"}
							onChange={() => handleIntervalChange("single")}
							name="interval"
						/>
						{selectedInterval === "single" && (
							<span
								className="text-xs text-gray-500 cursor-pointer border-[1px] border-[#E4E4E4] w-fit p-2 rounded-full"
								onClick={handleLabelClick}
							>
								{selectedDateLabel}
							</span>
						)}
					</div>

					<Modal
						isOpen={isOpenModal}
						onCancel={handleCalendarModal}
					>
						<div className={styles["modalContent"]}>
							<div className="flex justify-center mb-4 mt-3 text-[#727272] font-light text-xs">
								Выберите{" "}
								{getStatusHeader(
									//@ts-ignore
									selectedInterval === "custom" ? "range" : selectedInterval
								)}
							</div>
							<Calendar
								//@ts-ignore
								mode={
									selectedInterval === "custom" ? "range" : selectedInterval
								}
								selectedDate={tempDate || new Date()}
								selectDate={(date: Date | [Date, Date]) => setTempDate(date)}
							/>
							<div className={styles["modalActions"]}>
								<button
									onClick={handleCalendarModal}
									className={styles["cancelButton"]}
								>
									Отменить
								</button>
								<button
									//@ts-ignore
									onClick={() => handleSave(onChange)}
									className={styles["saveButton"]}
								>
									Сохранить
								</button>
							</div>
						</div>
					</Modal>
				</>
			)}
		</li>
	);
};
