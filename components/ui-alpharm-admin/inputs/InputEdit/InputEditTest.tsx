import cn from "classnames";
import { type FC, type InputHTMLAttributes, type ReactNode } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import styles from "./InputEdit.module.scss";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	label?: string | undefined;
	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;
	classNameInput?: string;
	icon?: ReactNode;
	value?: string;
	type?: "string";
	name: string;
	onChange: (...event: any[]) => void;
	onSetInputValue?: (value: string) => void;
	min?: number;
	extraText?: string;

	error?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
}
export const InputTest: FC<IInput> = ({
	label,
	required,
	icon,
	classNameWrapper,
	classNameContainer,
	classNameTitle,
	classNameInput,
	error,
	value = "",
	type = "text",
	name,
	onChange,
	onSetInputValue,
	min,
	extraText,

	...rest
}) => {
	return (
		<div className={cn(styles["input-wrapper"], classNameWrapper)}>
			{label && (
				<div className={cn(styles["input-title"], classNameTitle)}>
					{label} {required && <span aria-hidden="true"> *</span>}
				</div>
			)}

			<div className={cn(styles["container"], classNameContainer)}>
				<input
					min={min}
					// onInput={(event) => {
					// 	const target = event.target as HTMLInputElement;
					// 	if (min && target && +target.value < min) {
					// 		target.value = min + "";
					// 	}
					// }}
					className={classNameInput}
					onChange={(event) => {
						onChange && onChange(event);

						onSetInputValue && onSetInputValue(event.target.value);
					}}
					type={type}
					value={value}
					name={name}
					{...rest}
				/>
				<span className="text-sm pr-4">{extraText}</span>
				<div>{icon}</div>
			</div>
		</div>
	);
};

export default InputTest;
