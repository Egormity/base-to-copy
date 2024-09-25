import {
	type FC,
	type InputHTMLAttributes,
	type ReactNode,
	useState,
} from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { ReactComponent as IconCrossMiniRed } from "@/assets/icons/cross-mini-red.svg";
import { ReactComponent as IconPlusCurrentColor } from "@/assets/icons/plus-current-color.svg";
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
	onInvalidFileType?: (message: string) => void;
	bigInput?: boolean;

	error?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;

	onSetFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
	onSetBinaryFile?: React.Dispatch<React.SetStateAction<string | undefined>>;
	defaultValue?: string;
	acceptExtensions?: string[]; // Добавляем массив расширений
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
	bigInput,
	onSetFile,
	onSetBinaryFile,
	acceptExtensions,
	onInvalidFileType,
	...rest
}) => {
	const [inputValue, setInputValue] = useState<string>(defaultValue || "");

	const acceptString = acceptExtensions?.length
		? acceptExtensions.map((ext) => `.${ext}`).join(",")
		: undefined;

	const isValidFileType = (fileName: string) => {
		if (!acceptExtensions || acceptExtensions.length === 0) return true; // Если не указаны ограничения, все файлы допустимы
		return acceptExtensions.some((ext) => fileName.endsWith(ext));
	};

	return (
		<div
			className={`${bigInput ? styles["input-wrapper-big"] : styles["input-wrapper"]} ${classNameWrapper ?? ""}`}
		>
			{label && (
				<div
					className={`${bigInput ? styles["input-title-big"] : styles["input-title"]} ${classNameTitle ?? ""}`}
				>
					{label} {required && <span aria-hidden="true"> *</span>}
				</div>
			)}
			<label
				className={`${bigInput ? styles["container-big"] : styles["container"]} ${classNameContainer ?? ""} w-max cursor-pointer `}
				htmlFor={name}
			>
				<div className="flex items-center gap-2">
					{inputValue && !bigInput ? null : (
						<span className="text-sm h-full w-full text-[#B8B8B8]">
							{bigInput ? <IconPlusCurrentColor /> : <IconPlusMini />}
						</span>
					)}

					{inputValue && (
						<div className="flex items-center gap-2">
							<p>{inputValue}</p>
							<button
								onClick={(event) => {
									event.preventDefault();
									event.stopPropagation();
									setInputValue("");
									onSetFile && onSetFile(undefined);
									onSetBinaryFile && onSetBinaryFile(undefined);
								}}
							>
								<IconCrossMiniRed />
							</button>
						</div>
					)}
				</div>

				<input
					onChange={(event) => {
						if (!event.target.files || !event.target.files[0]) return;
						const file = event.target.files[0];
						const fileName = file.name;

						if (!isValidFileType(fileName)) {
							onInvalidFileType &&
								onInvalidFileType(`Неправильный тип файла: ${fileName}`);
							return;
						}

						onSetFile && onSetFile(file);
						onSetInputValue && onSetInputValue(fileName);
						setInputValue(fileName);
					}}
					id={name}
					className="hidden"
					type="file"
					name={name}
					accept={acceptString}
					{...rest}
				/>
				<div>{icon}</div>
			</label>
		</div>
	);
};
