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

    return (
        <button className={`theme-button ${theme}`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Dark Mode"
        >
            <span className="icon sun">
                <Lineicons icon={Sun1Bulk} size={25} />
            </span>

            <span className="icon moon">
                <Lineicons icon={MoonHalfRight5Bulk} size={20} />
            </span>
        </button>
    )
}

export default ThemeSwitch
