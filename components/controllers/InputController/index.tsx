import type { FC } from "react";
import {
	type Control,
	Controller,
	type RegisterOptions,
} from "react-hook-form";

import InputTest from "../../inputs/InputEdit/InputEditTest";

interface InputControllerProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;
	classNameInput?: string;
	icon?: React.ReactNode;
	rules?:
		| Omit<
				RegisterOptions<any, string>,
				"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
		  >
		| undefined;

	errors: any;
	placeholder?: string;
	control: Control<any>;
	onSetInputValue?: (value: string) => void;
	defaultValue?: string | number;
	min?: number;
	onBlurFunc?: (event?: string) => void;
}

export const InputController: FC<InputControllerProps> = ({
	classNameWrapper,
	classNameContainer,
	classNameTitle,
	classNameInput,
	control,
	errors,
	label,
	rules,
	placeholder,
	icon,
	name,
	type,
	defaultValue = "",
	onSetInputValue,
	min,
	onBlurFunc,
}) => {
	const error = errors[name];

	return (
		<Controller
			control={control}
			rules={rules}
			name={name}
			render={({ field: { onChange, onBlur, value = defaultValue } }) => {
				return (
					<InputTest
						label={label}
						onChange={(e) => {
							onChange(e.target.value);
						}}
						onBlur={(e) => {
							onBlurFunc && onBlurFunc(e.target.value);
							onBlur();
						}}
						value={value}
						classNameWrapper={classNameWrapper}
						classNameContainer={classNameContainer}
						classNameTitle={classNameTitle}
						classNameInput={classNameInput}
						icon={icon}
						placeholder={placeholder}
						error={error?.message}
						required={!!rules?.required}
						//@ts-ignore
						type={type}
						name={name}
						onSetInputValue={onSetInputValue}
						min={min}
					/>
				);
			}}
		/>
	);
};
