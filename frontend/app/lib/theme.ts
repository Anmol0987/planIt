import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
	const isDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	return isDark ? "dark" : "light";
}

function applyThemeClass(theme: Theme) {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	if (theme === "dark") {
		root.classList.add("dark");
	} else {
		root.classList.remove("dark");
	}
}

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return "light";
		const stored = window.localStorage.getItem("theme") as Theme | null;
		return stored ?? getSystemTheme();
	});

	useEffect(() => {
		applyThemeClass(theme);
		if (typeof window !== "undefined") {
			window.localStorage.setItem("theme", theme);
		}
	}, [theme]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		applyThemeClass(theme);
		// Sync with system changes if user hasn't explicitly chosen
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			const stored = window.localStorage.getItem("theme");
			if (!stored) {
				const system = getSystemTheme();
				setThemeState(system);
			}
		};
		media.addEventListener?.("change", handleChange);
		return () => media.removeEventListener?.("change", handleChange);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next);
	}, []);

	return { theme, setTheme };
}


