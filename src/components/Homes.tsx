import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchGraphs } from "../redux/action";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./home.scss";
import { RootState } from "../redux/store";
import { FaSpinner } from "react-icons/fa";

interface GraphData {
  company_name: string;
  paidup_capital: number;
  registered_state: string;
}

interface HomeProps {
  loading: boolean;
  graphs: GraphData[];
  fetchGraphs: () => void;
}

class Homes extends Component<HomeProps> {
  componentDidMount() {
    this.props.fetchGraphs();
  }

  shuffleColors = () => {
    const colors = ["#74E291", "#40A2E3", "#D04848", "#FDE767"];
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors;
  };

  render() {
    const { loading, graphs } = this.props;
    if (loading) {
      return (
        <div>
          <NavBar />
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <FaSpinner className="spinner" />{" "}
            {/* Render the loading circular icon */}
            <h1>Loading...</h1>
          </div>
        </div>
      );
    }

    return (
      <>
        <NavBar />
        <div className="graph-page">
          <h3>Displaying the data of the company's Annual Import</h3>

          <div className="chart-display ">
            {graphs.map((data, index) => (
              <div className="main-charts" key={index}>
                <Link
                  to={`/graph-details/${index}`}
                  state={{ graphData: data }}
                  style={{ textDecoration: "none" }}
                >
                  <div className="chart-home">
                    <Chart
                      options={{
                        chart: {
                          id: `basic-bar-${index}`,
                        },
                        xaxis: {
                          categories: data?.map((record: any) =>
                            record.company_name.slice(0, 5)
                          ),
                        },
                        colors: this.shuffleColors(),
                      }}
                      series={[
                        {
                          name: `series-${index}`,
                          data: data?.map(
                            (record: any) => record.paidup_capital
                          ),
                        },
                      ]}
                      type={Math.random() < 0.5 ? "line" : "bar"}
                    />
                  </div>
                  <h5 style={{ margin: 0 }}>
                    {[...new Set(data.map((state) => state.registered_state))]}
                  </h5>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
  loading: state.graphs.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchGraphs: () => dispatch(fetchGraphs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homes);
