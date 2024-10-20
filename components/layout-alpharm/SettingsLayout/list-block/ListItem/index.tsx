import { ReactComponent as BackForward } from "@assets/icons/back-forward.svg";
import { Link } from "@tanstack/react-router";
import cn from "classnames";
import type { FC } from "react";

import type { ILinkSettings } from "../data/settings.data";

interface ISettingsListItem {
	item: ILinkSettings;
}

const ListItem: FC<ISettingsListItem> = ({ item }) => {
	return (
		<Link to={`/settings/${item.link}`.toString()}>
			{({ isActive }) => {
				return (
					<li
						className={cn(
							"py-[16px] px-5 flex  items-center justify-between border-b-[1px] hover:bg-[var(--color-inactive)] cursor-pointer",
							isActive ? "!bg-[var(--color-inactive)]" : "#9B9B9B"
						)}
					>
						<span className={isActive ? "text-color-active" : "#9B9B9B"}>
							{item.label}
						</span>

						<BackForward
							className={
								isActive
									? "rotate-180 text-color-active"
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
