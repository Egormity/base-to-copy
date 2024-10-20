import { ReactComponent as CrossIcon } from "@assets/icons/cross.svg";
import cn from "classnames";

import styles from "../../commons/FilterModal.module.scss";

const FilterContainer = ({
	children,
	isOpen,
	toggleSidebar,
	handleApply,
	handleClear,
}: {
	children?: React.ReactNode;
	isOpen?: boolean;
	toggleSidebar: () => void;
	handleApply: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleClear: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
	return (
		<>
			<div
				className={cn(styles["filter-wrapper"], {
					"w-[390px]": isOpen,
					"w-0": !isOpen,
				})}
			>
				{isOpen && (
					<>
						<div className={styles["filter-header"]}>
							<h1>Фильтр</h1>
							<CrossIcon onClick={toggleSidebar} />
						</div>
						<form>
							<div className="overflow-auto max-h-[calc(100vh-204px)] no-scrollbar">
								{children}
							</div>
							<div className={styles["wrapper-buttons"]}>
								<button
									className={styles["button-apply"]}
									onClick={handleApply}
									children={"Применить"}
								/>

								<button
									className={styles["button-cancel"]}
									onClick={handleClear}
									children={"Сбросить"}
								/>
							</div>
						</form>
					</>
				)}
			</div>
			{isOpen && (
				<div
					className={styles["bg-inset"]}
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

export default FilterContainer;
