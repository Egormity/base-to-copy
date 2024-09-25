import cn from "classnames";
import React, { forwardRef } from "react";

import styles from "./InputEdit.module.scss";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string | undefined;
	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;

	icon?: React.ReactNode;
}

const InputEdit = forwardRef<HTMLInputElement, IInput>(
	(
		{
			label,

			required,
			icon,
			classNameWrapper,
			classNameContainer,
			classNameTitle,

			...rest
		},
		ref
	) => {
		return (
			<div className={cn(styles["input-wrapper"], classNameWrapper)}>
				{label && (
					<div className={cn(styles["input-title"], classNameTitle)}>
						{label} {required && <span aria-hidden="true"> *</span>}
					</div>
				)}

				<div className={cn(styles["container"], classNameContainer)}>
					<input
						ref={ref}
						type="text"
						{...rest}
					/>
					<div>{icon}</div>
				</div>
			</div>
		);
	}
);

InputEdit.displayName = "InputEdit";

export default InputEdit;
