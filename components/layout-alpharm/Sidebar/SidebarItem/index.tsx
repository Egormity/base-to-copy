import { FC } from "react";

import { ILinkMenu } from "../sidebar.interface";

import styles from "./SidebarItem.module.scss";

interface ISideBarItem {
	isActive: boolean;
	item: ILinkMenu;
}

const SidebarItem: FC<ISideBarItem> = ({ isActive, item }) => {
	return (
		<li
			className={`${styles["wrapper-item"]} ${isActive ? "text-color-active" : "text-primary-gray-dark"} `}
		>
			<div>
				<item.icon
					className={isActive ? "text-color-active" : "text-primary-gray-dark"}
				/>
			</div>
			<span>{item.label}</span>
			{isActive && <span className={styles["span-label"]} />}
		</li>
	);
};

export default SidebarItem;
