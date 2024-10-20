import { type FC, useEffect, useState } from "react";

import { Calendar } from "@/components/ui/common/calendar";
import { RadioButton } from "@/components/ui/inputs";
import Modal from "@/components/ui/modals/modal";

import { Filter } from "@/store/filters/organizationFilterStore";

import styles from "../../FilterModalItem.module.scss";
import { VariantDateFilter } from "../../FilterModalItem.types";
import { getStatusHeader } from "../../utils";

interface ICalendarFilter {
	name: string | string[];

	addFilter: any;
	appliedFilters: any;

	removesAppliedFilters?: any;
	onChange?: (date: Date | [Date, Date] | string | null) => void;
}

const CalendarFilter: FC<ICalendarFilter> = ({
	addFilter,
	appliedFilters,
	name,
	onChange = () => {},
}) => {
	const StartDateFilter = appliedFilters.filter(
		(item: Filter) => item.name === "StartDate"
	);
	const EndDateFilter = appliedFilters.filter(
		(item: Filter) => item.name === "EndDate"
	);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedInterval, setSelectedInterval] = useState<VariantDateFilter>(
		StartDateFilter?.[0]?.additionalFields?.[0]?.name
	);

	const handleLabelClick = () => handleCalendarModal();
	const handleCalendarModal = () => setIsOpenModal(!isOpenModal);

	const handleIntervalChange = (interval: VariantDateFilter) => {
		setSelectedInterval(interval);
		setSelectedDateLabel("Не выбрано");
		setTempDate(null);
	};

	useEffect(() => {
		if (appliedFilters.length === 0) {
			setTempDate(null);
			setSelectedInterval(null);
			setSelectedDateLabel("Не выбрано");
		}
	}, [appliedFilters]);

	const handleSave = (onChange: (date: Date | [Date, Date] | null) => void) => {
		if (tempDate) {
			onChange(tempDate);

			if (Array.isArray(tempDate)) {
				setSelectedDateLabel(
					`${tempDate[0].toLocaleDateString()} - ${tempDate[1].toLocaleDateString()}`
				);
				addFilter(
					name[0],
					tempDate[0].toISOString().split("T")[0],
					tempDate[0].toLocaleDateString(),
					selectedInterval,
					true
				);
				addFilter(
					name[1],
					tempDate[1].toISOString().split("T")[0],
					tempDate[1].toLocaleDateString(),
					selectedInterval,
					true
				);
			} else {
				addFilter(
					name[0],
					tempDate.toISOString().split("T")[0],
					tempDate.toLocaleDateString(),
					selectedInterval,
					true
				);
				addFilter(
					name[1],
					tempDate.toISOString().split("T")[0],
					tempDate.toLocaleDateString(),
					selectedInterval,
					true
				);
				setSelectedDateLabel(tempDate.toLocaleDateString());
			}
		}
		setIsOpenModal(false);
	};

	const [selectedDateLabel, setSelectedDateLabel] = useState(
		(selectedInterval
			? `${StartDateFilter?.[0]?.values?.[0]?.name} ${EndDateFilter.length > 0 && selectedInterval !== "single" ? ` - ${EndDateFilter?.[0]?.values?.[0]?.name}` : ""}`
			: "Не выбрано") || "Не выбрано"
	);

	const [dayStart, monthStart, yearStart] = StartDateFilter?.[0]?.values?.[0]
		?.name
		? StartDateFilter?.[0]?.values?.[0]?.name.split(".")
		: [null, null, null];

	const [dayEnd, monthEng, yearEnf] = EndDateFilter?.[0]?.values?.[0]?.name
		? EndDateFilter?.[0]?.values?.[0]?.name.split(".")
		: [null, null, null];

	const currentDateEnd =
		dayEnd && monthEng && yearEnf
			? new Date(`${yearEnf}-${monthEng}-${dayEnd}`)
			: null;

	const currentDateStart =
		dayStart && monthStart && yearStart
			? new Date(`${yearStart}-${monthStart}-${dayStart}`)
			: null;

	const [tempDate, setTempDate] = useState<Date | [Date, Date] | null>(
		//@ts-ignore
		[currentDateStart, currentDateEnd && currentDateEnd]
	);

	return (
		<>
			<div className="flex flex-col gap-2">
				<RadioButton
					value="range"
					label="Свой интервал"
					checked={
						selectedInterval === "range" ||
						(!selectedInterval &&
							StartDateFilter?.[0]?.additionalFields?.[0]?.name === "range")
					}
					onChange={() => handleIntervalChange("range")}
					name="interval"
				/>
				{(selectedInterval === "range" ||
					(!selectedInterval &&
						StartDateFilter?.[0]?.additionalFields?.[0]?.name === "range")) && (
					<span
						className="text-xs text-gray-500 cursor-pointer border-[1px] border-primary-gray-light w-fit p-2 rounded-full"
						onClick={handleLabelClick}
					>
						{selectedDateLabel}
					</span>
				)}

				<RadioButton
					value="week"
					label="Неделя"
					checked={
						selectedInterval === "week" ||
						(!selectedInterval &&
							StartDateFilter?.[0]?.additionalFields?.[0]?.name === "week")
					}
					onChange={() => handleIntervalChange("week")}
					name="interval"
				/>
				{(selectedInterval === "week" ||
					(!selectedInterval &&
						StartDateFilter?.[0]?.additionalFields?.[0]?.name === "week")) && (
					<span
						className="text-xs text-gray-500 cursor-pointer border -[1px] border-primary-gray-light w-fit p-2 rounded-full"
						onClick={handleLabelClick}
					>
						{selectedDateLabel}
					</span>
				)}

				<RadioButton
					value="single"
					label="День"
					checked={
						selectedInterval === "single" ||
						(!selectedInterval &&
							StartDateFilter?.[0]?.additionalFields?.[0]?.name === "single")
					}
					onChange={() => handleIntervalChange("single")}
					name="interval"
				/>
				{(selectedInterval === "single" ||
					(!selectedInterval &&
						StartDateFilter?.[0]?.additionalFields?.[0]?.name ===
							"single")) && (
					<span
						className="text-xs text-gray-500 cursor-pointer border -[1px] border-primary-gray-light w-fit p-2 rounded-full"
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
				<div>
					<div className="flex justify-center mb-4 mt-3 text-[#727272] font-light text-xs">
						Выберите{" "}
						{getStatusHeader(
							selectedInterval ||
								StartDateFilter?.[0]?.additionalFields?.[0]?.name
						)}
					</div>
					<Calendar
						mode={
							selectedInterval ||
							StartDateFilter?.[0]?.additionalFields?.[0]?.name
						}
						selectedDate={tempDate || new Date()}
						selectDate={(date: Date | [Date, Date]) => setTempDate(date)}
					/>
					<div className="flex justify-center gap-2">
						<button
							onClick={handleCalendarModal}
							className={styles["cancelButton"]}
						>
							Отменить
						</button>
						<button
							onClick={() => handleSave?.(onChange)}
							className={styles["saveButton"]}
						>
							Сохранить
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CalendarFilter;
