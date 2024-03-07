import React, { Component } from "react";
import "./nav-bar.scss";

import Profile from "../images/profile.jpg";

import { LiaUserEditSolid } from "react-icons/lia";
import { LuMessageSquare } from "react-icons/lu";
import { LuUserCircle2 } from "react-icons/lu";
import { TbSettings } from "react-icons/tb";
import { LuHelpCircle } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

// ProfileMenu component for displaying user profile options
export class ProfileMenu extends Component {
  render() {
    return (
      <div>
        <div className="profileMenu">
          {/* User profile information */}
          <div className="profile-info">
            <img src={this.props.image} alt="" className="profile-img" />
            <div className="profile-data">
              <h5 className="h5-small">{this.props.name}</h5>
              <p className="p-small">{this.props.email}</p>
            </div>
          </div>
          {/* Profile options and linking my profile to /graph page */}
          <Link to="/profile" className="icons">
            <LuUserCircle2 className="profile-icons" />
            <p>My Profile</p>
          </Link>

          <div className="icons">
            <LuMessageSquare className="profile-icons" />
            <p>Messages</p>
          </div>

          <div className="icons">
            <LuHelpCircle className="profile-icons" />
            <p>Help</p>
          </div>
          {/* Logout option */}
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
