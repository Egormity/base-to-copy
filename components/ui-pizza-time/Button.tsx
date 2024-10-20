import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollToTop";

type ButtonProps = {
	children: ReactNode;
	variation: "red" | "yellow" | "red-transparent" | "gray";
	to?: string | -1 | null;
	customFunc?: () => void;
	disabled?: boolean;
	htmlType?: "submit" | "reset" | "button";
};

export default function Button({ children, htmlType, variation, to, customFunc, disabled }: ButtonProps) {
	const navigate = useNavigate();

	let className =
		"px-4 py-2 rounded-md duration-primary tracking-wider flex items-center justify-center gap-3 ";

	if (variation === "yellow")
		className =
			className +
			"bg-primary-yellow-dark hover:bg-zinc-100 hover:bg-opacity-70 text-zinc-900 hover:ring-1 ring-zinc-100";
	if (variation === "gray")
		className =
			className +
			"bg-zinc-100 bg-opacity-70 text-zinc-900 hover:bg-primary-yellow-dark hover:ring-1 ring-zinc-100";
	if (variation === "red")
		className = className + "bg-primary-red hover:bg-transparent hover:ring-1 ring-zinc-100 ";
	if (variation === "red-transparent")
		className = className + "bg-transparent  outline outline-1 hover:bg-primary-red hover:outline-none";

	return (
		<button
			type={htmlType}
			disabled={disabled}
			className={className}
			onClick={() => {
				if (to) {
					to === -1 ? navigate(-1) : navigate(to);
					scrollToTop();
				}
				if (customFunc) customFunc();
			}}
		>
			{children}
		</button>
	);
}
