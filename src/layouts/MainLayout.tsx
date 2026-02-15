import Profile from "../components/Profile";
import "../App.scss";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
    <>    
        <Profile />
        <main className="main-layout">
            <Outlet/>
        </main>
            
        <footer className="footer">
            made with 💖 by jsh
            <span>v2 - inspired by <a href="https://bryllim.com/" target="_blank">Bryl Lim</a></span>
        </footer>
    </>
    );
}

export default MainLayout;
