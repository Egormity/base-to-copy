import cn from "classnames";

export default function SearchNotFoundMessage({
	className,
	isTextCenter = false,
	isTextFullHeight,
	isPaddingTop,
	textSizeType = "medium",
	textTypeWrapping = "default",
}: {
	className?: string;
	isTextCenter?: boolean;
	isTextFullHeight?: boolean;
	isPaddingTop?: boolean;
	textSizeType?: "small" | "base" | "medium" | "large";
	textTypeWrapping?: "default" | "small";
}) {
	return (
		<div
			className={cn(
				"p-5 text-lg max-h-header",
				className,
				isTextCenter ? "text-center" : "text-left",
				isTextFullHeight && "h-full flex flex-col justify-center items-center",
				isPaddingTop ? "pt-12" : "",
				textSizeType === "small" && "text-sm",
				textSizeType === "base" && "text-base",
				textSizeType === "medium" && "text-lg",
				textSizeType === "large" && "text-xl",
				textTypeWrapping === "small" && "space-y-3"
			)}
		>
			{/* prettier-ignore */}
			<p>По вашему запросу {textTypeWrapping === "small" && <br />} ничего не найдено.</p>
			{/* prettier-ignore */}
			<p>Попробуйте уточнить {textTypeWrapping === "small" && <br />} или изменить запрос.</p>
		</div>
	);
}
