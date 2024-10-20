import { ButtonCreatePlus } from "../Button";

export default function ButtonCreatePlusContainer({
	handleCreate,
}: {
	handleCreate?: (id?: string) => void;
}) {
	return (
		<div className="fixed right-5 cursor-pointer bottom-[74px] w-[48px] h-[48px]">
			{/* @ts-ignore */}
			<ButtonCreatePlus onClick={handleCreate} />
		</div>
	);
}
