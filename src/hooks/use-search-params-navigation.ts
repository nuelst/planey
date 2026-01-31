import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";

export function useSearchParamsNavigation<T extends Record<string, unknown>>() {
	const navigate = useNavigate();
	const search = useSearch({ strict: false }) as T;

	const updateSearch = useCallback(
		(updates: Partial<T>) => {
			navigate({
				to: ".",
				search: { ...search, ...updates },
			});
		},
		[navigate, search],
	);

	const removeSearchParams = useCallback(
		(...keys: (keyof T)[]) => {
			const newSearch = { ...search };
			for (const key of keys) {
				delete newSearch[key];
			}
			navigate({
				to: ".",
				search: newSearch,
			});
		},
		[navigate, search],
	);

	const clearSearch = useCallback(() => {
		navigate({
			to: ".",
			search: {},
		});
	}, [navigate]);

	return {
		search,
		updateSearch,
		removeSearchParams,
		clearSearch,
	};
}

