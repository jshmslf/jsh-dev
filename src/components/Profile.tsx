import ThemeSwitch from "./ThemeSwitch";
import "../styles/Profile.scss";
import checkBadge from "../assets/check-badge.png"
import { HiChevronRight, HiOutlineLocationMarker } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
import { PiPolygon } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";

const Profile = () => {
  return (
    <div className="profile-row">
      {/* Column 1: Profile Photo */}
      <div className="profile-photo">
        <img src="/profile.jpg" alt="My Photo" />
      </div>

      {/* Column 2: Info */}
      <div className="profile-info">
        {/* Group 1: Name + Theme Toggle */}
        <div className="info-group name-toggle">
          <div className="name-badge">
            <h1>Joshua Verceles</h1>
            <img src={checkBadge} alt="Verified" className="verified-badge"/>
          </div>
          <ThemeSwitch />
        </div>

        {/* Group 2: Location */}
        <div className="info">
          <HiOutlineLocationMarker />
          <p>Pangasinan, Philippines</p>
        </div>

        {/* Group 3: Job Position */}
        <div className="info work">
          <p>Software Engineer</p>
        </div>

        {/* Group 4: CTA Buttons */}
        <div className="info-group cta-buttons">
          <button className="btn resume">
            <LuGithub />
            GitHub
          </button>
          <button className="btn email">
            <MdMailOutline />
            Send Email
          </button>
          <button className="btn portfolio">
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
