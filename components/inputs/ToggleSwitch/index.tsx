import cn from "classnames";
import type { FC } from "react";

import styles from "./ToggleSwitch.module.scss";

interface IToggleSwitch {
	id?: string;
	checked: boolean;
	// onChange: (checked: boolean) => void;
	disabled?: boolean;
	label?: string;
	labelLeft?: string;
	className?: string;
	customStyles?: Record<string, string>;
	onChange?: any;
}

export const ToggleSwitch: FC<IToggleSwitch> = ({
	id,
	checked = false,
	labelLeft,
	onChange,
	disabled,
	className,
	label,
	customStyles,
}) => {
	return (
		<div className={cn("flex gap-2 items-center", className)}>
			{labelLeft && <div className="text-sm font-semibold">{labelLeft}</div>}
			<label className={styles["wrapper-input"]}>
				<input
					id={id}
					type="checkbox"
					checked={checked}
					onChange={() => {
						onChange(!checked);
					}}
					disabled={disabled}
				/>
				<span
					className={cn(styles["input-background"], {
						"bg-color-active": checked,
						"bg-gray-200": !checked,
					})}
					style={customStyles}
				/>
				<span
					className={cn(styles["input-toggle"], {
						"translate-x-full": checked,
						"translate-x-0": !checked,
					})}
				/>
			</label>
			{label && <div className="text-sm font-semibold">{label}</div>}
		</div>
	);
};
