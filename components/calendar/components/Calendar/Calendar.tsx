import React from "react";

import { checkDateIsEqual, checkIsToday } from "../../utils/helpers/date";

import styles from "./Calendar.module.css";
import { useCalendar } from "./hooks/useCalendar";

interface CalendarProps {
	locale?: string;
	selectedDate: Date;
	selectDate: (date: Date) => void;
	firstWeekDayNumber?: number;
	defaultMode?: "days" | "Months" | "years";
	selectWeek?: boolean;
	setStartAndEndDates?: React.Dispatch<
		React.SetStateAction<{ startDate: Date; endDate: Date }>
	>;
	switchMode?: boolean;
	showWeekNames?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
	locale = "default",
	selectedDate,
	selectDate,
	firstWeekDayNumber = 2,
	defaultMode,
	selectWeek = false,
	setStartAndEndDates,
	switchMode = false,
	showWeekNames = false,
}) => {
	const { functions, state } = useCalendar({
		locale,
		selectedDate,
		firstWeekDayNumber,
		defaultMode,
	});

	const [selectedWeek, setSelectedWeek] = React.useState(0);
	const weekHeightPercent = 100 / (state.calendarDays.length / 7);
	// console.log(selectedWeek);

	return (
		<div className={styles["calendar"]}>
			<div className={styles["calendar__header"]}>
				<div
					aria-hidden
					className={styles["calendar__header__arrow__left"]}
					onClick={() => {
						functions.onClickArrow("left");
					}}
				/>
				{state.mode === "days" && (
					<div
						aria-hidden
						onClick={() => {
							switchMode && functions.setMode("Months");
						}}
						className="cursor-pointer"
					>
						{state.MonthsNames[state.selectedMonth.monthIndex]?.month}{" "}
						{state.selectedYear}
					</div>
				)}
				{state.mode === "Months" && (
					<div
						aria-hidden
						onClick={() => {
							switchMode && functions.setMode("years");
						}}
						className="cursor-pointer"
					>
						{state.selectedYear}
					</div>
				)}
				{state.mode === "years" && (
					<div className="cursor-pointer">
						{state.selectedYearsInterval[0]} -{" "}
						{
							state.selectedYearsInterval[
								state.selectedYearsInterval.length - 1
								// state?.selectedYearsInterval.at(-1)
							]
						}
					</div>
				)}
				<div
					aria-hidden
					className={styles["calendar__header__arrow__right"]}
					onClick={() => {
						functions.onClickArrow("right");
					}}
				/>
			</div>
			<div className={styles["calendar__body"]}>
				{state.mode === "days" && (
					<>
						{showWeekNames && (
							<div className={styles["calendar__week__names"]}>
								{state.weekDaysNames.map((weekDaysName) => (
									<div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
								))}
							</div>
						)}
						<div className={styles["calendar__days"]}>
							{state.calendarDays.map((day, index) => {
								const isToday = checkIsToday(day.date);
								const isSelectedDay = checkDateIsEqual(
									//@ts-ignore
									day.date,
									state.selectedDay.date
								);
								const isAdditionalDay =
									//@ts-ignore
									day.monthIndex !== state.selectedMonth.monthIndex;
								const newSelectedWeek = Math.floor(index / 7);

								return (
									<div
										key={`${day?.dayNumber}-${day?.monthIndex}`}
										aria-hidden
										onClick={() => {
											functions.setSelectedDay(day);
											//@ts-ignore
											selectDate && selectDate(day.date);

											setSelectedWeek(newSelectedWeek);

											const weekStartDay =
												state?.calendarDays[7 * newSelectedWeek]?.date;
											const weekEndDay =
												state?.calendarDays[7 * newSelectedWeek + 6]?.date;
											setStartAndEndDates &&
												setStartAndEndDates({
													startDate: weekStartDay as Date,
													endDate: weekEndDay as Date,
												});
										}}
										className={[
											styles["calendar__day"],
											isToday ? styles["calendar__today__item"] : "",
											!selectWeek && isSelectedDay
												? styles["calendar__selected__item--bg"]
												: "",

											selectWeek &&
											index >= 7 * selectedWeek &&
											index < 7 * (selectedWeek + 1)
												? "text-white"
												: isAdditionalDay
													? styles["calendar__additional__day"]
													: "",
										].join(" ")}
									>
										{day?.dayNumber}
									</div>
								);
							})}

							{selectWeek && (
								<span
									className={styles["calendar__days--selected-week"]}
									style={{
										height: `${weekHeightPercent}%`,
										left: 0,
										top: `${selectedWeek * weekHeightPercent}%`,
									}}
								/>
							)}
						</div>
					</>
				)}

				{state.mode === "Months" && (
					<div className={styles["calendar__pick__items__container"]}>
						{state.MonthsNames.map((MonthsName) => {
							const isCurrentMonth =
								new Date().getMonth() === MonthsName.monthIndex &&
								state.selectedYear === new Date().getFullYear();
							const isSelectedMonth =
								MonthsName.monthIndex === state.selectedMonth.monthIndex;

							return (
								<div
									key={MonthsName.month}
									aria-hidden
									onClick={() => {
										functions.setSelectedMonthByIndex(MonthsName.monthIndex);
										console.log(MonthsName.month);
										// selectDate(MonthsName.month);
										switchMode && functions.setMode("days");

										const endDate = new Date(MonthsName.date);
										endDate.setMonth(endDate.getMonth() + 1);
										endDate.setDate(0);
										setStartAndEndDates &&
											setStartAndEndDates({
												startDate: MonthsName.date,
												endDate: endDate,
											});
									}}
									className={[
										styles["calendar__pick__item"],
										isSelectedMonth
											? styles["calendar__selected__item--border"]
											: "",
										isCurrentMonth ? styles["calendar__today__item"] : "",
									].join(" ")}
								>
									{MonthsName.month}
								</div>
							);
						})}
					</div>
				)}

				{state.mode === "years" && (
					<div className={styles["calendar__pick__items__container"]}>
						<div className={styles["calendar__unchoosable__year"]}>
							{(state?.selectedYearsInterval?.[0] as number) - 1}
						</div>
						{state.selectedYearsInterval.map((year) => {
							const isCurrentYear = new Date().getFullYear() === year;
							const isSelectedYear = year === state.selectedYear;

							return (
								<div
									key={year}
									aria-hidden
									onClick={() => {
										functions.setSelectedYear(year);
										switchMode && functions.setMode("Months");

										setStartAndEndDates &&
											setStartAndEndDates({
												startDate: new Date(year, 0, 1),
												endDate: new Date(year, 11, 31),
											});
									}}
									className={[
										styles["calendar__pick__item"],
										isCurrentYear ? styles["calendar__today__item"] : "",
										isSelectedYear
											? styles["calendar__selected__item--border"]
											: "",
									].join(" ")}
								>
									{year}
								</div>
							);
						})}
						<div className={styles["calendar__unchoosable__year"]}>
							{/* @ts-ignore */}
							{state?.selectedYearsInterval[
								state?.selectedYearsInterval?.length - 1
							] + 1}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
