import { ReactComponent as ArrowIconVertical } from "@assets/icons/dropdown-icon.svg";
import cn from "classnames";
import React from "react";
import { Controller } from "react-hook-form";

import { Calendar } from "../../common/calendar";

import styles from "./DateInput.module.scss";

interface DateInputProps {
	title?: string;
	control: any;
	name: string;
	rules?: any;
	className?: string;

	mode?: "single" | "range" | "week";
}

const DateInput: React.FC<DateInputProps> = ({
	control,
	title,
	name,
	rules,
	className,
	mode,
}) => {
	const [isCalendarOpen, setCalendarOpen] = React.useState(false);
	const [tempDate, setTempDate] = React.useState<Date | [Date, Date] | null>(
		null
	);

	const handleCloseModal = () => {
		setCalendarOpen(false);
		setTempDate(null);
	};

	const handleSave = (onChange: (date: Date | [Date, Date] | null) => void) => {
		if (tempDate) {
			onChange(tempDate);
		}
		setCalendarOpen(false);
	};

	const handleOutsideClick = (e: any) => {
		if (e.target.classList.contains(styles["modal"])) {
			handleCloseModal();
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

	return (
		<div className={cn(styles["dateInputWrapper"], className)}>
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<>
						<div className="gap-2 flex flex-col">
							<h3 className="text-xs font-normal text-[#9B9B9B]">
								{title}
								{!!rules?.required && (
									<span
										aria-hidden="true"
										className="text-[#EF4000]"
									>
										{" "}
										*
									</span>
								)}
							</h3>
							<div
								className={styles["container"]}
								onClick={() => setCalendarOpen(true)}
							>
								<input
									type="text"
									value={
										Array.isArray(value as Date | Date[])
											? `${value[0].toLocaleDateString()} - ${value[1].toLocaleDateString()}`
											: value
												? value.toLocaleDateString()
												: ""
									}
									readOnly
									placeholder="Введите дату"
									className={cn(styles["dateInput"], {
										[styles["inputError"] as string]: error,
									})}
								/>
								<ArrowIconVertical className="rotate-180" />
							</div>
						</div>
						{isCalendarOpen && (
							<div
								className={styles["modal"]}
								onClick={handleOutsideClick}
							>
								<div className={styles["modalContent"]}>
									<div className="flex justify-center mb-4 mt-3 text-[#727272] font-light text-xs">
										Выберите {getStatusHeader(mode)}
									</div>
									<Calendar
										showWeekNames
										mode={mode}
										selectedDate={tempDate || value || new Date()}
										selectDate={(date: Date | [Date, Date]) =>
											setTempDate(date)
										}
									/>
									<div className={styles["modalActions"]}>
										<button
											onClick={handleCloseModal}
											className={styles["cancelButton"]}
										>
											Отменить
										</button>
										<button
											onClick={() => handleSave(onChange)}
											className={styles["saveButton"]}
										>
											Сохранить
										</button>
									</div>
								</div>
							</div>
						)}
						{error && (
							<p className={styles["errorMessage"]}>{error["message"]}</p>
						)}
					</>
				)}
			/>
		</div>
	);
};

export default DateInput;
