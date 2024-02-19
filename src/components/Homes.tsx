// Home.js

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGraphs } from "../redux/action"; // Import fetchGraphs action creator
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./home.scss";

class Home extends Component {
  componentDidMount() {
    this.props.fetchGraphs(); // Dispatch action to fetch data
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="graph-page">
          <h1>Displaying the data of the company's </h1>

          <div className="chart-display ">
            {this.props.graphs.map((data, index) => (
              <div className="main-charts" key={index}>
                <Link
                  to={`/graph-details/${index}`}
                  state={{ graphData: data }}
                  style={{ textDecoration: "none" }}
                >
                  <h5>
                    {[...new Set(data.map((state) => state.registered_state))]}
                  </h5>{" "}
                  <div className="charts">
                    <Chart
                      options={{
                        chart: {
                          id: `basic-bar-${index}`,
                        },
                        xaxis: {
                          categories: data?.map((record) =>
                            record.company_name.slice(0, 10)
                          ),
                        },
                      }}
                      series={[
                        {
                          name: `series-${index}`,
                          data: data?.map((record) => record.paidup_capital),
                        },
                      ]}
                      type="line"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  graphs: state.graphs.graphs,
});

export default connect(mapStateToProps, { fetchGraphs })(Home);
