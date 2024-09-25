import cn from "classnames";
import type { ChangeEventHandler, FC } from "react";

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
}) => {
	const checkboxId = id || `checkbox-${Math.random()}`;

	return (
		<div className={cn(styles["input-wrapper"], classNameWrapper)}>
			<div className={styles["input-container"]}>
				<input
					checked={value}
					defaultChecked={defaultChecked}
					onChange={onChange}
					id={checkboxId}
					type="checkbox"
				/>
				<label
					htmlFor={checkboxId}
					className="text-lg"
				>
					<span
						className={
							color
								? ""
								: value
									? "!border-color-active"
									: "!border-color-inactive"
						}
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
