import { ReactComponent as PlusIcon } from "@assets/icons/plus.svg";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";

import styles from "./ButtonCreatePlusLink.module.scss";

export const ButtonCreatePlusLink: FC<{ to: string; from?: string }> = ({
	to = "",
	from = "",
}) => {
	return (
		<Link
			from={from}
			to={to}
			className={styles["wrapper"]}
		>
			<PlusIcon />
		</Link>
	);
};
