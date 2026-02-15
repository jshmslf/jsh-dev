import Profile from "../components/Profile";
import "../App.scss";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react"

function MainLayout() {
    return (
    <> 
        <motion.div
            initial={{ opacity: 0}}
            animate={{opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
            <Profile />
        </motion.div>
            
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
