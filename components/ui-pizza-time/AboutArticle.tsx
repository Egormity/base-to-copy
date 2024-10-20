import { ReactNode } from "react";

type AboutArticleProps = {
	cursive: string;
	heading: string;
	children: ReactNode;
	className?: string;
};

export default function AboutArticle({ cursive, heading, children, className }: AboutArticleProps) {
	return (
		<article className={`${className} space-y-2`}>
			<h2 className="font-cursive text-3xl text-primary-red">{cursive}</h2>
			<h2 className="text-4xl font-black">{heading}</h2>
			<p className="text-zinc-400">{children}</p>
		</article>
	);
}
