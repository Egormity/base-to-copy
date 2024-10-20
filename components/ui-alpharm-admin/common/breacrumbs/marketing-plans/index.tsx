import { Link } from "@tanstack/react-router";

import { useGetMarketingCycle } from "@/api/commons/marketing-cycles/getById";
import { useGetMarketingKpiEmploy } from "@/api/commons/marketing-cycles/getKpiEmploy";
import { useGetMarketingPlan } from "@/api/commons/marketing-cycles/getPlan";

import { Route } from "@/routes/_authenticated/_layoutMenu/marketing-plans/cycles.$cycleId/plan.$planId/employ.$employId/index";

const BreadcrumbsMarketingPlans = () => {
	const { cycleId, employId, planId } = Route.useParams();

	const { item: marketingCycle } = useGetMarketingCycle(cycleId);
	const { item: marketingPlan } = useGetMarketingPlan({
		cycleId: cycleId,
		planId: planId,
	});

	const { item: employ } = useGetMarketingKpiEmploy({
		employId: employId,
		planId: planId,
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/marketing-plans",
		},
		marketingCycle?.[0] && {
			label: marketingCycle[0].name,
			to: `/marketing-plans/cycles/${cycleId}`,
		},
		marketingPlan && {
			label: marketingPlan.name,
			to: `/marketing-plans/cycles/${cycleId}/plan/${planId}`,
		},
		employ && {
			label: employ.userName,
			to: `/marketing-plans/cycles/${cycleId}/plan/${planId}/employ/${employId}`,
		},
	].filter(Boolean);

	return (
		<div className="h-[40px] bg-[var(--color-inactive)] w-full px-5 flex items-center">
			<nav className="text-primary-gray-dark">
				{breadcrumbs.map((breadcrumb, index) => (
					<span
						key={index}
						className="inline-flex items-center"
					>
						{index > 0 && <span className="mx-2">/</span>}
						<Link
							to={breadcrumb.to}
							className="hover:text-blue-600 transition-colors duration-200"
						>
							{breadcrumb.label}
						</Link>
					</span>
				))}
			</nav>
		</div>
	);
};

export default BreadcrumbsMarketingPlans;
