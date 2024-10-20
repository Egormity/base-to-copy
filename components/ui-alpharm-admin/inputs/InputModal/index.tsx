import { ReactComponent as ArrowIconHorizontal } from "@assets/icons/arrow-horintal-icon.svg";
import { ReactComponent as ArrowIconVertical } from "@assets/icons/dropdown-icon.svg";
import cn from "classnames";
import { FC, ReactNode } from "react";

import Modal from "../../modals/modal";

import styles from "./InputModal.module.scss";

//@ts-ignore
interface IInputModal extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	value?: string | { id: string; name: string }[];
	isOpen?: boolean;
	required?: boolean;
	className?: string;
	children: ReactNode;
	typeArrow?: "vertical" | "horizontal";

	onClick?: () => void;
	handleClose: () => void;
}

export const InputModal: FC<IInputModal> = ({
	value = "",
	label,
	isOpen,
	children,
	required,
	className,
	typeArrow = "vertical",
	handleClose,
	placeholder,
	disabled,
	...rest
}) => {
	const displayValue = Array.isArray(value)
		? value.map((item) => item.name).join(", ")
		: value;

	return (
		<div className={styles["wrapper"]}>
			<div className={cn(styles["input-wrapper"], className)}>
				{label && (
					<div className={styles["input-title"]}>
						{label} {required && <span aria-hidden="true"> *</span>}
					</div>
				)}
				<div
					className={cn(styles["container"], {
						"cursor-pointer pr-4": !disabled,
					})}
					onClick={disabled ? undefined : handleClose}
				>
					<input
						disabled={disabled}
						value={disabled ? "Невозможно изменить" : displayValue}
						type="text"
						readOnly
						className={disabled ? "" : "cursor-pointer placeholder-black"}
						placeholder={disabled ? "Невозможно изменить" : placeholder}
						{...rest}
					/>
					{!disabled && (
						<>
							{typeArrow === "vertical" ? (
								<ArrowIconVertical className="rotate-180" />
							) : (
								<ArrowIconHorizontal />
							)}
						</>
					)}
				</div>
			</div>
			<Modal
				isOpen={isOpen}
				onCancel={handleClose}
			>
				{children}
			</Modal>
		</div>
	);
};
