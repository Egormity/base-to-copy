import type { FC } from "react";

import { ButtonCreateText } from "../../buttons/ButtonCreateText";
import Loader from "../../common/loader";

interface IDeleteModalForm {
	deleteTitle?: string;
	onDelete: (evt: any) => void;
	onCancel: (evt: any) => void;
	bigTitle?: boolean;
	deleteTitleVariation?: number;
	cannotBeDeleted?: boolean;
	isLoadingCannotBeDeleted?: boolean;
}

const DeleteModalForm: FC<IDeleteModalForm> = ({
	deleteTitle,
	onCancel,
	onDelete,
	bigTitle = false,
	deleteTitleVariation = 1,
	cannotBeDeleted,
	isLoadingCannotBeDeleted,
}) => {
	let deleteText;
	if (deleteTitleVariation === 1) deleteText = "Вы уверены что хотите удалить";
	if (deleteTitleVariation === 2) deleteText = "Вы точно хотите удалить";

	if (isLoadingCannotBeDeleted) return <Loader />;

	if (cannotBeDeleted)
		return (
			<div>
				<p className="text-xl pb-1">Ошибка при удалении</p>
				<p className="mb-4 text-primary-gray-darker text-xs">
					Невозможно удалить {deleteTitle}
				</p>
				<ButtonCreateText
					btnType="light"
					text="Назад"
					className="w-full"
					onClick={onCancel}
				/>
			</div>
		);

	return (
		<>
			<div className="mb-4 max-w-[250px]">
				{!bigTitle && <h1 className="text-xl mb-1">Удаление</h1>}
				<p
					className={`${bigTitle ? "text-xl" : "text-xs font-light text-primary-gray-darker"}`}
				>
					{deleteText} <span className="block">{deleteTitle}?</span>
				</p>
			</div>

			<div className="flex justify-center items-center gap-2">
				<ButtonCreateText
					btnType="light"
					text="Отмена"
					className="w-full"
					onClick={onCancel}
				/>
				<ButtonCreateText
					btnType="danger"
					text="Удалить"
					className="w-full"
					onClick={onDelete}
				/>
			</div>
		</>
	);
};

export default DeleteModalForm;
