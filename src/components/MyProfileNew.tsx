import React, { Component } from "react";
import Picture from "../images/profile.jpg";
// import "./myprofile.scss";
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
      databaseData: {},
    };
  }

  //write to database
  // writeToDataBase = () => {};

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

  // Handle input change for name
  handleChangeName = (e) => {
    this.setState({
      editedName: e.target.value,
    });
  };

  // Handle save button click for name
  handleSaveName = () => {
    const { editedName } = this.state;

    this.updateNameInDatabase(editedName);
    this.readDataFromDatabase();
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
  // console.log(this.this.props.first)

  //  readData from firebase
  // readDataFromDatabase = () => {
  //   const dbRef = ref(db);
  //   get(child(dbRef, this.state.decodedToken)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   });
  // };

  readDataFromDatabase = () => {
    const { decodedToken } = this.props;

    if (decodedToken) {
      const dbRef = ref(db);
      const userRef = child(dbRef, decodedToken.user_id); // Assuming the user's data is stored under 'users' node with the user's UID as key
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            this.setState({ databaseData: snapshot.val() });
            console.log("database read", this.state.databaseData);
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
      // Update the name in the database while merging existing data
      const updatedData = {
        name: newName,
        email: decodedToken.email,
        user_id: decodedToken.user_id,
        picture: decodedToken.picture,
      };
      set(userRef, updatedData)
        .then(() => {
          console.log("Name updated successfully in the database");
        })
        .catch((error) => {
          console.error("Error updating name in the database:", error);
        });
    } else {
      console.log("No decoded token available");
    }
  };

  render() {
    const { decodedToken } = this.props;
    const { editedName, isEditingName, databaseData } = this.state;

    return (
      <div className="">
        <NavBarNav />
        <div className="main-myProfile">
          <div className="myprofile">
            <div className="profile-header">
              <h1>Hello!</h1>
              <p>
                {databaseData.user_id === decodedToken.user_id
                  ? databaseData.name
                  : decodedToken.name}
              </p>
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
                        ? databaseData.name
                        : decodedToken !== null
                        ? databaseData.name
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
