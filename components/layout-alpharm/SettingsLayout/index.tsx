import { memo } from "react";

import List from "@/components/layout/SettingsLayout/list-block";

type SettingsListLayoutProps = {
	children: React.ReactNode;
};

const MemoizedList = memo(List);

export default function SettingsListLayout({
	children,
}: SettingsListLayoutProps): JSX.Element {
	return (
		<div className="grid grid-cols-[1fr_5fr] max-h-screen">
			<MemoizedList />
			<div className="overflow-y-auto max-h-screen scrollbar-wide">
				{children}
			</div>
		</div>
	);
}
