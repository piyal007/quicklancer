import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // Then check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Set theme on mount or change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="btn relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 dark:text-white transition-all duration-300 shadow-sm hover:shadow-md"
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
