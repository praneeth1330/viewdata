import React, { Component } from "react";
import logo_nav from "../images/nav-logo.png";
// import "./nav-bar.scss";
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
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { TbUserEdit } from "react-icons/tb";
import "./newNav.scss";

export class NavBar extends Component {
  state = {
    showMenu: false,
    largMenu: false,
  };

  mobileMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu, // Toggle showMenu state
    }));
  };
  windowMenu = () => {
    this.setState((prevState) => ({
      largMenu: !prevState.largMenu,
    }));
  };
  render() {
    return (
      <div className="main-nav">
        <nav>
          <img src={logo_nav} alt="" className="logo-img" />

          <div className="search-nav">
            <input type="text" placeholder="search" />
          </div>
          <div className="profile">
            <div className="nav-icons">
              <div className="notification">
                <MdOutlineNotificationsNone className="notification-bar" />
              </div>
              <div className="larg-menu">
                <FaRegUserCircle
                  className="notification-bar profilechange"
                  onClick={this.windowMenu}
                />
              </div>
            </div>

            <div className="hamburger">
              {this.state.showMenu ? (
                <div className="cross">
                  <FaRegUserCircle
                    className="notification-bar"
                    onClick={this.mobileMenu}
                  />
                  <ProfileMenu />
                </div>
              ) : (
                <FaRegUserCircle
                  className="notification-bar "
                  onClick={this.mobileMenu}
                />
              )}
            </div>
          </div>
        </nav>
        {this.state.largMenu ? (
          <div className="display-menu">
            <div className="main-lg">
              <div className="lg-pro">
                <div className="img">
                  <img src={Profile} alt="" />
                </div>
                <div className="pro-txt">
                  <h5>Example name</h5>
                  <p>example@email.com</p>
                </div>
              </div>
              <div className="icons-lg" style={{ cursor: "pointer" }}>
                <LuUserCircle2 className="profile-icons-lg" />
                <p>My Profile</p>
              </div>
              <div className="icons-lg">
                <TbUserEdit className="profile-icons-lg" />

                <p>Edit Profile</p>
              </div>
              <div className="icons-lg">
                <LuMessageSquare className="profile-icons-lg" />

                <p>Messages</p>
              </div>
              <div className="icons-lg">
                <TbSettings className="profile-icons-lg" />
                <p>Settings</p>
              </div>
              <div className="icons-lg">
                <LuHelpCircle className="profile-icons-lg" />
                <p>Help</p>
              </div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="icons-lg large-icon">
                  <BiLogOut className="profile-icons-lg" />
                  <p>Logout</p>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default NavBar;
