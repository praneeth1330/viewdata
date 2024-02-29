import React, { Component } from "react";
import Picture from "../images/profile.jpg"; // Importing profile picture
import "./myprofile.scss"; // Importing styling for MyProfile component
import { connect } from "react-redux"; // Importing connect function from react-redux for connecting component to Redux store

import NavBar from "./NavBar"; // Importing NavBar component

// Defining MyProfile component
export class MyProfile extends Component {
  render() {
    // Destructuring decodedToken from props
    const { decodedToken } = this.props;

    // Logging decodedToken for debugging
    console.log("profile comp", decodedToken);

    return (
      <div className="">
        <NavBar />

        <div className="main-myProfile">
          <div className="myprofile">
            <div className="profile-header">
              <h1>Hello!</h1>
              <p>
                {decodedToken !== null
                  ? "i am" +
                    " " +
                    decodedToken.name +
                    ", creative Frontend Developer"
                  : "I'm a creative Frontend Developer"}
              </p>
            </div>

            <div className="profile-grid">
              <div className="profile-picture">
                <img
                  src={decodedToken !== null ? decodedToken.picture : Picture}
                  alt=""
                  className="profile-image"
                />
              </div>

              <div className="profile-aboutme">
                <h3>About Me</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>

              <div className="profile-details">
                <h3>Details</h3>
                {/* Displaying user details */}
                <div className="details">
                  <p className="details-headers">Name:</p>
                  <p>
                    {decodedToken !== null ? decodedToken.name : "Example Name"}
                  </p>
                </div>
                <div className="details">
                  <p className="details-headers">Email:</p>
                  <p>
                    {decodedToken !== null
                      ? decodedToken.email
                      : "Example Email"}
                  </p>
                </div>
                <div className="details">
                  <p className="details-headers">User Id:</p>
                  <p>
                    {decodedToken !== null
                      ? decodedToken.user_id
                      : "Example Id"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Mapping state to props for accessing decodedToken from Redux store
const mapStateToProps = (state) => ({
  decodedToken: state.auth.decodedToken,
});

// Connecting MyProfile component to Redux store
export default connect(mapStateToProps)(MyProfile);
