import cn from "classnames";
import type { FC } from "react";

interface RadioButtonProps {
	value?: string;
	label?: string;
	subtitle?: string;
	disabled?: boolean;
	className?: string;
	name?: string;
	id?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	onClick?: () => void;
	color?: string;
}

export const RadioButton: FC<RadioButtonProps> = ({
	value,
	disabled,
	label,
	subtitle,
	className,
	name,
	id,
	onChange,
	checked,
	onClick,
	color,
}) => {
	const checkboxId = id || `radio-${Math.random()}`;

	return (
		<label className={cn("flex items-center gap-2 cursor-pointer", className)}>
			<input
				className="hidden"
				value={value}
				checked={checked}
				type="radio"
				disabled={disabled}
				name={name}
				id={checkboxId}
				onClick={onClick}
				onChange={onChange}
			/>
			<span
				className={cn(
					"relative flex items-center justify-center w-[12px] h-[12px] border-[1px] rounded-full transition hover:border-black",
					{ "border-[--color-active]": checked }
				)}
				style={{ borderColor: color }}
			>
				{checked && (
					<span
						className="w-[8px] h-[8px] bg-color-active rounded-full"
						style={{ backgroundColor: color }}
					/>
				)}
			</span>
			<div className="flex flex-col items-start">
				{label && (
					<label
						htmlFor={checkboxId}
						className="cursor-pointer"
					>
						{label}
					</label>
				)}
				{subtitle && (
					<span className="text-[#727272] text-xs line-clamp-1 max-w-[300px] text-left">
						{subtitle}
					</span>
				)}
			</div>
		</label>
	);
};
