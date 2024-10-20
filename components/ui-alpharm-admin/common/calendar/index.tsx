import classnames from "classnames";
import React from "react";

import { checkDateIsEqual, isDateInRange } from "@/utils/date";

import styles from "./Calendar.module.scss";
import { useCalendar } from "./hooks/useCalendar";

interface CalendarProps {
	locale?: string;
	selectedDate: Date | [Date, Date];
	selectDate: (date: Date | [Date, Date]) => void;
	firstWeekDayNumber?: number;
	selectWeek?: boolean;
	setStartAndEndDates?: React.Dispatch<
		React.SetStateAction<{ startDate: Date; endDate: Date }>
	>;
	switchMode?: boolean;
	showWeekNames?: boolean;
	mode?: "single" | "range" | "week" | "month" | null;
	minDate?: Date;
	maxDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({
	locale = "default",
	selectedDate,
	selectDate,
	firstWeekDayNumber = 2,
	showWeekNames = false,
	mode = "single",
	maxDate,
	minDate,
}) => {
	const { functions, state } = useCalendar({
		locale,
		selectedDate: Array.isArray(selectedDate) ? selectedDate[0] : selectedDate,
		firstWeekDayNumber,
	});

	const [startDate, setStartDate] = React.useState<Date | null>(
		Array.isArray(selectedDate) ? selectedDate[0] : null
	);
	const [endDate, setEndDate] = React.useState<Date | null>(
		Array.isArray(selectedDate) ? selectedDate[1] : null
	);
	const [hoverStartDate, setHoverStartDate] = React.useState<Date | null>(null);
	const [hoverEndDate, setHoverEndDate] = React.useState<Date | null>(null);

	const getWeekRange = (date: Date) => {
		const dayOfWeek = (date.getDay() + 6) % 7;

		const startOfWeek = new Date(date);
		const endOfWeek = new Date(date);

		startOfWeek.setDate(date.getDate() - dayOfWeek);
		startOfWeek.setHours(0, 0, 0, 0);

		endOfWeek.setDate(startOfWeek.getDate() + 6);
		endOfWeek.setHours(23, 59, 59, 999);

		return { startOfWeek, endOfWeek };
	};
	const handleMouseEnter = (day: { date: Date } | undefined) => {
		if (!day) return;

		if (mode === "week") {
			const { startOfWeek, endOfWeek } = getWeekRange(day.date);
			setHoverStartDate(startOfWeek);
			setHoverEndDate(endOfWeek);
		} else if (mode === "range") {
			if (startDate && !endDate) {
				if (day.date < startDate) {
					setHoverStartDate(day.date);
					setHoverEndDate(startDate);
				} else {
					setHoverStartDate(startDate);
					setHoverEndDate(day.date);
				}
			}
		}
	};

	const handleRangeSelection = (day: Date) => {
		if (!startDate) {
			setStartDate(day);
			selectDate([day, day]);
		} else if (!endDate) {
			const updatedEndDate = day < startDate ? startDate : day;
			const updatedStartDate = day < startDate ? day : startDate;

			setStartDate(updatedStartDate);
			setEndDate(updatedEndDate);

			selectDate([updatedStartDate, updatedEndDate]);
		} else {
			setStartDate(day);
			setEndDate(null);

			selectDate([day, day]);
		}
	};

	const handleDayClick = (
		day:
			| {
					date: Date;
					dayNumber: number;
					day: string;
					dayNumberInWeek: number;
					dayShort: string;
					year: number;
					yearShort: string;
					month: string;
					monthShort: string;
					monthNumber: number;
					monthIndex: number;
					timestamp: number;
					week: number;
			  }
			| undefined
	) => {
		if (!day) return;

		if (mode === "single") {
			functions.setSelectedDay(day);
			selectDate(day.date);
		} else if (mode === "range") {
			handleRangeSelection(day.date);
		} else if (mode === "week") {
			const { startOfWeek, endOfWeek } = getWeekRange(day.date);
			setStartDate(startOfWeek);
			setEndDate(endOfWeek);
			selectDate([startOfWeek, endOfWeek]);
		}
	};

	const handleMouseLeave = () => {
		setHoverStartDate(null);
		setHoverEndDate(null);
	};

	const renderCalendarDays = () =>
		state.calendarDays.map((day) => {
			if (!day) return null;

			const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);

			const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
			const isInRange =
				startDate && endDate && isDateInRange(day.date, startDate, endDate);

			const isInHoverRange =
				hoverStartDate &&
				hoverEndDate &&
				isDateInRange(day.date, hoverStartDate, hoverEndDate);

			const isDisabled =
				(minDate && day.date < minDate) || (maxDate && day.date > maxDate);

			return (
				<div
					key={`${day.dayNumber}-${day.monthIndex}`}
					onClick={!isDisabled ? () => handleDayClick(day) : undefined}
					onMouseEnter={!isDisabled ? () => handleMouseEnter(day) : undefined}
					onMouseLeave={!isDisabled ? handleMouseLeave : undefined}
					className={classnames(styles["calendarDay"], {
						[styles["calendarSelectedItemBg"] as string]:
							isSelectedDay && mode === "single",
						[styles["calendarAdditionalDay"] as string]: isAdditionalDay,
						[styles["calendarRangeItem"] as string]:
							(isInRange && mode === "week") || (isInRange && mode === "range"),
						[styles["calendarHoverRangeItem"] as string]:
							(isInHoverRange && mode === "range") ||
							(isInHoverRange && mode === "week"),
						[styles["calendarDisabledDay"] as string]: isDisabled,
					})}
				>
					{day.dayNumber}
				</div>
			);
		});

	return (
		<div className={styles["calendar"]}>
			<div className={styles["calendarHeader"]}>
				<div
					className={styles["calendarHeaderArrowLeft"]}
					onClick={() => functions.onClickArrow("left")}
				/>
				{state.mode === "days" && (
					<div>
						{`${state.MonthsNames[state.selectedMonth.monthIndex]?.month} ${state.selectedYear}`}
					</div>
				)}
				<div
					className={styles["calendarHeaderArrowRight"]}
					onClick={() => functions.onClickArrow("right")}
				/>
			</div>
			<div className={styles["calendarBody"]}>
				{state.mode === "days" && (
					<>
						{showWeekNames && (
							<div className={styles["calendarWeekNames"]}>
								{state.weekDaysNames.map((weekDaysName) => (
									<div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
								))}
							</div>
						)}
						<div className={styles["calendarDays"]}>{renderCalendarDays()}</div>
					</>
				)}
			</div>
		</div>
	);
};
