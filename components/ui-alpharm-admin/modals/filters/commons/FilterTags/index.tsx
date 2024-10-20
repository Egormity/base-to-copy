import type { Filter } from "@/store/filters/applicantsFilterStore";
import type { Filter as FilterSimple } from "@/store/filters/organizationFilterStore";

export default function FilterTags({
	appliedFilters,
	removeAppliedFilter,
	removeFilter,
	afterRemove,
}: {
	appliedFilters: Array<FilterSimple | Filter>;
	removeAppliedFilter?: (
		name: string,
		valueId: number,
		itemName?: string
	) => void;
	removeFilter?: (name: string, valueId: number, itemName?: string) => void;
	afterRemove?: () => void;
}) {
	const seenValues = new Set<number>();

	if (appliedFilters?.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-2 max-w-screen border-t border-primary-gray-light p-5">
			{appliedFilters?.map((filter) =>
				filter?.values?.map((value: any) => {
					// Проверяем, уже ли добавлено значение
					if (seenValues.has(value?.id || value)) {
						return null; // Если добавлено, возвращаем null (не отображаем)
					}
					// Добавляем значение в Set
					seenValues.add(value?.id || value);

					return (
						<div
							key={value?.id || value}
							className="@apply flex h-[33px] justify-between items-center text-color-active rounded-[16px] px-[12px] py-[8px] border-[1px] border-color-active bg-color-inactive"
						>
							<span>{value?.name || value}</span>
							<span
								className="ml-[8px] cursor-pointer text-color-active"
								onClick={() => {
									removeAppliedFilter?.(filter.name, value?.id || value);
									removeFilter?.(
										filter.name,
										value?.id || value,
										value?.name || value
									);
									afterRemove?.();
								}}
							>
								X
							</span>
						</div>
					);
				})
			)}
		</div>
	);
}
