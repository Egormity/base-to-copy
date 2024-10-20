import { ReactComponent as CopyIcon } from "@assets/icons/copy.svg";
import cn from "classnames";
import { FC } from "react";
import { toast } from "react-toastify";
import { useCopyToClipboard } from "usehooks-ts";

import { ILabel } from "./Label.interface";
import styles from "./Label.module.scss";

const Label: FC<ILabel> = ({
	clipboard,
	className,
	title = "",
	header,
	subTitle,
}) => {
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
		<div className={cn(styles["wrapper"], className)}>
			{header && <span>{header}</span>}
			<div
				className={cn(styles["container-label"], {
					["cursor-pointer"]: clipboard,
				})}
				onClick={() => {
					handleCopy(title);
					toast.success("Скопировано в буфер обмена");
				}}
			>
				<div>
					<div className={styles["title"]}>{title}</div>
					{subTitle && <div className={styles["subtitle"]}>{subTitle}</div>}
				</div>
				{clipboard && title && <CopyIcon />}
			</div>
		</div>
	);
};

export default Label;
