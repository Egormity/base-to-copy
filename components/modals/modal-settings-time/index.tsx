// src/modals/SelectModal.tsx
import cn from "classnames";
import React, { FC, useEffect } from "react";

import styles from "./Modal.module.scss";

interface ISelectModal {
	isOpen?: boolean;
	children: React.ReactNode;
	classNameContent?: string;

	onCancel: () => void;
}

const SelectModal: FC<ISelectModal> = ({
	children,
	isOpen = false,
	onCancel,
	classNameContent,
}) => {
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCancel();
			}
		};

		if (isOpen) {
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", handleEscape);
		} else {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscape);
		}

		return () => {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onCancel]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		e.nativeEvent.stopImmediatePropagation();
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	if (!isOpen) return null;

	return (
		<>
			<div
				className={styles["modal-overlay"]}
				onClick={handleBackdropClick}
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div
					className={cn(
						`${styles["modal-content"]} ${isOpen ? styles["fade-in"] : styles["fade-out"]}`,
						classNameContent
					)}
				>
					{children}
				</div>
			</div>
			<div
				className={styles["modal-backdrop"]}
				onClick={handleBackdropClick}
			/>
		</>
	);
};

export default SelectModal;
