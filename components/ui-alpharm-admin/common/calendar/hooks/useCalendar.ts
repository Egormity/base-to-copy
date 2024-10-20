import React from "react";

import {
	createDate,
	createMonth,
	getMonthNumberOfDays,
	getMonthsNames,
	getWeekDaysNames,
} from "@/utils/date";

interface UseCalendarParams {
	locale?: string;
	selectedDate: Date;
	firstWeekDayNumber?: number;
	defaultMode?: "days" | "Months" | "years";
}

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
	const startYear = Math.floor(year / 10) * 10;
	return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
	locale = "default",
	selectedDate: date,
	firstWeekDayNumber = 2,
	defaultMode = "days",
}: UseCalendarParams) => {
	const [mode, setMode] = React.useState<"days" | "Months" | "years">(
		defaultMode
	);
	const [selectedDay, setSelectedDay] = React.useState(createDate({ date }));
	const [selectedMonth, setSelectedMonth] = React.useState(
		createMonth({
			date: new Date(selectedDay.year, selectedDay.monthIndex),
			locale,
		})
	);
	const [selectedYear, setSelectedYear] = React.useState(selectedDay.year);
	const [selectedYearsInterval, setSelectedYearsInterval] = React.useState(
		getYearsInterval(selectedDay.year)
	);

	const MonthsNames = React.useMemo(() => getMonthsNames(locale), []);
	const weekDaysNames = React.useMemo(
		() => getWeekDaysNames(firstWeekDayNumber, locale),
		[]
	);

	const days = React.useMemo(
		() => selectedMonth.createMonthDays(),
		[selectedMonth, selectedYear]
	);

	const calendarDays = React.useMemo(() => {
		const monthNumberOfDays = getMonthNumberOfDays(
			selectedMonth.monthIndex,
			selectedYear
		);

		const prevMonthDays = createMonth({
			date: new Date(selectedYear, selectedMonth.monthIndex - 1),
			locale,
		}).createMonthDays();

		const nextMonthDays = createMonth({
			date: new Date(selectedYear, selectedMonth.monthIndex + 1),
			locale,
		}).createMonthDays();

		const firstDay = days[0];
		const lastDay = days[monthNumberOfDays - 1];

		const shiftIndex = firstWeekDayNumber - 1;
		const numberOfPrevDays =
			//@ts-ignore
			firstDay.dayNumberInWeek - 1 - shiftIndex < 0
				? //@ts-ignore
					DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
				: //@ts-ignore
					firstDay.dayNumberInWeek - 1 - shiftIndex;

		const numberOfNextDays =
			//@ts-ignore
			DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
				? //@ts-ignore
					DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
				: //@ts-ignore
					DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

		const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

		const result = [];

		for (let i = 0; i < numberOfPrevDays; i += 1) {
			const inverted = numberOfPrevDays - i;
			result[i] = prevMonthDays[prevMonthDays.length - inverted];
		}

		for (
			let i = numberOfPrevDays;
			i < totalCalendarDays - numberOfNextDays;
			i += 1
		) {
			result[i] = days[i - numberOfPrevDays];
		}

		for (
			let i = totalCalendarDays - numberOfNextDays;
			i < totalCalendarDays;
			i += 1
		) {
			result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
		}

		return result;
	}, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

	const onClickArrow = (direction: "right" | "left") => {
		if (mode === "years" && direction === "left") {
			return setSelectedYearsInterval(
				//@ts-ignore
				getYearsInterval(selectedYearsInterval[0] - 10)
			);
		}

		if (mode === "years" && direction === "right") {
			return setSelectedYearsInterval(
				//@ts-ignore
				getYearsInterval(selectedYearsInterval[0] + 10)
			);
		}

		if (mode === "Months" && direction === "left") {
			const year = selectedYear - 1;
			if (!selectedYearsInterval.includes(year))
				setSelectedYearsInterval(getYearsInterval(year));
			return setSelectedYear(selectedYear - 1);
		}

		if (mode === "Months" && direction === "right") {
			const year = selectedYear + 1;
			if (!selectedYearsInterval.includes(year))
				setSelectedYearsInterval(getYearsInterval(year));
			return setSelectedYear(selectedYear + 1);
		}

		if (mode === "days") {
			const monthIndex =
				direction === "left"
					? selectedMonth.monthIndex - 1
					: selectedMonth.monthIndex + 1;
			if (monthIndex === -1) {
				const year = selectedYear - 1;
				setSelectedYear(year);
				if (!selectedYearsInterval.includes(year))
					setSelectedYearsInterval(getYearsInterval(year));
				return setSelectedMonth(
					createMonth({ date: new Date(selectedYear - 1, 11), locale })
				);
			}

			if (monthIndex === 12) {
				const year = selectedYear + 1;
				setSelectedYear(year);
				if (!selectedYearsInterval.includes(year))
					setSelectedYearsInterval(getYearsInterval(year));
				return setSelectedMonth(
					createMonth({ date: new Date(year, 0), locale })
				);
			}

			setSelectedMonth(
				createMonth({ date: new Date(selectedYear, monthIndex), locale })
			);
		}
	};

	const setSelectedMonthByIndex = (monthIndex: number) => {
		setSelectedMonth(
			createMonth({ date: new Date(selectedYear, monthIndex), locale })
		);
	};

	return {
		state: {
			mode,
			calendarDays,
			weekDaysNames,
			MonthsNames,
			selectedDay,
			selectedMonth,
			selectedYear,
			selectedYearsInterval,
		},
		functions: {
			onClickArrow,
			setMode,
			setSelectedDay,
			setSelectedMonthByIndex,
			setSelectedYear,
			setSelectedYearsInterval,
		},
	};
};
