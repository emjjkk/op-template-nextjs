"use client";

import { useDarkMode } from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
    >
      {isDarkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
