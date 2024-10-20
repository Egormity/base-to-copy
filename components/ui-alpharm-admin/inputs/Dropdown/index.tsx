import { ReactComponent as DropdownIcon } from "@assets/icons/dropdown-icon.svg";
import cn from "classnames";
import React, { useEffect, useRef, useState } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import styles from "./Dropdown.module.scss";

interface IDropdown {
	options: {
		id: string | number;
		name: string;
		isValidation?: boolean;
		icon?: React.ReactNode;
	}[];
	className?: string;
	label?: string | undefined;
	required?: boolean;
	onSelect: (option: string | number) => void;
	value?: string;
	placeholder?: string;

	error?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined;

	isInput?: boolean;

	inputValue?: string;
	classNameInput?: string;

	id?: string;
	classNameOptions?: string;
	classNamePlaceholder?: string;

	onDropdownClick?: () => void;
	onSelectClick?: () => void;
	disabled?: boolean;
}

export const Dropdown: React.FC<IDropdown> = ({
	options,
	label,
	required,
	className = "",
	onSelect,
	placeholder,
	error,
	value,
	isInput,
	inputValue,
	classNameInput = "",
	id,
	classNameOptions = "",
	onDropdownClick,
	classNamePlaceholder = "",
	onSelectClick,
	disabled,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<
		| string
		| number
		| { id: string | number; name: string; isValidation?: boolean }
		| null
	>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleOptionClick = (optionId: string | number): void => {
		const selected = options.find((option) => option.id === optionId);

		if (selected) {
			onSelectClick && onSelectClick();
			onSelect(optionId);
			setIsOpen(false);
		}
	};

	const handleClickOutside = (event: MouseEvent): void => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (value) {
			const selected = options.find((option) => option.id === value);
			setSelectedOption(
				selected
					? {
							id: selected.id,
							name: selected.name,
							isValidation: selected.isValidation,
						}
					: null
			);
		}
	}, [value, options]);

	return (
		<div
			className={cn(styles["wrapper-input"], className)}
			ref={dropdownRef}
			id={id}
		>
			<div className={styles["container-input"]}>
				<div className={styles["input-title"]}>
					{label} {required && <span aria-hidden="true"> *</span>}
				</div>

				{isInput ? (
					<input
						className={`${styles["input"]} ${classNameInput}  text-left`}
						onClick={() => setIsOpen(!isOpen)}
						value={inputValue}
						disabled={disabled}
					/>
				) : (
					<button
						type="button"
						className={`${styles["input"]} ${classNameInput}`}
						disabled={disabled}
						onClick={() => {
							setIsOpen(!isOpen);
							onDropdownClick && onDropdownClick();
						}}
					>
						{selectedOption ? (
							//@ts-ignore
							selectedOption.isValidation ? (
								//@ts-ignore
								`${selectedOption.name} (Валидируемый)`
							) : (
								//@ts-ignore
								<span className="line-clamp-1 mr-2">{selectedOption.name}</span>
							)
						) : (
							(
								<span className={`${classNamePlaceholder} text-[#B3B3B3]`}>
									{placeholder}
								</span>
							) || <span className="text-[#B3B3B3]">Выберите вариант</span>
						)}
						{!disabled && (
							<DropdownIcon className={cn({ "rotate-180": !isOpen })} />
						)}
					</button>
				)}
			</div>

			{isOpen && (
				<div
					className={styles["container-menu"]}
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<ul role="menu">
						{options.map((option) => (
							<li
								key={option.id}
								onClick={(): void => {
									handleOptionClick(option.id);
								}}
								role="menuitem"
								className={`${classNameOptions} flex items-center gap-2`}
							>
								{option.icon && option.icon} {option.name}{" "}
								{option.isValidation && " (Валидируемый)"}
							</li>
						))}
					</ul>
				</div>
			)}
			{error && (
				<div className={styles["error-message"]}>{error.toString()}</div>
			)}
		</div>
	);
};
