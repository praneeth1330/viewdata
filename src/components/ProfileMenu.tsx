import React, { Component } from "react";
import "./nav-bar.scss";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import Profile from "../images/profile.jpg";
import { RiUserSharedLine } from "react-icons/ri";
import { LiaUserEditSolid } from "react-icons/lia";
import { LuMessageSquare } from "react-icons/lu";
import { LuUserCircle2 } from "react-icons/lu";
import { TbSettings } from "react-icons/tb";
import { LuHelpCircle } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

export class ProfileMenu extends Component {
  render() {
    return (
      <div>
        <div className="profileMenu">
          <div className="profile-info">
            <img src={Profile} alt="" className="profile-img" />
            <div className="profile-data">
              <h5 className="h5-small">Example name</h5>
              <p className="p-small">exampleemail@email.com</p>
            </div>
          </div>
          <div className="icons">
            <LuUserCircle2 className="profile-icons" />
            <p>My Profile</p>
          </div>
          <div className="icons">
            <LiaUserEditSolid className="profile-icons" />

            <p>Edit Profile</p>
          </div>
          <div className="icons">
            <LuMessageSquare className="profile-icons" />

            <p>Messages</p>
          </div>
          <div className="icons">
            <TbSettings className="profile-icons" />
            <p>Settings</p>
          </div>
          <div className="icons">
            <LuHelpCircle className="profile-icons" />
            <p>Help</p>
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="icons">
              <BiLogOut className="profile-icons" />
              <p>Logout</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileMenu;
