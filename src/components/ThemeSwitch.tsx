import { useEffect, useState } from "react";
import "../styles/ThemeSwitch.scss"
import { MoonHalfRight5Bulk, Sun1Bulk } from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark" ? "dark" : "light";
}

const ThemeSwitch = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }


    return (
        <button className={`theme-switch ${theme}`}
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
        >
            <span className="thumb">
                <span className="icon sun">
                    <Lineicons icon={Sun1Bulk} size={20} />
                </span>

                <span className="icon moon">
                    <Lineicons icon={MoonHalfRight5Bulk} size={16} />
                </span>
            </span>
        </button>
    )
}

export default ThemeSwitch
