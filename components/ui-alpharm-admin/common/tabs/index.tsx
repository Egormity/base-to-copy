import React, { ReactNode, useState } from "react";

interface TabProps {
	label: React.ReactNode;
	children: ReactNode;
}

interface TabsProps {
	children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
	return <div>{children}</div>;
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
	const [activeTab, setActiveTab] = useState(0);

	const tabs = React.Children.toArray(children);

	return (
		<div>
			<div className="flex border-b border-primary-gray-light">
				{tabs.map((tab, index) => (
					<button
						type="button"
						key={index}
						className={`py-2 px-4 -mb-[1px] transition duration-300 font-semibold text-sm ${
							activeTab === index
								? "border-b-2 border-color-active text-color-active"
								: "border-b-2 border-transparent text-[#B3B3B3] hover:text-gray-700"
						}`}
						onClick={() => setActiveTab(index)}
					>
						{(tab as React.ReactElement<TabProps>).props.label}
					</button>
				))}
			</div>
			<div>{tabs[activeTab]}</div>
		</div>
	);
};

export { Tabs, Tab };
