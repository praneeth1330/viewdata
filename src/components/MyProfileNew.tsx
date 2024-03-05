import React, { Component } from "react";
import Picture from "../images/profile.jpg";
// import "./myprofile.scss";
import "./myprofilenew.scss";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { CiEdit } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";

export class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedName: "",
      editedEmail: "",
      isEditingName: false,
    };
  }

  // Handle edit button click for name
  handleEditName = () => {
    const { decodedToken } = this.props;
    const { editedName } = this.state;
    if (decodedToken) {
      this.setState({
        editedName: editedName || decodedToken.name, // Use editedName if available, otherwise use decoded name
        isEditingName: true,
      });
    }
  };

  // Handle edit button click for email
  handleEditEmail = () => {
    const { decodedToken } = this.props;
    const { editedEmail } = this.state;
    if (decodedToken) {
      this.setState({
        editedEmail: editedEmail || decodedToken.email, // Use editedEmail if available, otherwise use decoded email
      });
    }
  };

  // Handle input change for name
  handleChangeName = (e) => {
    this.setState({
      editedName: e.target.value,
    });
  };

  // Handle input change for email
  handleChangeEmail = (e) => {
    this.setState({
      editedEmail: e.target.value,
    });
  };

  // Handle save button click for name
  handleSaveName = () => {
    const { editedName } = this.state;
    // Update state with edited name
    this.setState(
      {
        isEditingName: false,
      },
      () => {
        // Save edited name to local storage after state is updated
        localStorage.setItem("editedName", editedName);
      }
    );
  };

  // // Handle save button click for email
  // handleSaveEmail = () => {
  //   const { editedEmail } = this.state;
  //   // Update state with edited email
  //   this.setState(
  //     {
  //       isEditingEmail: false,
  //     },
  //     () => {
  //       // Save edited email to local storage after state is updated
  //       localStorage.setItem("editedEmail", editedEmail);
  //     }
  //   );
  // };

  render() {
    const { decodedToken } = this.props;
    const { editedName, editedEmail, isEditingName } = this.state;

    return (
      <div className="">
        <NavBar />
        <div className="main-myProfile">
          <div className="myprofile">
            <div className="profile-header">
              <h1>Hello!</h1>
              <p>
                {decodedToken !== null
                  ? "i am " +
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

              <div className="profile-details">
                <h3>Details</h3>
                <div className="details">
                  <p className="details-headers">Name:</p>
                  {isEditingName ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={this.handleChangeName}
                    />
                  ) : (
                    <p>
                      {editedName
                        ? editedName
                        : decodedToken !== null
                        ? decodedToken.name
                        : "Example Name"}
                    </p>
                  )}
                  {isEditingName ? (
                    <CiCircleCheck
                      onClick={this.handleSaveName}
                      className="edit"
                    />
                  ) : (
                    // <button onClick={this.handleSaveName}>Save</button>
                    <CiEdit onClick={this.handleEditName} className="edit" />
                    // <button onClick={this.handleEditName}>Edit</button>
                  )}
                </div>
                <div className="details">
                  <p className="details-headers">Email:</p>

                  <p>
                    {decodedToken !== null
                      ? decodedToken.email
                      : "Example Email"}
                  </p>
                </div>
              </div>
            </div>
            <div className="profile-aboutme">
              <h3>About Me</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  decodedToken: state.auth.decodedToken,
});

export default connect(mapStateToProps)(MyProfile);
