// TargetPanel.tsx
import { Link } from "@tanstack/react-router";
import cn from "classnames";
import { FC, useState } from "react";
import { toast } from "react-toastify";

import { useChangeApplicationStatus } from "@/api/commons/marketing-plans/application-status/post";
import { useProfile } from "@/api/commons/user/profile";

import HeaderTypeForm from "../../../screens/manual/ui/forms/header-form";
import Modal from "../../modals/modal";

import styles from "./TargetPanel.module.scss";

export interface ITargetPanel {
	statusId?: number;
	userId: string;
	planId: string;
	applicationId?: string;
	type: "contact" | "organization";
	rejectReason?: string;
}

const TargetPanel: FC<ITargetPanel> = ({
	statusId,
	planId,
	userId,
	type,
	applicationId,
	rejectReason,
}) => {
	const { item } = useProfile();
	const isAdmin = item?.roles.some((role) => role.name === "RoleAdmin");
	const { changeApplicationStatus } = useChangeApplicationStatus(
		planId,
		applicationId
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rejectionReason, setRejectionReason] = useState("");

	const handleAccept = () => {
		changeApplicationStatus({ isAgreed: true });
	};

	const handleReject = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setRejectionReason("");
	};

	const handleModalSubmit = () => {
		if (rejectionReason.trim()) {
			changeApplicationStatus({ isAgreed: false, rejectionReason });
			handleModalClose();
		} else {
			toast.error("Пожалуйста, укажите причину отклонения.");
		}
	};

	return (
		<>
			{!statusId && (
				<div className="p-5">
					{isAdmin ? (
						<Link
							className={styles["buttonCreate"]}
							to={`/marketing-plans/target-panel-${type}/plan/${planId}/create/${userId}`.toString()}
						>
							Создать таргет панель
						</Link>
					) : (
						<div className={styles["noTargetPanel"]}>
							Таргет панель не создана
						</div>
					)}
				</div>
			)}

			{statusId === 1 && (
				<div className="p-5 flex  gap-2">
					<Link
						className={cn(styles["button"], styles["buttonReject"])}
						to={`/marketing-plans/target-panel-${type}/plan/${planId}/edit/${userId}`.toString()}
					>
						Редактировать
					</Link>
					<button
						className={cn(styles["button"], styles["buttonAccept"])}
						onClick={handleAccept}
					>
						Принять
					</button>
				</div>
			)}

			{(statusId === 2 || statusId === 3) && (
				<div className="p-5 flex  gap-2">
					<Link
						className={cn(styles["button"], styles["buttonReject"])}
						to={`/marketing-plans/target-panel-${type}/plan/${planId}/edit/${userId}`.toString()}
					>
						Редактировать
					</Link>
					<button
						className={cn(styles["button"], styles["buttonReject"])}
						onClick={handleReject}
					>
						Отклонить
					</button>
					{statusId === 2 && (
						<button
							className={cn(styles["button"], styles["buttonAccept"])}
							onClick={handleAccept}
						>
							Принять
						</button>
					)}
				</div>
			)}

			{statusId === 4 && (
				<div className="p-5 flex flex-col gap-3">
					<div className="flex gap-2">
						<Link
							className={cn(styles["button"], styles["buttonReject"])}
							to={`/marketing-plans/target-panel-${type}/plan/${planId}/edit/${userId}`.toString()}
						>
							Редактировать
						</Link>
						<button
							className={cn(styles["button"], styles["buttonAccept"])}
							onClick={handleAccept}
						>
							Принять
						</button>
					</div>
					<h2 className={styles["rejectionReasonTitle"]}>Причина отклонения</h2>
					<p className={styles["rejectionReasonText"]}>
						{rejectReason || "Причина отклонения не указана."}
					</p>
				</div>
			)}

			<Modal
				isOpen={isModalOpen}
				onCancel={handleModalClose}
			>
				<div>
					<HeaderTypeForm
						title="Причина отклонения таргет панели"
						onCancel={handleModalClose}
					/>
					<textarea
						className={styles["modalTextarea"]}
						rows={5}
						value={rejectionReason}
						placeholder="Опишите ваш вопрос"
						onChange={(e) => setRejectionReason(e.target.value)}
					/>
					<div className={styles["modalActions"]}>
						<button
							className={styles["modalRejectButton"]}
							onClick={handleModalSubmit}
						>
							Отправить
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default TargetPanel;
