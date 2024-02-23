import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";
import graph from "../images/graph.png";

import { IoCloseOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import "./login.scss";

interface LoginPageState {
  signIn: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
}

export class LoginPage extends Component<{}, LoginPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      signIn: true,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  cardChange = () => {
    this.setState((prevState) => ({
      signIn: !prevState.signIn,
    }));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.validateForm()) {
      // Form is valid, you can proceed with sign-in logic here
      console.log("Form is valid, ready to submit");
    } else {
      console.log("Form is invalid");
    }
  };

  render() {
    const { signIn, email, password, emailError, passwordError } = this.state;

    return (
      <div className="signup-container">
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
            {signIn ? (
              <div className="cards-login">
                <div className="login-sso">
                  <Link to="/home" className="signin">
                    <h3>Sign in with Apple</h3>
                    <BsApple className="sso-icon" />
                  </Link>
                  <Link to="/home" className="signin">
                    <h3>Sign in with Google</h3>
                    <FaGoogle className="sso-icon" />
                  </Link>

                  <div className="signin">
                    <h3 onClick={this.cardChange}>Sign in with Email </h3>

                    <MdEmail className="sso-icon" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="signin-email">
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

export default LoginPage;
