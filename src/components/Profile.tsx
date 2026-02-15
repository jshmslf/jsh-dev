import ThemeSwitch from "./ThemeSwitch";
import "../styles/Profile.scss";
import checkBadge from "../assets/check-badge.png"
import pfp from "../assets/pfp.jpg"
import pfpDark from "../assets/pfp-dark.jpg"
import {  HiOutlineLocationMarker } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
// import { PiPolygon } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";
import { useEffect, useState } from "react";
import EmailModal from "./EmailModal";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return() => observer.disconnect();
  }, []);

  return (
    <div className="card profile">
      <div className="profile-photo">
        <img src={isDark ? pfpDark : pfp} alt="My Photo" />
      </div>

      <div className="profile-info">
        <div className="info-group name-toggle">
          <div className="name-badge">
            <h1 className="text-3xl">Joshua Verceles</h1>
            <img src={checkBadge} alt="Verified" className="verified-badge"/>
          </div>
          <ThemeSwitch />
        </div>

        <div className="info">
          <HiOutlineLocationMarker />
          <p>Pangasinan, Philippines</p>
        </div>

        <div className="info work">
          <p className="text-lg">
            {'Software Engineer '}
            <span className="divider">\</span>
            {' Graphic Artist'}
          </p>
        </div>

        {/* CTA */}
        <div className="info-group cta-buttons">
          <a href="https://github.com/jshmslf" className="btn resume hover-translate" target="_blank">
            <LuGithub />
            GitHub
          </a>
          <button
            className="btn email hover-translate"
            onClick={() => setIsModalOpen(true)}
          >
            <MdMailOutline />
            Send Email
          </button>
          {/* <button className="btn portfolio hover-translate">
            <div>
              <PiPolygon />
              Art Portfolio
            </div>
          </button> */}
        </div>
      </div>
      <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
