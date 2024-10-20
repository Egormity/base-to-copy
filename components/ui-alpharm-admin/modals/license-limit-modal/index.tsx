import { ReactComponent as IconLicense } from "@assets/icons/licence-limit.svg";

import { ButtonCreateText } from "../../buttons/ButtonCreateText";

export default function LicenseLimitModal({
	onCancel,
}: {
	onCancel?: (id?: string) => void;
}) {
	return (
		<div className="flex flex-col gap-2 justify-center items-center max-w-[230px]">
			<IconLicense />
			<h3 className="text-xl">
				Превышен лимит <br /> лицензий
			</h3>
			<p className="text-sm">
				Чтобы обновить свою лицензию, обратитесь в тех. поддержку
			</p>
			<ButtonCreateText
				text="Закрыть"
				btnType="light"
				onClick={() => onCancel && onCancel()}
				className="w-full mt-8"
			/>
		</div>
	);
}
