import React, { Component } from "react";
import Picture from "../images/profile.jpg";
import "./myprofilenew.scss";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { CiCircleCheck, CiEdit } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { db, storage } from "../config";
import { child, get, ref, set } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { filter } from "lodash";
interface DatabaseData {
  name: string;
  email: string;
  picture: string;
}

interface Props {
  decodedToken: { user_id: string };
}

interface State {
  editedName: string;
  isEditingName: boolean;
  databaseData: DatabaseData | null;
  showPictureUpload: boolean;
  profilePicture: File | null;
}

export class MyProfile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editedName: "",
      isEditingName: false,
      databaseData: null,
      showPictureUpload: false,
      profilePicture: null,
    };
  }

  componentDidMount() {
    this.readDataFromDatabase();
  }

  handleEditName = () => {
    const { databaseData } = this.state;
    if (databaseData) {
      this.setState({
        editedName: databaseData.name,
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
    this.setState({
      isEditingName: false,
    });
  };

  handleCancelEdit = () => {
    this.setState({
      isEditingName: false,
      editedName: "",
    });
  };

  handlePictureClick = () => {
    this.setState({ showPictureUpload: true });
  };

  handleClosePictureUpload = () => {
    this.setState({ showPictureUpload: false, profilePicture: null });
  };

  handlePictureChange = (e) => {
    if (e.target.files[0]) {
      this.setState({
        profilePicture: e.target.files[0],
      });
    }
  };

  handleSavePicture = () => {
    const { profilePicture } = this.state;
    const { decodedToken } = this.props;

    if (profilePicture && decodedToken) {
      const storageFileRef = storageRef(
        storage,
        `profilePictures/${decodedToken.user_id}`
      );
      uploadBytes(storageFileRef, profilePicture)
        .then(() => {
          console.log("Profile picture uploaded successfully");
          return getDownloadURL(storageFileRef);
        })
        .then((downloadURL) => {
          this.updatePictureInDatabase(downloadURL);
          this.setState({
            showPictureUpload: false,
            profilePicture: null,
          });
        })
        .catch((error) => {
          console.error("Error uploading profile picture:", error);
        });
    }
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
          this.setState((prevState: any) => ({
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

  updatePictureInDatabase = (downloadURL: string) => {
    const { decodedToken } = this.props;

    if (decodedToken) {
      const dbRef = ref(db);
      const userRef = child(dbRef, decodedToken.user_id);

      set(userRef, { ...this.state.databaseData, picture: downloadURL })
        .then(() => {
          console.log("Profile picture updated successfully in the database");
          this.setState((prevState: any) => ({
            databaseData: { ...prevState.databaseData, picture: downloadURL },
          }));
        })
        .catch((error) => {
          console.error(
            "Error updating profile picture in the database:",
            error
          );
        });
    } else {
      console.log("No decoded token available");
    }
  };

  render() {
    const { databaseData, isEditingName, editedName, showPictureUpload } =
      this.state;

    return (
      <div className="">
        <NavBar />
        <div className="main-myProfile">
          <div className="myprofile">
            <div className="profile-header">
              <h1>Hello!</h1>

              <p>
                {databaseData
                  ? "i am " +
                    databaseData.name +
                    ", creative Frontend Developer"
                  : "Loading..."}
              </p>
            </div>
            <div className="profile-grid">
              <div className="profile-aboutme">
                <h3>About Me</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                  ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
                  inventore qui ullam quasi ea dolore eligendi, neque
                  perspiciatis repellendus facilis eum fugiat id. Molestiae
                  deserunt rem dolorum fugiat natus qui!
                </p>
              </div>
              <div className="profile-picture">
                <img
                  src={databaseData ? databaseData.picture : Picture}
                  alt=""
                  className="profile-image"
                  onClick={this.handlePictureClick}
                />
              </div>

              <div className="profile-details">
                <h3>Details</h3>
                <div className="details">
                  <p className="details-headers">Name:</p>
                  {isEditingName ? (
                    <div>
                      <input
                        type="text"
                        value={editedName}
                        onChange={this.handleChangeName}
                      />
                      <CiCircleCheck
                        onClick={this.handleSaveName}
                        className="edit"
                      />
                      <CiCircleRemove
                        onClick={this.handleCancelEdit}
                        className="edit"
                      />
                    </div>
                  ) : (
                    <>
                      <p>
                        {databaseData ? databaseData.name : "exapmle name..."}
                      </p>
                      <CiEdit onClick={this.handleEditName} className="edit" />
                    </>
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

            <div className={showPictureUpload ? "upload-picture" : ""}>
              {showPictureUpload && (
                <div className="card-upload">
                  <CiCircleRemove
                    onClick={this.handleClosePictureUpload}
                    className="close-upload"
                  />
                  <div className="picture-upload-popup">
                    <img
                      src={databaseData ? databaseData.picture : Picture}
                      alt=""
                      className="popup-image"
                    />
                    <div className="inputs-upload">
                      <input
                        type="file"
                        onChange={this.handlePictureChange}
                        accept="image/*"
                      />
                      <div className="popup-buttons">
                        {/* <CiCircleCheck
                        onClick={this.handleSavePicture}
                        className="edit"
                      /> */}
                        <button onClick={this.handleSavePicture}>Upload</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  decodedToken: state.auth.decodedToken,
});

export default connect(mapStateToProps)(MyProfile);
