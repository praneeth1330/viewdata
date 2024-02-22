import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchGraphs } from "../redux/action";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
// import "./home.scss";
import { RootState } from "../redux/store";
import { FaSpinner } from "react-icons/fa";

import "./newhome.scss";

interface HomeProps {
  loading: boolean;
  graphs: GraphData[];
  fetchGraphs: () => void;
}

interface State {
  selectedState: string;
}

class Home extends Component<HomeProps, State> {
  state: State = {
    selectedState: "",
  };

  componentDidMount() {
    this.props.fetchGraphs();
  }

  handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedState: event.target.value });
  };

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
    const { selectedState } = this.state;

    console.log("selected", selectedState);

    if (loading) {
      return (
        <div>
          <NavBar />
          <div
            className="loader"
            // style={{ textAlign: "center", marginTop: "50px" }}
          >
            <FaSpinner className="spinner" /> <h1>Loading...</h1>
          </div>
        </div>
      );
    }

    const filteredGraphs = graphs.filter(
      (graph) => graph[0].registered_state === selectedState
    );

    return (
      <>
        <NavBar />

        <div className="allmainGraphs">
          <div className="select">
            <h3>Displaying the data of the company's Annual Import</h3>
            <div className="select-dropdown">
              <select
                name="stateSelector"
                id="stateSelector"
                value={selectedState}
                onChange={this.handleStateChange}
              >
                <option value="">Select a state</option>
                {graphs.map((graph, index) => (
                  <option key={index} value={graph[0].registered_state}>
                    {graph[0].registered_state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="graph-page">
            <div className="chart-display">
              {filteredGraphs.length > 0 ? (
                filteredGraphs.map((filteredGraph, index) => (
                  <div key={index} className="main-charts">
                    <Link
                      to={`/graph-details/${index}`}
                      state={{ graphData: filteredGraph }}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="chart-state">
                        <Chart
                          options={{
                            chart: {
                              id: `basic-bar-${index}`,
                            },
                            xaxis: {
                              categories: filteredGraph.map((record) =>
                                record.company_name.slice(0, 5)
                              ),
                            },
                            colors: this.shuffleColors(),
                          }}
                          series={[
                            {
                              name: `series-${index}`,
                              data: filteredGraph.map(
                                (record) => record.paidup_capital
                              ),
                            },
                          ]}
                          type={Math.random() < 0.5 ? "line" : "bar"}
                          // width={700}
                          class="single-chart"
                        />
                      </div>
                      <h5 style={{ margin: 0 }}>
                        {filteredGraph[0].registered_state}
                      </h5>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="allgraphs">
                  <div className="graphs-select">
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
                                  foreColor: this.shuffleColors(),
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
                              class="chart-single"
                            />
                          </div>
                          <h5 style={{ margin: 0 }}>
                            {[
                              ...new Set(
                                data.map((state) => state.registered_state)
                              ),
                            ]}
                          </h5>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
