import React, { Component } from "react";
import "./loginRedesign.scss";
import Google from "../images/google.png";
import { FaApple } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import { storeDecodedToken } from "../redux/action";
import { connect } from "react-redux";
import { db } from "../config";
import { child, ref, set, get } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginPageState {
  signIn: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  accessToken: any;
  decode: any;
  databaseData: any;
  redirect: boolean;
}

export class LoginRedesign extends Component {
  state: LoginPageState = {
    signIn: true,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    accessToken: "",
    decode: {},
    databaseData: {},
    redirect: false,
  };

  cardChange = () => {
    this.setState((prevState) => ({
      signIn: !prevState.signIn,
    }));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    } as Pick<LoginPageState, keyof LoginPageState>);
  };

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

  handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        const accessToken = auth.currentUser.stsTokenManager.accessToken;
        this.setState({ accessToken });

        try {
          const decoded = jwtDecode(accessToken);
          this.setState({ decode: decoded });
          const isUserExists = this.readFromdatabase();

          if (!isUserExists) {
            this.writeToDataBase();
          }

          this.props.storeDecodedToken(decoded);
          this.setState({ redirect: true });
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.validateForm()) {
      console.log("Form is valid, ready to submit");
    } else {
      console.log("Form is invalid");
    }
  };

  writeToDataBase = () => {
    const { decode } = this.state;
    const dbRef = ref(db);
    const userRef = child(dbRef, decode.user_id);

    get(userRef).then((snapshot) => {
      if (!snapshot.exists()) {
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
        this.setState({ databaseData: userData });
        return true;
      } else {
        console.log("No data found");
        return false;
      }
    });
  };

  render() {
    const { signIn, email, password, emailError, passwordError, redirect } =
      this.state;
    if (redirect) {
      return <Navigate to="/home" />;
    }

    return (
      <div className="main_container">
        <div className="grid_container">
          <div className="grid-item-left">
            <div className="login-item">
              <div className="login-header">
                <h3>Welcome to ViewData</h3>
                <p>
                  Today is a new day. It's your day. You shape it. Sign-in to
                  start managing your projects.
                </p>
              </div>
              <div className="login-sso">
                <div className="google-sso">
                  <button onClick={this.handleGoogleSignIn}>
                    <img src={Google} alt="" width={15} />
                    Sign in with Google
                  </button>
                </div>
                <div className="apple-sso">
                  <Link to="/home">
                    <button>
                      <FaApple className="apple" /> Sign in with Apple
                    </button>
                  </Link>
                </div>
              </div>

              {/* <div className="or">
                <hr /> or <hr />
              </div> */}

              {/* <form className="Email-login" onSubmit={this.handleSubmit}>
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
                <p className="forget">Forgot Password</p>
                <button type="submit">Login</button>
              </form> */}
            </div>
          </div>
          <div className="grid-item-right"></div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeDecodedToken: (decodedToken) =>
      dispatch(storeDecodedToken(decodedToken)),
  };
};

export default connect(null, mapDispatchToProps)(LoginRedesign);
