import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { InputFileController } from "@/components/ui/controllers/InputFileController";

import RenderItem from "./RenderItem";

export type ISlideLibrary =
	| {
			id: string;
			imgSrc: string;
			type: "image";
			slidePosition: number;
	  }
	| {
			id: string;
			videoSrc: string;
			type: "video";
			slidePosition: number;
	  }
	| {
			id: string;
			type: "quiz";
			quizId: string;
			slidePosition: number;
	  };

interface ILibraryDragAndDrop {
	slidesData: Array<ISlideLibrary>;
	control: any;
	errors: any;
	onDeleteItem?: (id: string) => void;
}

export default function LibraryDragAndDrop({
	slidesData = [],
	control,
	errors,
	onDeleteItem = (id): void => {
		console.log(id);
	},
}: ILibraryDragAndDrop): JSX.Element {
	const [slides, setSlides] = useState(slidesData);

	function onDragEnd(event: any): void {
		const { active, over } = event;
		// console.log(active, over);

		if (active.id === over.id) return;

		setSlides((slides) => {
			const oldIndex = slides.findIndex((item) => item.id === active.id);
			const newIndex = slides.findIndex((item) => item.id === over.id);
			return arrayMove(slides, oldIndex, newIndex);
		});
	}

	return (
		<div className="flex gap-8 flex-wrap">
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={onDragEnd}
			>
				<SortableContext
					items={slides}
					strategy={horizontalListSortingStrategy}
				>
					{slides.map((slide, index) => (
						<RenderItem
							key={index}
							slide={slide}
							index={index}
							onDeleteItem={onDeleteItem}
						/>
					))}
				</SortableContext>
			</DndContext>

			<div className="border-2 border-stone-200 hover:border-indigo-700 relative w-[200px] h-[125px] rounded-lg overflow-hidden shadow-lg p-2 flex items-center justify-center group/item">
				<InputFileController
					rules={{ required: "Поле обязательно" }}
					control={control}
					name="addFileInput"
					errors={errors}
					bigInput={true}
				/>
			</div>
		</div>
	);
}
