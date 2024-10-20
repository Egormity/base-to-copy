import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

import { ReactComponent as DeleteIcon } from "@/assets/icons/delete-icon-currentColor.svg";
import { ReactComponent as IconQuizDark } from "@/assets/icons/library-quiz-dark.svg";
import { ReactComponent as IconVideoDark } from "@/assets/icons/video-dark.svg";

import type { ISlideLibrary } from "./index";

interface IRenderItem {
	slide: ISlideLibrary;
	index: number;
	onDeleteItem: (id: string) => void;
}

export default function RenderItem({
	slide,
	index,
	onDeleteItem,
}: IRenderItem): JSX.Element {
	const [isHovered, setIsHovered] = useState(false);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: slide.id,
		disabled: isHovered,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			className={`flex flex-col items-center justify-center gap-2`}
			style={style}
		>
			<div
				className={`${isDragging ? "border-red-600 border-dashed opacity-75" : "hover:border-stone-400 "} border-2 relative w-[200px] h-[125px] rounded-lg overflow-hidden shadow-lg p-2 flex items-center justify-center group/item`}
			>
				{slide.type === "image" && (
					<img
						src={slide.imgSrc}
						alt={`Test image ${index + 1}`}
						className="h-full w-full object-cover rounded"
					/>
				)}
				{slide.type === "video" && (
					/* <video
                    className="h-full w-full object-cover"
                    controls
                >
                    <source src={slide.videoSrc} />
                </video> */
					<IconVideoDark />
				)}
				{slide.type === "quiz" && <IconQuizDark />}

				<button
					className={`${isDragging ? "hidden" : ""} z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group/edit invisible group-hover/item:visible bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white text-3xl p-2`}
					onMouseOver={() => {
						setIsHovered(true);
					}}
					onMouseLeave={() => {
						setIsHovered(false);
					}}
					onClick={() => {
						onDeleteItem && onDeleteItem(slide.id);
					}}
				>
					<DeleteIcon />
				</button>
			</div>
			<p className="text-stone-400">
				{index + 1}. Название {slide.type === "image" && "медиа"}
				{slide.type === "video" && "видео"}
				{slide.type === "quiz" && "опроса"}
			</p>
		</div>
	);
}
