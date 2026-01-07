import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

const Layout = () => {
  const { theme } = useThemeStore();

  // Ensure theme is applied on mount and when it changes
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300">
      <Outlet />
    </div>
  );
};

export default Layout;
