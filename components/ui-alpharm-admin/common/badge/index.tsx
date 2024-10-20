import { ReactComponent as CopyIcon } from "@assets/icons/copy.svg";
import { FC } from "react";
import { toast } from "react-toastify";
import { useCopyToClipboard } from "usehooks-ts";

import styles from "./Badge.module.scss";
import { IBadge } from "./badge.interface";

const Badge: FC<IBadge> = ({ label, value = "" }) => {
	const [_, copy] = useCopyToClipboard();
	const handleCopy = (text: string) => () => {
		copy(text)
			.then(() => {
				console.log("Copied!", { text });
			})
			.catch((error) => {
				console.error("Failed to copy!", error);
			});
	};

	return (
		<div className={styles["wrapper-badge"]}>
			<span className={styles["title"]}>{label}</span>
			<div
				className={styles["badge"]}
				onClick={() => {
					handleCopy(value);
					toast.success("Скопировано в буфер обмена");
				}}
			>
				<span>{value}</span>
				<CopyIcon />
			</div>
		</div>
	);
};

export default Badge;
