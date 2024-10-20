export interface ILinkSettings {
	link: string;
	label: string;
}

export const itemsSettings: Array<ILinkSettings> = [
	{
		label: "Настройка рабочего времени",
		link: "work-time-settings",
	},
	{
		label: "Внешний вид",
		link: "appearance",
	},
	{
		label: "Управление планировщиком",
		link: "planning-manager",
	},
	{
		label: "Загрузка документов",
		link: "upload-documents",
	},
];
