import React, { Component } from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import Graph from "./components/Graph";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />

            <Route path="/graph-details/:id" element={<Graph />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}
