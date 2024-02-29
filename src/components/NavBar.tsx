import React, { Component } from "react";
import logo_nav from "../images/nav-logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import Profile from "../images/profile.jpg";
import { LuMessageSquare } from "react-icons/lu";
import { LuUserCircle2 } from "react-icons/lu";
import { TbSettings } from "react-icons/tb";
import { LuHelpCircle } from "react-icons/lu";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import "./nav-bar.scss";
import { connect } from "react-redux";

// Define NavBar component
export class NavBar extends Component {
  state = {
    showMenu: false, // Flag to show/hide mobile profile menu
    largMenu: false, // Flag to show/hide large profile menu
  };

  // Add event listener to detect clicks outside the nav bar
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  // Remove event listener when component unmounts
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // Handle click outside the nav bar to close menus
  handleClickOutside = (event) => {
    if (this.navRef && !this.navRef.contains(event.target)) {
      this.setState({ showMenu: false, largMenu: false });
    }
  };

  // Toggle mobile profile menu
  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  // Toggle large profile menu
  toggleWindowMenu = () => {
    this.setState((prevState) => ({
      largMenu: !prevState.largMenu,
    }));
  };

  render() {
    const { decodedToken } = this.props;
    return (
      <div className="main-nav" ref={(ref) => (this.navRef = ref)}>
        <nav>
          <Link
            to="/home"
            style={{ textDecoration: "none", listStyle: "none" }}
            className="logo-nav-img"
          >
            <img
              src={logo_nav}
              alt=""
              className="logo-img"
              style={{ textDecoration: "none" }}
            />
          </Link>
          {/* Search bar */}
          <div className="search-nav">
            <input type="text" placeholder="search" />
          </div>
          {/* Profile section */}
          <div className="profile">
            <div className="nav-icons">
              {/* Notification icon */}
              <div className="notification">
                <MdOutlineNotificationsNone className="notification-bar" />
              </div>
              {/* Large profile menu icon */}
              <div className="larg-menu">
                <FaRegUserCircle
                  className="notification-bar profilechange"
                  onClick={this.toggleWindowMenu}
                />
              </div>
            </div>
            {/* Mobile profile menu */}
            <div className="hamburger">
              {this.state.showMenu ? (
                <div className="cross">
                  <FaRegUserCircle
                    className="notification-bar"
                    onClick={this.toggleMobileMenu}
                  />
                  <ProfileMenu
                    name={
                      decodedToken !== null
                        ? decodedToken.name
                        : "Example Name "
                    }
                    image={
                      decodedToken !== null ? decodedToken.picture : Profile
                    }
                    email={
                      decodedToken !== null
                        ? decodedToken.email
                        : "example@email.com"
                    }
                  />
                </div>
              ) : (
                <FaRegUserCircle
                  className="notification-bar "
                  onClick={this.toggleMobileMenu}
                />
              )}
            </div>
          </div>
        </nav>
        {/* Large profile menu */}
        {this.state.largMenu ? (
          <div className="display-menu">
            <div className="main-lg">
              {/* User profile information */}
              <div className="lg-pro">
                <div className="img">
                  <img
                    src={`${
                      decodedToken !== null ? decodedToken.picture : Profile
                    }`}
                    alt=""
                  />
                </div>
                <div className="pro-txt">
                  <h5>{`${
                    decodedToken !== null ? decodedToken.name : "Example Name"
                  }`}</h5>
                  <p>{`${
                    decodedToken !== null
                      ? decodedToken.email
                      : "example@email.com"
                  }`}</p>
                </div>
              </div>
              {/* Links for profile options */}
              <Link
                to="/profile"
                className="icons-lg"
                style={{ cursor: "pointer" }}
              >
                <LuUserCircle2 className="profile-icons-lg" />
                <p>My Profile</p>
              </Link>
              <div className="icons-lg">
                <TbSettings className="profile-icons-lg" />
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
              {/* Logout button */}
              <Link to="/" style={{ textDecoration: "none" }}>
                <div className="icons-lg large-icon">
                  <RiLogoutCircleLine className="profile-icons-lg" />
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

// Map Redux state to component props
const mapStateToProps = (state) => ({
  decodedToken: state.auth.decodedToken,
});

// Connect the component to Redux store
export default connect(mapStateToProps)(NavBar);
