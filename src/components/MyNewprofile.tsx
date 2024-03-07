import React, { Component } from "react";
import Picture from "../images/profile.jpg";
import "./myprofilenew.scss";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { CiEdit } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { db } from "../config";
import { child, get, ref, set } from "firebase/database";
import NavBarNav from "./NavBarNav";

export class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editedName: "",
      isEditingName: false,
      databaseData: null, // Initialize to null
    };
  }

  componentDidMount() {
    this.readDataFromDatabase(); // Fetch user data when component mounts
  }

  handleEditName = () => {
    const { databaseData } = this.state;
    if (databaseData) {
      this.setState({
        editedName: databaseData.name, // Use name from database
        isEditingName: true,
      });
    }
  };

  handleChangeName = (e) => {
    this.setState({
      editedName: e.target.value,
    });
  };

  handleSaveName = () => {
    const { editedName } = this.state;
    this.updateNameInDatabase(editedName);
    // No need to read data again, as the updateNameInDatabase will update the state with new data
    this.setState({
      isEditingName: false,
    });
  };

  readDataFromDatabase = () => {
    const { decodedToken } = this.props;

    if (decodedToken) {
      const dbRef = ref(db);
      const userRef = child(dbRef, decodedToken.user_id);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            this.setState({ databaseData: userData });
          } else {
            console.log("No data available for this user");
          }
        })
        .catch((error) => {
          console.error("Error reading data:", error);
        });
    } else {
      console.log("No decoded token available");
    }
  };

  updateNameInDatabase = (newName) => {
    const { decodedToken } = this.props;

    if (decodedToken) {
      const dbRef = ref(db);
      const userRef = child(dbRef, decodedToken.user_id);

      set(userRef, { ...this.state.databaseData, name: newName })
        .then(() => {
          console.log("Name updated successfully in the database");
          // Update state with the new name
          this.setState((prevState) => ({
            databaseData: { ...prevState.databaseData, name: newName },
          }));
        })
        .catch((error) => {
          console.error("Error updating name in the database:", error);
        });
    } else {
      console.log("No decoded token available");
    }
  };

  render() {
    const { databaseData, isEditingName, editedName } = this.state;

    return (
      <div className="">
        <NavBarNav />
        <div className="main-myProfile">
          <div className="myprofile">
            <div className="profile-header">
              <h1>Hello!</h1>
              <p>{databaseData ? databaseData.name : "example name"}</p>
              <p>
                {databaseData
                  ? "i am " +
                    databaseData.name +
                    ", creative Frontend Developer"
                  : "Loading..."}
              </p>
            </div>
            <div className="profile-grid">
              <div className="profile-picture">
                <img
                  src={databaseData ? databaseData.picture : Picture}
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
                      {databaseData ? databaseData.name : "exapmle name..."}
                    </p>
                  )}
                  {isEditingName ? (
                    <CiCircleCheck
                      onClick={this.handleSaveName}
                      className="edit"
                    />
                  ) : (
                    <CiEdit onClick={this.handleEditName} className="edit" />
                  )}
                </div>
                <div className="details">
                  <p className="details-headers">Email:</p>
                  <p>
                    {databaseData ? databaseData.email : "example email..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="profile-aboutme">
              <h3>About Me</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
                inventore qui ullam quasi ea dolore eligendi, neque perspiciatis
                repellendus facilis eum fugiat id. Molestiae deserunt rem
                dolorum fugiat natus qui!
              </p>
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
