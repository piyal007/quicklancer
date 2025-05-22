import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Set theme on mount or change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="btn relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 shadow-sm hover:shadow-md"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="w-6 h-6 flex items-center justify-center text-lg">
        {theme === "light" ? "🌙" : "☀️"}
      </div>
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {theme === "light" ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
