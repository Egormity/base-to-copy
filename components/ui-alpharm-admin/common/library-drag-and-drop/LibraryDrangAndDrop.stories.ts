import type { Meta, StoryObj } from "@storybook/react";

import LibraryDragAndDropComponent from "./index";

const meta: Meta<typeof LibraryDragAndDropComponent> = {
	// title: "LibraryDragAndDrop",
	component: LibraryDragAndDropComponent,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LibraryDragAndDropComponent>;

export const Default: Story = {
	args: {
		slidesData: undefined,
		control: undefined,
		errors: undefined,
		onDeleteItem: (id) => {
			console.log(id);
		},
	},
};
