import "../App.scss";
import { Outlet } from "react-router-dom";

function MinimalLayout() {
    return (
    <>    
        <Outlet/>
            
        <footer className="footer">
            made with 💖 by jsh
        </footer>
    </>
    );
}

export default MinimalLayout;
