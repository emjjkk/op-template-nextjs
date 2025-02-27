"use client";

import { useDarkMode } from "@/hooks/useDarkMode";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (<button onClick={toggleDarkMode} className="mx-2 text-md"> {isDarkMode ? (<FaMoon/>): (<FaSun/>)}</button>);
}
