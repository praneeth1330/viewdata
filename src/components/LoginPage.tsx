import React, { Component } from "react";
import { Link } from "react-router-dom"; // Import withRouter
import { writeData } from "../config";

// Importing images
import logo from "../images/logo.png";
import graph from "../images/graph.png";

// Importing dependencies
import { jwtDecode } from "jwt-decode";
import { IoCloseOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import "./login.scss";

// Importing Firebase authentication and configuration
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";

// Importing Redux related functionalities
import { storeDecodedToken } from "../redux/action";
import { connect } from "react-redux";

import { db } from "../config";
import { child, ref, set, get } from "firebase/database";

// Defining state interface for LoginPage component
interface LoginPageState {
  signIn: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  value: any;
  accessToken: any;
  decode: any;
  databaseData: any;
}

// LoginPage component
export class LoginPage extends Component<{}, LoginPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      signIn: true,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      value: "",
      accessToken: "",
      decode: {},
      databaseData: {},
    };
  }

  // Function to switch between sign-in methods
  cardChange = () => {
    this.setState((prevState) => ({
      signIn: !prevState.signIn,
    }));
  };

  // Function to handle input changes
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as Pick<LoginPageState, keyof LoginPageState>);
  };

  // Function to validate form inputs
  validateForm = () => {
    let isValid = true;
    const { email, password } = this.state;

    if (!email || !email.includes("@")) {
      isValid = false;
      this.setState({ emailError: "Please enter a valid email address" });
    } else {
      this.setState({ emailError: "" });
    }

    if (!password || password.length < 6) {
      isValid = false;
      this.setState({
        passwordError: "Password must be at least 6 characters long",
      });
    } else {
      this.setState({ passwordError: "" });
    }

    return isValid;
  };

  // componentDidMount(): void {
  //   this.readFromdatabase();
  // }
  // Function to handle Google sign-in
  handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        const accessToken = auth.currentUser.stsTokenManager.accessToken;
        console.log("accesstoken", accessToken);
        // Update the component state with the access token
        this.setState({ accessToken });

        try {
          const decoded = jwtDecode(accessToken);
          this.setState({ decode: decoded });
          const isUserExists = this.readFromdatabase();
          // this.readFromdatabase();

          if (!isUserExists) {
            this.writeToDataBase();
          } else {
            console.log("user already exists in the database");
          }
          this.props.storeDecodedToken(decoded);
          console.log("decoded token", decoded);
          console.log("decode token", this.state.decode.user_id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  // Function to handle form submission
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.validateForm()) {
      console.log("Form is valid, ready to submit");
    } else {
      console.log("Form is invalid");
    }
  };

  // write to database

  writeToDataBase = () => {
    const { decode } = this.state;

    const dbRef = ref(db);
    const userRef = child(dbRef, decode.user_id);

    get(userRef).then((snapshot) => {
      if (!snapshot.exists()) {
        // If user data doesn't exist, write to the database
        set(userRef, {
          name: decode.name,
          email: decode.email,
          picture: decode.picture,
          user_id: decode.user_id,
        })
          .then(() => {
            console.log("Data written to the database");
          })
          .catch((error) => {
            console.error("Error writing data to the database:", error);
          });
      } else {
        console.log("Data already exists in the database");
      }
    });
  };

  readFromdatabase = (): boolean => {
    const dbRef = ref(db);
    const userRef = child(dbRef, this.state.decode.user_id);

    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("data", snapshot.val());
        this.setState({ databaseData: userData });
        console.log(
          "databaseData login page ",
          this.state.databaseData.user_id
        );
        return true;
      } else {
        console.log("No data found");
        return false;
      }
    });
  };

  render() {
    const { signIn, email, password, emailError, passwordError } = this.state;

    return (
      <div className="signup-container">
        {/* Left side of the page */}
        <div className="signup-left-container">
          <div className="uper-text">
            <div className="header-txt">
              <h1>Welcome to </h1>
              <img src={logo} alt="" />
            </div>

            <p className="lorem">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas
              beatae minima. Non minima itaque exercitationem ut possimus
              molestias suscipit consequatur consequuntur, nisi perspiciatis
              pariatur! Amet id quam ipsum deserunt!
            </p>
            <h3>Please sign in to continue </h3>
            <p>By Signing you will access best features</p>
          </div>

          <div className="card">
            {/* Conditionally rendering sign-in methods */}
            {signIn ? (
              <div className="cards-login">
                <div className="login-sso">
                  <div className="signin ">
                    <button onClick={this.handleGoogleSignIn}>
                      <FaGoogle className="sso-icon" />
                      Sign in with Google
                    </button>
                  </div>

                  <div className="signin">
                    <Link to="/home">
                      <button>
                        <BsApple className="sso-icon" />
                        Sign in with Apple
                      </button>
                    </Link>
                  </div>

                  <div className="signin">
                    <button onClick={this.cardChange}>
                      <MdEmail className="sso-icon" />
                      Sign in with Email{" "}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="signin-email">
                {/* Form for email sign-in */}
                <div className="cross-button">
                  <IoCloseOutline
                    className="backarrow-login"
                    onClick={this.cardChange}
                  />
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.handleInputChange}
                    />
                    <div className="error" style={{ color: "red" }}>
                      {emailError}
                    </div>
                  </div>
                  <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                    <div className="error" style={{ color: "red" }}>
                      {passwordError}
                    </div>
                  </div>

                  <div className="signin-btn">
                    <button type="submit">Sign In</button>
                  </div>
                </form>
                <div className="remember-forgot">
                  <div className="remember-me">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                    />
                    <label htmlFor="remember-me">Remember Me</label>
                  </div>
                  <p>Forgot password</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side of the page */}
        <div className="signup-right-container">
          <div className="left-text">
            <h2>Simplest way to view your data</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              obcaecati sequi perspiciatis inventore
            </p>
          </div>
          <div className="left-image">
            <img src={graph} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

// Mapping dispatch to props for accessing storeDecodedToken action
const mapDispatchToProps = (dispatch) => {
  return {
    storeDecodedToken: (decodedToken) =>
      dispatch(storeDecodedToken(decodedToken)),
  };
};

// Connecting LoginPage component to Redux store
export default connect(null, mapDispatchToProps)(LoginPage);
