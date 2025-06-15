import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark", // default theme
      availableThemes: ["light", "dark"],

      setTheme: (newTheme) => {
        set({ theme: newTheme });

        // Apply theme to document
        document.documentElement.setAttribute("data-theme", newTheme);

        // Add/remove dark class based on theme for Tailwind dark mode
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },

      toggleTheme: () => {
        const { theme, availableThemes } = get();
        const currentIndex = availableThemes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % availableThemes.length;
        const newTheme = availableThemes[nextIndex];

        set({ theme: newTheme });
        document.documentElement.setAttribute("data-theme", newTheme);

        // Add/remove dark class based on theme for Tailwind dark mode
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },

      initializeTheme: () => {
        const { theme } = get();
        document.documentElement.setAttribute("data-theme", theme);

        // Add this missing part - Initialize dark class for Tailwind
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },
    }),
    {
      name: "arkham-theme-storage",
    }
  )
);
