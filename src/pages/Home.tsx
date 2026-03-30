import About from "../components/About";
import Dodgers from "../components/Dodgers";
import Experience from "../components/Experience";
import Likes from "../components/Likes";
import LocationCard from "../components/Map";
import Project from "../components/Project";
import SocialLinks from "../components/SocialLinks";
import Tech from "../components/Tech";
import '../styles/Home.scss';
import { motion } from "motion/react"

function Home() {
  return (
    <>
      <motion.div
        initial={{y: 25, opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.125, ease: "easeOut" }}
      >
        <section className="left">
          <About />
          <Tech />
          <Project />
          <Dodgers />
        </section>
      </motion.div>

      <motion.div
        initial={{y: 35, opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
      <aside className="right">
        <Experience />
        <SocialLinks/>
        <LocationCard />  
        <Likes />
        </aside>
      </motion.div>
    </>
  );
}

export default Home;
