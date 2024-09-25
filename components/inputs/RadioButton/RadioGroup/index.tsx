import cn from "classnames";
import React, { type ReactNode, cloneElement, isValidElement } from "react";

import styles from "./RadioGroup.module.scss";

interface RadioGroupProps<T> {
	name: string;
	selectedValue: T | null;
	onChange: (value: T) => void;
	children: ReactNode;
	className?: string;
}

export const RadioGroup = <T extends { id: string | number }>({
	name,
	selectedValue,
	onChange,
	children,
	className,
}: RadioGroupProps<T>) => {
	const handleChange = (value: T) => {
		onChange(value);
	};

	return (
		<div className={cn(styles["wrapper"], className)}>
			{React.Children.map(children, (child) => {
				if (
					!isValidElement<{
						value: T;
						checked: boolean;
						onChange: () => void;
						name: string;
					}>(child)
				)
					return null;

				return cloneElement(child, {
					checked: child.props.value.id === selectedValue?.id,
					onChange: () => handleChange(child.props.value),
					name,
				});
			})}
		</div>
	);
};
