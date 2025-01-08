import { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import HorizontalNav from "../components/navbar/HorizontalNav";
import VerticalNav from "../components/navbar/VerticalNav";

const Main = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-blue-300 dark:text-white dark:bg-gray-900">
        <HorizontalNav toggleTheme={toggleTheme} isDark={isDark} />
        <div className="flex bg-purple-400 dark:bg-gray-800">
          <VerticalNav setIsDark={isDark} toggleTheme={toggleTheme} />
          <main className="flex-1">
            <Dashboard setIsDark={isDark} toggleTheme={toggleTheme} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Main;
