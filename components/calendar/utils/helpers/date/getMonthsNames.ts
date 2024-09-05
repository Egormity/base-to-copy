import { createDate } from "./createDate";

export const getMonthsNames = (locale: string = "defalut") => {
	const MonthsNames: {
		month: ReturnType<typeof createDate>["month"];
		monthShort: ReturnType<typeof createDate>["monthShort"];
		monthIndex: ReturnType<typeof createDate>["monthIndex"];
		date: ReturnType<typeof createDate>["date"];
	}[] = Array.from({ length: 12 });

	const d = new Date();

	MonthsNames.forEach((_, i) => {
		const { month, monthIndex, monthShort, date } = createDate({
			locale,
			date: new Date(d.getFullYear(), d.getMonth() + i, 1),
		});

		MonthsNames[monthIndex] = { month, monthIndex, monthShort, date };
	});

	return MonthsNames;
};
