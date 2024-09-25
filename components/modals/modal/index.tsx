// src/modals/SelectModal.tsx
import cn from "classnames";
import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.scss";

interface ISelectModal {
	isOpen?: boolean;
	children: React.ReactNode;
	classNameContent?: string;
	classNameBackdrop?: string;
	classNameOverlay?: string;
	onCancel?: () => void;
}

const Modal: FC<ISelectModal> = ({
	children,
	isOpen = false,
	onCancel = () => {},
	classNameContent,
	classNameBackdrop,
	classNameOverlay,
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

	return ReactDOM.createPortal(
		<>
			<div
				className={cn(styles["modal-overlay"], classNameOverlay)}
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
				className={cn(styles["modal-backdrop"], classNameBackdrop)}
				onClick={handleBackdropClick}
			/>
		</>,
		document.body
	);
};

export default Modal;
