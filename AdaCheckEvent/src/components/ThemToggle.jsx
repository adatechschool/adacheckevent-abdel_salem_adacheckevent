import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const ThemeToggle = () => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  
    const [theme, setTheme] = useLocalStorage("theme", prefersDark ? "dark" : "light");
    
  
    const dark = theme === "dark";
    useEffect(() => {
      document.documentElement.classList.toggle("dark", dark);
    }, [dark]);
  
    const toggle = () => setTheme(dark ? "light" : "dark");
    return (
      <button onClick={toggle} aria-label="Basculer le thème" 
      >
        {dark ? "🌙" : "☀️"}
      </button>
    );
  };
  