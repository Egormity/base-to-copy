import { useCallback, useEffect, useRef, useState } from "react";

interface Size {
	width: number;
	height: number;
}

const useComponentSize = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });

	const debounce = (func: Function, wait: number) => {
		let timeout: ReturnType<typeof setTimeout>;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};

	const updateSize = useCallback(() => {
		if (ref.current) {
			setSize({
				width: ref.current.offsetWidth,
				height: ref.current.offsetHeight,
			});
		}
	}, []);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		updateSize();

		const resizeObserver = new ResizeObserver(
			debounce(() => {
				updateSize();
			}, 0)
		);

		resizeObserver.observe(element);

		return () => {
			resizeObserver.unobserve(element);
		};
	}, [updateSize]);

	return { ref, size };
};

export default useComponentSize;
