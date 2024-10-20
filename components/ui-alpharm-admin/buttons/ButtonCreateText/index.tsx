import type { FC } from "react";

interface IButtonCreateText {
	text: string;
	onClick?: (() => void) | ((event: any) => void);
	className?: string;
	disabled?: boolean;
	type?: "reset" | "submit" | "button";
	btnType?: "primary" | "danger" | "light" | "transparent";
	style?: Record<string, string | number>;
}

export const ButtonCreateText: FC<IButtonCreateText> = ({
	onClick = (): void => {},
	text = "btn text",
	className = "",
	disabled = false,
	type = "button",
	btnType = "primary",
	style,
}) => {
	let styles = `${className} disabled:opacity-button-disabled rounded-[18px] px-4 py-2  `;

	// PRIMARY
	if (btnType === "primary") styles += "bg-color-active text-white";

	// DANGER
	if (btnType === "danger")
		styles +=
			"bg-primary-red bg-opacity-button-disabled text-primary-red text-sm";

	// LIGHT
	if (btnType === "light")
		styles += "bg-primary-gray-light text-primary-gray-darkest";

	// TRANSPARENT
	if (btnType === "transparent")
		styles +=
			"w-full h-fit text-color-active border border-primary-gray-light rounded-full text-sm !py-1.5";

	return (
		<button
			className={styles}
			onClick={onClick}
			disabled={disabled}
			type={type}
			style={style}
		>
			{text}
		</button>
	);
};
