// ToggleSwitchController.tsx
import React from "react";
import { Control, Controller } from "react-hook-form";

import { ToggleSwitch } from "../../inputs";

interface ToggleSwitchControllerProps {
	name: string;
	control: Control<any>;
	labelLeft?: string;
	label?: string;
	disabled?: boolean;
	className?: string;
	defaultValue?: boolean;
	onChange?: (checked: boolean) => void;
}

export const ToggleSwitchController: React.FC<ToggleSwitchControllerProps> = ({
	name,
	control,
	labelLeft,
	label,
	disabled,
	className,
	defaultValue,
	onChange,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field }) => (
				<ToggleSwitch
					id={field.name}
					checked={!!field.value}
					//@ts-ignore
					onChange={(checked) => {
						if (onChange) {
							onChange(checked);
						} else {
							field.onChange(checked);
						}
					}}
					disabled={disabled}
					className={className}
					labelLeft={labelLeft}
					label={label}
				/>
			)}
		/>
	);
};
