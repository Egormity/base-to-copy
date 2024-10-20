import cn from "classnames";
import { type ChangeEventHandler, type FC, useEffect, useState } from "react";

import styles from "./Checkbox.module.scss";

interface ICheckbox {
	value?: boolean;
	label?: string;
	subtitle?: string;
	id?: string;
	classNameWrapper?: React.HTMLAttributes<HTMLDivElement>["className"];
	onChange?: ChangeEventHandler<HTMLInputElement>;
	defaultChecked?: boolean;
	color?: string;
	handleValueChange?: boolean;
	onChangeFunc?: (value?: boolean) => void;
}

export const Checkbox: FC<ICheckbox> = ({
	classNameWrapper,
	onChange,
	value,
	subtitle,
	label,
	id,
	defaultChecked,
	color,
	handleValueChange,
	onChangeFunc,
}) => {
	const checkboxId = id || `checkbox-${Math.random()}`;

	// FOR CHECKBOXES WITHOUT CONTROLLER
	const [testValue, setTestValue] = useState(defaultChecked || false);

	useEffect(() => {
		defaultChecked && setTestValue(defaultChecked);
	}, [defaultChecked, setTestValue]);

	useEffect(() => {
		setTestValue(!!value);
	}, [value, handleValueChange]);

	const [isSet, setIsSet] = useState(false);

	return (
		<div className={cn(styles["input-wrapper"], classNameWrapper)}>
			<div className={styles["input-container"]}>
				<input
					checked={value}
					defaultChecked={testValue}
					onChange={(event) => {
						onChange?.(event);
						setTestValue(event.target.checked);
						onChangeFunc?.(event.target.checked);
						setIsSet(true);
					}}
					id={checkboxId}
					type="checkbox"
				/>
				<label
					htmlFor={checkboxId}
					className="text-lg "
				>
					<span
						className={cn(
							color
								? ""
								: value || testValue || (defaultChecked && !isSet)
									? "!border-color-active"
									: "!border-color-inactive",
							styles["checkbox"]
						)}
						style={{ borderColor: color }}
					/>
				</label>
			</div>
			<div className={styles["input-label"]}>
				{label && (
					<label
						htmlFor={checkboxId}
						className="cursor-pointer"
					>
						{label}
					</label>
				)}
				{subtitle && <span>{subtitle}</span>}
			</div>
		</div>
	);
};
