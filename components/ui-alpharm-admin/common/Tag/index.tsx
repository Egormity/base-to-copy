import cn from "classnames";
import { FC, MouseEventHandler } from "react";

interface ITag {
	children: React.ReactNode;
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

export const Tag: FC<ITag> = ({ children, className, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={cn("w-fit flex items-center px-3 rounded-2xl", className)}
		>
			{children}
		</div>
	);
};
