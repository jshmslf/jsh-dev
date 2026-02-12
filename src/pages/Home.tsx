import About from "../components/About";
import Experience from "../components/Experience";
import Likes from "../components/Likes";
import Project from "../components/Project";
import SocialLinks from "../components/SocialLinks";
import Tech from "../components/Tech";

function Home() {
  return (
    <>
      <section className="left">
        <About />
        <Tech />
        <Project />
      </section>

      <aside className="right">
        <Experience />
        <SocialLinks/>
        <Likes />
      </aside>
    </>
  );
}

export default Home;
