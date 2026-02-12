import Profile from "../components/Profile";
import "../App.scss";

type MainLayoutProps = {
    children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
    return (
    <>    
        <Profile />

        <main className="main-layout">
            {children}
        </main>
            
        <footer className="footer">
            made with 💖 by jsh
        </footer>
    </>
    );
}

export default MainLayout;
