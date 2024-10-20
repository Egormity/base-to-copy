import styles from "./ListBlock.module.scss";
import ListItem from "./ListItem";
import { itemsSettings } from "./data/settings.data";

const List = (): JSX.Element => {
	return (
		<div className={styles["wrapper-list"]}>
			<h1 className={styles["title"]}>Настройки</h1>
			<ul className={styles["menu"]}>
				{itemsSettings.map((item) => (
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
