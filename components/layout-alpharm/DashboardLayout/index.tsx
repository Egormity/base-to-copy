import { memo } from "react";

import Sidebar from "../Sidebar";

import styles from "./DashboardLayout.module.scss";

type DashboardLayoutProps = {
	children: React.ReactNode;
};

const MemoizedSidebar = memo(Sidebar);

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className={styles["wrapper"]}>
			<div>
				<MemoizedSidebar />
			</div>
			<main className={styles["content"]}>{children}</main>
		</div>
	);
}
