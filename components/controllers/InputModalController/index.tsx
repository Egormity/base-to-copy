import React, { useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

import { InputModal } from "../../inputs/InputModal";

interface InputModalControllerProps {
	name: string;
	label?: string;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	control: Control<any>;
	defaultValue?: any;
	modalContent: React.ReactNode;
	typeArrow?: "vertical" | "horizontal";
	rules?: RegisterOptions<any, string>;
	onChange?: (value: string) => void;
}

export const InputModalController: React.FC<InputModalControllerProps> = ({
	name,
	label,
	className,
	typeArrow = "vertical",
	rules,
	disabled,
	defaultValue,
	control,
	placeholder,
	modalContent,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleClose = () => setIsModalOpen(!isModalOpen);

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, value, name } }) => {
				return (
					<InputModal
						defaultValue={defaultValue}
						value={value?.label || value?.name || value}
						id={name}
						disabled={disabled}
						label={label}
						onChange={onChange}
						isOpen={isModalOpen}
						typeArrow={typeArrow}
						className={className}
						placeholder={placeholder}
						required={!!rules?.required}
						handleClose={handleClose}
					>
						{React.cloneElement(modalContent as React.ReactElement, {
							onSelect: (selectedValue: { id: string; label: string }) => {
								onChange(selectedValue);
								handleClose();
							},
							setIsModalOpen: setIsModalOpen,
							valuesChecked: value,
						})}
					</InputModal>
				);
			}}
		/>
	);
};
