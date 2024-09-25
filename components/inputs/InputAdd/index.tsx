import cn from "classnames";
import {
	type FC,
	type InputHTMLAttributes,
	type ReactNode,
	useState,
} from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { ReactComponent as IconCrossMiniRed } from "@/assets/icons/cross-mini-red.svg";
import { ReactComponent as IconPlusMini } from "@/assets/icons/plus-mini.svg";

import styles from "./InputFile.module.scss";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	label?: string | undefined;
	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;
	icon?: ReactNode;
	value?: string;
	name: string;
	onChange: (...event: any[]) => void;
	onSetInputValue?: (value: string) => void;

	error?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;
}
export const InputFile: FC<IInput> = ({
	label,
	required,
	icon,
	classNameWrapper,
	classNameContainer,
	classNameTitle,
	error,
	value = "",
	name,
	onChange,
	onSetInputValue,
	defaultValue,

	...rest
}) => {
	const [inputValue, setInputValue] = useState<string>("");

	return (
		<div className={cn(styles["input-wrapper"], classNameWrapper)}>
			{label && (
				<div className={cn(styles["input-title"], classNameTitle)}>
					{label} {required && <span aria-hidden="true"> *</span>}
				</div>
			)}

			<div className={cn(styles["container"], classNameContainer, "w-max")}>
				<div className="flex items-center gap-2">
					<label
						htmlFor={name}
						className="cursor-pointer text-sm"
					>
						{inputValue ? inputValue : <IconPlusMini />}
					</label>
					{inputValue && (
						<button>
							<IconCrossMiniRed
								onClick={() => {
									setInputValue("");
								}}
							/>
						</button>
					)}
				</div>

				<input
					onChange={(event) => {
						const fileName = event.target?.files
							? event.target?.files[0]?.name
							: null;

						onChange && onChange(event);
						onSetInputValue && onSetInputValue(fileName || event.target.value);
						setInputValue(fileName || event.target.value);
					}}
					id={name}
					className={"hidden"}
					type="file"
					value={value}
					defaultValue={defaultValue}
					name={name}
					{...rest}
				/>
				<div>{icon}</div>
			</div>
		</div>
	);
};

export default InputFile;
