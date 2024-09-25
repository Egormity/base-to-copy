import { ReactComponent as EyeOpened } from "@assets/icons/eye-open-icon.svg";
import { ReactComponent as EyeSlashed } from "@assets/icons/eye-slashed-icon.svg";
import cn from "classnames";
import React, { forwardRef, useState } from "react";

import styles from "./InputEditPassword.module.scss";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string | undefined;

	classNameWrapper?: string;
	classNameContainer?: string;
	classNameTitle?: string;
}

const InputEditPassword = forwardRef<HTMLInputElement, IInput>(
	(
		{
			label,
			className,
			required,
			type,

			classNameContainer,
			classNameTitle,
			classNameWrapper,

			...rest
		},
		ref
	) => {
		const [inputType, setInputType] = useState(type);

		const handleIconClick = () => {
			if (type === "password") {
				setInputType((prevType) =>
					prevType === "password" ? "text" : "password"
				);
			}
		};
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
						type={inputType}
						{...rest}
					/>
					<div>
						{inputType === "text" ? (
							<EyeOpened onClick={handleIconClick} />
						) : (
							<EyeSlashed onClick={handleIconClick} />
						)}
					</div>
				</div>
			</div>
		);
	}
);

InputEditPassword.displayName = "InputEditPassword";

export default InputEditPassword;
