import { ReactComponent as BackForward } from "@assets/icons/back-forward.svg";
import { Link } from "@tanstack/react-router";
import cn from "classnames";
import { FC } from "react";

import { ILinkManual } from "../data/manual.data";

import styles from "./ListItem.module.scss";

interface IManualListItem {
	item: ILinkManual;
}

const ListItem: FC<IManualListItem> = ({ item }) => {
	return (
		<Link
			// from="/manual"
			//@ts-ignore
			to={`/manual/${item.link}`}
		>
			{({ isActive }) => {
				return (
					<li
						className={cn(
							styles["wrapper-item"],
							isActive && "bg-color-inactive"
						)}
					>
						<span
							className={
								isActive ? "text-color-active" : "text-primary-gray-dark"
							}
						>
							{item.label}
						</span>

						<BackForward
							className={
								isActive
									? "text-color-active rotate-180"
									: "text-primary-gray-dark"
							}
						/>
					</li>
				);
			}}
		</Link>
	);
};

export default ListItem;
