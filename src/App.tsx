import React, { Component } from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import Graph from "./components/Graph";
import NewGraph from "./components/NewGraph";
import MyProfile from "./components/MyProfile";
import NewProfile from "./components/NewProfile";
import MyProfileNew from "./components/MyProfileNew";
import MyNewprofile from "./components/MyNewprofile";
import NewLogin from "./components/NewLogin";
import LoginRedesign from "./components/LoginRedesign";
import NavBar from "./components/NavBar";
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <NavBar /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginRedesign />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<MyNewprofile />} />
            <Route path="/graph" element={<NewGraph />} />
            <Route
              path="/graph-details/:id"
              element={<Graph randomMap={""} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}
