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
        </footer>
    </>
    );
}

export default MainLayout;
