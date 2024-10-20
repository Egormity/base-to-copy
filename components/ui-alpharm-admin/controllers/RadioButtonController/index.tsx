import type { FC } from "react";
import { Controller } from "react-hook-form";

import { RadioButton } from "../../inputs";

export const RadioButtonController: FC<any> = ({
	control,
	rules,
	name,
	label,
	className,
	onClick,
	checked,
}: {
	control: any;
	rules: any;
	name: string;
	label?: string;
	className?: string;
	onClick?: () => void;
	checked?: boolean;
}) => {
	return (
		<Controller
			control={control}
			rules={rules}
			name={name}
			defaultValue={false}
			render={({ field: { value, onChange } }) => {
				return (
					<RadioButton
						value={value}
						label={label}
						checked={checked}
						//@ts-ignore
						onChange={onChange}
						onClick={onClick}
						className={className}
						name={name}
					/>
				);
			}}
		/>
	);
};
