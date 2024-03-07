// Assuming the CSS classes for search recommendations are defined in "nav-bar.scss"

import React, { Component, MouseEvent, ChangeEvent } from "react";
import { connect } from "react-redux";
import { searchQuery } from "../redux/action";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { LuMessageSquare } from "react-icons/lu";
import { LuUserCircle2 } from "react-icons/lu";
import { TbSettings } from "react-icons/tb";
import { LuHelpCircle } from "react-icons/lu";
import ProfileMenu from "./ProfileMenu";
import { RiLogoutCircleLine } from "react-icons/ri";
import logo_nav from "../images/nav-logo.png";
import Profile from "../images/profile.jpg";
import { Link } from "react-router-dom";
import "./nav-bar.scss";

interface NavBarProps {
  decodedToken: any;
  graphs: any[];
  dispatch: any;
}

interface NavBarState {
  showMenu: boolean;
  largMenu: boolean;
  search: string;
}

class NavBar extends Component<NavBarProps, NavBarState> {
  private navRef: any;

  state: NavBarState = {
    showMenu: false,
    largMenu: false,
    search: "",
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.navRef && !this.navRef.contains(event.target as Node)) {
      this.setState({ showMenu: false, largMenu: false });
    }
  };

  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };

  toggleWindowMenu = () => {
    this.setState((prevState) => ({
      largMenu: !prevState.largMenu,
    }));
  };

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ search: value });
    this.props.dispatch(searchQuery(value));
  };

  handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { search } = this.state;
    this.props.dispatch(searchQuery(search));

    const regex = new RegExp(search, "i");
    const searchResults = this.props.graphs.filter(
      (item) =>
        regex.test(item[0].registered_state) || regex.test(item.description)
    );
    console.log("Search Results:", searchResults);
  };

  navigateToStateDetails = (state: string) => {
    // Navigate to the details page for the clicked state
    this.props.history.push(`/details/${state}`);
  };

  renderSearchRecommendations = () => {
    const { search } = this.state;
    const { graphs } = this.props;
    const regex = new RegExp(search, "i");
    const searchResults = graphs.filter(
      (item) =>
        regex.test(item[0].registered_state) || regex.test(item.description)
    );

    if (search.trim() !== "") {
      return searchResults.length > 0 ? (
        <div className="search-recommendations">
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                {/* Make suggestion clickable */}
                <button
                  onClick={() =>
                    this.navigateToStateDetails(result[0].registered_state)
                  }
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {[...new Set(result.map((state) => state.registered_state))]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null;
    } else {
      return null;
    }
  };

  render() {
    const { decodedToken } = this.props;
    const { search } = this.state;
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
          <form onSubmit={this.handleSearchSubmit} className="search-nav">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={this.handleSearchChange}
            />
          </form>
          {this.renderSearchRecommendations()}
          <div className="profile">
            <div className="nav-icons">
              <div className="notification">
                <MdOutlineNotificationsNone className="notification-bar" />
              </div>
              <div className="larg-menu">
                <FaRegUserCircle
                  className="notification-bar profilechange"
                  onClick={this.toggleWindowMenu}
                />
              </div>
            </div>
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
        {this.state.largMenu ? (
          <div className="display-menu">
            <div className="main-lg">
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

const mapStateToProps = (state: any) => ({
  decodedToken: state.auth.decodedToken,
  graphs: state.graphs.graphs,
});

export default connect(mapStateToProps)(NavBar);
