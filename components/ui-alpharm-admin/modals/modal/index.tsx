import cn from "classnames";
import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.scss";

interface ISelectModal {
	isOpen?: boolean;
	children: React.ReactNode;
	classNameContent?: string;
	classNameOverlay?: string;
	onCancel?: () => void;
}

const Modal: FC<ISelectModal> = ({
	children,
	isOpen = false,
	onCancel = () => {},
	classNameContent,
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
		}

		return () => {
			document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onCancel]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onCancel();
		}
	};

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			className={cn(styles["modal-overlay"], classNameOverlay)}
			onMouseDown={handleBackdropClick}
			aria-labelledby="modal-title"
			role="dialog"
			aria-modal="true"
		>
			<div
				className={cn(
					`${styles["modal-content"]} ${isOpen ? styles["fade-in"] : styles["fade-out"]}`,
					classNameContent
				)}
				onMouseDown={(e) => e.stopPropagation()}
				onMouseUp={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
