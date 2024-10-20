import React from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

import { Dropdown } from "../../inputs";

interface DropdownControllerProps {
	name: string;
	label?: string;
	options?: {
		id: string | number;
		name: string;
	}[];
	placeholder?: string;

	rules?:
		| Omit<
				RegisterOptions<any, string>,
				"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
		  >
		| undefined;

	errors: any;
	defaultValue?: any;
	control: Control<any>;
	isInput?: boolean;
	inputValue?: string;
	className?: string;
	onDropdownClick?: (value?: string) => void;
	onSelectClick?: (value?: string) => void;
}

export const DropdownController: React.FC<DropdownControllerProps> = ({
	control,
	errors,
	label,
	rules,
	options = [],
	placeholder,
	defaultValue,
	name,
	isInput,
	inputValue,
	className,
	onSelectClick,
	onDropdownClick,
}) => {
	const error = errors[name];

	return (
		<Controller
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			name={name}
			render={({ field: { onChange, value } }) => {
				return (
					<Dropdown
						label={label}
						options={options}
						onSelect={onChange}
						onSelectClick={onSelectClick}
						onDropdownClick={onDropdownClick}
						value={value}
						error={error?.message}
						required={!!rules?.required}
						placeholder={placeholder}
						isInput={isInput}
						inputValue={inputValue}
						className={className}
					/>
				);
			}}
		/>
	);
};
