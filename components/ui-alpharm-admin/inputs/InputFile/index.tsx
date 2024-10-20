import {
	type FC,
	type InputHTMLAttributes,
	useEffect,
	useRef,
	useState,
} from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import { ReactComponent as IconCrossMiniRed } from "@/assets/icons/cross-mini-red.svg";
import { ReactComponent as IconPlusCurrentColor } from "@/assets/icons/plus-current-color.svg";
import { ReactComponent as IconPlusMini } from "@/assets/icons/plus-mini.svg";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	label?: string | undefined;
	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;
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
	onFile?: (file: File) => void;
}

export const InputFile: FC<IInput> = ({
	label,
	required,
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
	onFile,
	...rest
}) => {
	const [inputValue, setInputValue] = useState<string>(defaultValue || "");
	useEffect(() => {
		setInputValue(defaultValue || "");
	}, [defaultValue]);

	const acceptString = acceptExtensions
		?.map((ext) => (ext.trim().startsWith(".") ? ext.trim() : `.${ext.trim()}`))
		.join(",");

	const isValidFileType = (fileName: string) => {
		if (!acceptExtensions || acceptExtensions.length === 0) return true; // Если не указаны ограничения, все файлы допустимы
		return acceptExtensions.some((ext) =>
			fileName.toLowerCase().endsWith(ext.toLowerCase())
		);
	};

	const ref = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!inputValue && inputRef.current) {
			inputRef.current.value = "";
		}
	}, [inputValue]);

	const labeName = `${name}-${Math.random()}`;

	return (
		<div
			className={`flex flex-col gap-2 w-full ${classNameWrapper ?? ""} `}
			ref={ref}
		>
			{label && (
				<div
					className={`text-primary-gray-dark text-xs font-light text-left ${classNameTitle ?? ""}`}
				>
					{label} {required && <span aria-hidden="true"> *</span>}
				</div>
			)}
			<label
				className={`${
					bigInput
						? "flex justify-center items-center rounded-2xl hover:bg-color-active text-color-bg-color-active hover:text-white w-14 h-14"
						: "border-[1px] border-primary-gray-light flex items-center rounded-lg px-4 h-[52.5px] min-w-[52.5px]"
				} ${classNameContainer ?? ""} ${inputValue ? "" : "w-fit"} cursor-pointer w-fit`}
				htmlFor={labeName}
			>
				{!inputValue && (
					<span className="flex items-center justify-center text-sm h-full w-full text-primary-gray-dark ">
						{bigInput ? <IconPlusCurrentColor /> : <IconPlusMini />}
					</span>
				)}

				{inputValue && (
					<>
						<input
							className="outline-none text-sm relative z-[-1]"
							style={{
								width: ref.current
									? ref.current?.clientWidth - 50 + "px"
									: "100%",
							}}
							value={inputValue}
							readOnly
						/>

						<button
							onClick={(event) => {
								event.preventDefault();
								event.stopPropagation();
								setInputValue("");
								onSetFile?.(undefined);
								onSetBinaryFile?.(undefined);
							}}
						>
							<IconCrossMiniRed />
						</button>
					</>
				)}

				<input
					ref={inputRef}
					onChange={(event) => {
						if (!event.target.files || !event.target.files[0]) return;
						const file = event.target.files[0];
						const fileName = file.name;

						if (!isValidFileType(fileName)) {
							onInvalidFileType &&
								onInvalidFileType(`Неправильный тип файла: ${fileName}`);
							return;
						}

						onChange?.(file);
						onFile?.(file);
						onSetFile?.(file);
						onSetInputValue?.(fileName);
						setInputValue(fileName);
					}}
					id={labeName}
					className="hidden"
					type="file"
					name={labeName}
					accept={acceptString}
					{...rest}
				/>
			</label>
		</div>
	);
};
