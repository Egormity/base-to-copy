import { ReactComponent as PlusIcon } from "@assets/icons/plus.svg";
import classNames from "classnames";
import type { FC, MouseEventHandler } from "react";

import styles from "./ButtonCreatePlus.module.scss";

interface IButtonCreatePlus {
	disabled?: boolean;
	ariaLabel?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonCreatePlus: FC<IButtonCreatePlus> = ({
	onClick,
	disabled = false,
	ariaLabel,
}) => {
	return (
		<button
			type="button"
			onClick={!disabled ? onClick : undefined}
			className={classNames(styles["wrapper"], {
				[styles["disabled"] as string]: disabled,
			})}
			disabled={disabled}
			aria-label={ariaLabel}
			role="button"
			aria-pressed={disabled ? "false" : "true"}
		>
			<PlusIcon />
		</button>
	);
};
