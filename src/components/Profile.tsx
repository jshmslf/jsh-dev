import ThemeSwitch from "./ThemeSwitch";
import "../styles/Profile.scss";
import checkBadge from "../assets/check-badge.png"
import { HiChevronRight, HiOutlineLocationMarker } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
import { PiPolygon } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";

const Profile = () => {
  return (
    <div className="card profile">
      <div className="profile-photo">
        <img src="/profile.jpg" alt="My Photo" />
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
          <p className="text-lg">Software Engineer</p>
        </div>

        {/* CTA */}
        <div className="info-group cta-buttons">
          <a href="https://github.com/jshmslf" className="btn resume hover-translate" target="_blank">
            <LuGithub />
            GitHub
          </a>
          <button className="btn email hover-translate">
            <MdMailOutline />
            Send Email
          </button>
          <button className="btn portfolio hover-translate">
            <div>
              <PiPolygon />
              Art Portfolio
            </div>
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
