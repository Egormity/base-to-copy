import styles from "./ListBlock.module.scss";
import ListItem from "./ListItem";
import { itemsManual } from "./data/manual.data";

const List = () => {
	return (
		<div className={styles["wrapper-list"]}>
			<h1 className={styles["title"]}>Справочники</h1>
			<ul className={styles["menu"]}>
				{itemsManual.map((item) => (
					<ListItem
						item={item}
						key={item.label}
					/>
				))}
			</ul>
		</div>
	);
};

export default List;
