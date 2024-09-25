import type { FC } from "react";
import React from "react";
import {
	type Control,
	Controller,
	type RegisterOptions,
} from "react-hook-form";

import { InputFile } from "../../inputs/InputFile";

interface InputFileControllerProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;
	acceptExtensions?: string[];
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
	defaultValue?: string;
	bigInput?: boolean;
	onSetFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const InputFileController: FC<InputFileControllerProps> = ({
	acceptExtensions,
	classNameWrapper,
	classNameContainer,
	classNameTitle,
	control,
	errors,
	label,
	rules,
	placeholder,
	icon,
	name,
	defaultValue,
	onSetInputValue,
	bigInput,
	onSetFile,
}) => {
	const error = errors[name];

	const handleInvalidFileType = (message: string) => {
		console.error(message);
	};

	return (
		<Controller
			control={control}
			rules={rules}
			name={name}
			render={({ field: { onChange, onBlur, value = "" } }) => (
				<InputFile
					label={label}
					onInvalidFileType={handleInvalidFileType}
					acceptExtensions={acceptExtensions}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
					classNameWrapper={classNameWrapper}
					classNameContainer={classNameContainer}
					classNameTitle={classNameTitle}
					icon={icon}
					placeholder={placeholder}
					error={error?.message}
					required={!!rules?.required}
					name={name}
					onSetInputValue={onSetInputValue}
					defaultValue={defaultValue}
					bigInput={bigInput}
					onSetFile={onSetFile}
				/>
			)}
		/>
	);
};
