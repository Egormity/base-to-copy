import { useCallback } from "react";

type ModalActions = {
	[key: string]: string;
};

const useModalHandlers = (
	actions: ModalActions,
	toggleModal: (action: string, id?: string) => void
) => {
	const createModalHandler = (action: string) => {
		return useCallback(
			(id?: string) => {
				toggleModal(action, id);
			},
			[toggleModal, action]
		);
	};

	const handlers = Object.keys(actions).reduce(
		(acc, key) => {
			acc[key] = createModalHandler(actions[key] as string);
			return acc;
		},
		{} as Record<string, (id?: string) => void>
	);

	return handlers;
};

export default useModalHandlers;
