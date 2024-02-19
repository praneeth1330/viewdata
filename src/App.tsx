import React, { Component } from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Homepage from "./components/Homepage";
import GraphDetailsPage from "./components/GraphDetailsPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Dats from "./components/Dats";
import Homes from "./components/Homes";
import Graph from "./components/Graph";
// /graph-details/:id

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Homes />} />

            <Route path="/graph-details/:id" element={<Graph />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  }
}
