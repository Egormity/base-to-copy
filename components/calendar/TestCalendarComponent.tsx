import React from "react";

import { Calendar } from "./components";

// import { formatDate } from "./utils/helpers/date";

const TestCalendarComponent: React.FC = () => {
	const [selectedDate, setSelectedDay] = React.useState(new Date());
	const [startAndEndDates, setStartAndEndDates] = React.useState({
		startDate: new Date(),
		endDate: new Date(),
	});
	// console.log(selectedDate);
	console.log(startAndEndDates);

	return (
		<div className="calendar__container">
			{/* <div className="calendar__selected-date">
				{formatDate(selectedDate, "DDD DD MMM YYYY")}
			</div> */}

			<Calendar
				locale="ru-RU"
				selectedDate={selectedDate}
				defaultMode="days"
				selectWeek
				setStartAndEndDates={setStartAndEndDates}
				selectDate={(date) => {
					setSelectedDay(date);
				}}
			/>
		</div>
	);
};

export default TestCalendarComponent;
