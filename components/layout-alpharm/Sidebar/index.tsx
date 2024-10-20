import { ReactComponent as BurgerIcon } from "@assets/icons/burger.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import cn from "classnames";
import { useEffect, useState } from "react";

import { useGetLogo } from "@/api/commons/logo/useGetLogo";
import { useGetMyCompany } from "@/api/commons/my-company/get";

import styles from "./Sidebar.module.scss";
import SidebarItem from "./SidebarItem";
import { itemsMenu } from "./data/menu.data";
import authService from "@/services/auth/auth.service";

const Sidebar = () => {
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const queryClient = useQueryClient();

	const { logoUrl, isLoading } = useGetLogo();

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const { mutate } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authService.logout(),
		onSuccess: () => navigate({ to: "/auth" }),
	});

	const router = useRouter();
	const [activeLink, setActiveLink] = useState("");
	useEffect(() => {
		let path = router.latestLocation.pathname.split("/").slice(0, 2).join("/");
		if (path === "/library") path = "/library/materials";
		setActiveLink(path);
	}, []);

	// Directly derive the image data URL from logoUrl
	const imageDataUrl =
		logoUrl && logoUrl.data && logoUrl.data.fileData
			? `data:image/${logoUrl.data.extension};base64,${logoUrl.data.fileData}`
			: null;

	const { item: myCompany } = useGetMyCompany();

	return (
		<>
			<div className="w-16" />
			<div
				className={cn(styles["wrapper-sidebar"], {
					"w-80": isSidebarOpen,
					"w-16": !isSidebarOpen,
				})}
			>
				{isSidebarOpen ? (
					<>
						<div className={styles["wrapper-label"]}>
							<h2 className={styles["company-name"]}>
								{myCompany?.name || ""}
							</h2>
							<span className={styles["admin-panel"]}>
								Административная панель
							</span>
						</div>
						<ul className={styles["menu-list"]}>
							{itemsMenu.map((link) => (
								<Link
									to={link.path}
									key={link.path}
									onClick={() => {
										setActiveLink(link.path);
									}}
								>
									<SidebarItem
										isActive={link.path === activeLink}
										item={link}
									/>
								</Link>
							))}
						</ul>
						<div className="mt-5 pr-5">
							<button
								className="bg-color-active p-4 w-full text-white rounded-lg font-extrabold text-base"
								onClick={() => {
									mutate();
									queryClient.clear();
								}}
							>
								Выйти из аккаунта
							</button>
						</div>

						<div className={styles["logo-container"]}>
							{!isLoading && imageDataUrl ? (
								<img
									src={imageDataUrl}
									alt="Логотип компании"
									className={styles["company-logo"]}
								/>
							) : (
								<span className={styles["logo-text"]}>Логотип</span>
							)}
						</div>
					</>
				) : (
					<>
						<div
							className={styles["burger-icon-container"]}
							onClick={toggleSidebar}
						>
							<BurgerIcon />
						</div>
						<ul className={styles["menu-item"]}>
							{itemsMenu.map((link) => (
								<Link
									to={link.path}
									key={link.path}
									onClick={() => setActiveLink(link.path)}
								>
									<li className="relative">
										<link.icon
											className={
												activeLink === link.path
													? "text-color-active"
													: "text-primary-gray-dark"
											}
										/>
										{activeLink === link.path && (
											<div className={styles["active-indicator"]} />
										)}
									</li>
								</Link>
							))}
							<li>
								<div className="absolute bottom-5 left-1/2 -translate-x-1/2">
									{!isLoading && imageDataUrl ? (
										<img
											src={imageDataUrl}
											alt="Логотип компании"
											className="rounded-lg w-8 object-contain"
										/>
									) : (
										<span className="text-[8px] bg-primary-gray-light px-1.5 py-3.5 rounded">
											Логотип
										</span>
									)}
								</div>
							</li>
						</ul>
					</>
				)}
			</div>
			{isSidebarOpen && (
				<div
					className={styles["overlay"]}
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

export default Sidebar;
