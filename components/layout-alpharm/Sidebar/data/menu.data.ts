import { ReactComponent as NavApplicantsIcon } from "@assets/icons/nav-applicants-icon.svg";
import { ReactComponent as NavEmployeeIcon } from "@assets/icons/nav-employee-icon.svg";
import { ReactComponent as NavLibraryIcon } from "@assets/icons/nav-library-icon.svg";
import { ReactComponent as NavManualIcon } from "@assets/icons/nav-manual-icon.svg";
import { ReactComponent as NavMarketingPlansIcon } from "@assets/icons/nav-marketing-plans-icon.svg";
import { ReactComponent as NavSettingsIcon } from "@assets/icons/nav-settings-icon.svg";
import { ReactComponent as NavStructuresIcon } from "@assets/icons/nav-structures-icon.svg";

import { ILinkMenu } from "../sidebar.interface";

export const itemsMenu: ILinkMenu[] = [
	{ path: "/structures", label: "Структура компании", icon: NavStructuresIcon },
	{ path: "/employee", label: "Сотрудники", icon: NavEmployeeIcon },
	{ path: "/manual", label: "Справочники", icon: NavManualIcon },
	{ path: "/library/materials", label: "Библиотека", icon: NavLibraryIcon },
	{
		path: "/marketing-plans",
		label: "Маркетинговое планирование",
		icon: NavMarketingPlansIcon,
	},
	{ path: "/settings", label: "Настройки", icon: NavSettingsIcon },
	{ path: "/applicants", label: "Заявки", icon: NavApplicantsIcon },
];
