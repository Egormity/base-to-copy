import { FC } from "react";

import styles from "./Multiplicity.module.scss";
import { IMultiplicity } from "@/services/commons";

const Multiplicity: FC<{ item: IMultiplicity }> = ({
	//@ts-ignore
	item: { visitsAll = 0, visitsDone = 0, visitsPlanned = 0 },
}) => {
	const maxBars = Math.min(visitsAll, 20);

	const doneBars = Math.round((visitsDone / visitsAll) * maxBars);
	const plannedBars = Math.round((visitsPlanned / visitsAll) * maxBars);

	const bars = Array.from({ length: maxBars }, (_, index) => {
		if (index < doneBars) {
			return (
				<div
					key={index}
					className={styles["bar-done"]}
				/>
			);
		} else if (index < doneBars + plannedBars) {
			return (
				<div
					key={index}
					className={styles["bar-planned"]}
				/>
			);
		} else {
			return (
				<div
					key={index}
					className={styles["bar-pending"]}
				/>
			);
		}
	});

	return <div className={styles["container"]}>{bars}</div>;
};

export default Multiplicity;
