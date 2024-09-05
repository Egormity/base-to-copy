import type { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "./components";

const meta: Meta<typeof Calendar> = {
	// title: "Calendar",
	component: Calendar,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				// component: "Calendar",
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const SwitchModeWithWeekNamesSelectSingleDay: Story = {
	args: {
		defaultMode: "days",
		switchMode: true,
		showWeekNames: true,
	},
};

export const SelectSingleDay: Story = {
	args: {
		defaultMode: "days",
	},
};

export const SelectSingleWeek: Story = {
	args: {
		defaultMode: "days",
		selectWeek: true,
	},
};

export const SelectSingleMonth: Story = {
	args: {
		defaultMode: "Months",
	},
};

export const SelectSingleYear: Story = {
	args: {
		defaultMode: "years",
	},
};

export const SwitchDifferentLanguage: Story = {
	args: {
		defaultMode: "days",
		switchMode: true,
		showWeekNames: true,
		locale: "ja-JP",
	},
};
