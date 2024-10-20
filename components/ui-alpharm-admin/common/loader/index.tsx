import styles from "./Loader.module.scss";

export default function Loader(): JSX.Element {
	return (
		<div className="w-full h-full flex items-center justify-center ">
			<div className={styles["spinner"]}>
				<span className="opacity-100 h-5 w-5 bg-color-active absolute z-10 top-0 left-1/2 -translate-x-1/2 rounded-full" />
				<span className="opacity-15 h-5 w-5 bg-color-active absolute z-10 right-0 top-1/2 -translate-y-1/2 rounded-full" />
				<span className="opacity-50 h-5 w-5 bg-color-active absolute z-10 bottom-0 right-1/2 translate-x-1/2 rounded-full" />
				<span className="opacity-80 h-5 w-5 bg-color-active absolute z-10 top-1/2 left-0 -translate-y-1/2 rounded-full" />
			</div>
		</div>
	);
}
