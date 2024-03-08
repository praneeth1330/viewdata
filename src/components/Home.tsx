import React, { Component, ChangeEvent } from "react";
import { connect } from "react-redux";
import { fetchGraphs, filteredGraphs } from "../redux/action"; // Importing Redux actions
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { RootState } from "../redux/store";
import { FaSpinner } from "react-icons/fa";
import "./home.scss";

// Define the props for the Home component
interface HomeProps {
  loading: boolean;
  graphs: GraphData[]; // Assuming GraphData is defined elsewhere
  fetchGraphs: () => void;
  filteredGraphs: (graphs: GraphData[]) => void;
}

// Define the state for the Home component
interface State {
  selectedState: string;
}

class Home extends Component<HomeProps, State> {
  state: State = {
    selectedState: "",
  };

  componentDidMount() {
    this.props.fetchGraphs(); // Fetch graphs data when component mounts
  }

  // Handler for state change in the dropdown
  handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    this.setState({ selectedState }, () => {
      this.filterGraphs(selectedState); // Filter graphs based on selected state
    });
  };

  // Filter graphs based on the selected state
  filterGraphs = (selectedState: string) => {
    const { graphs, filteredGraphs } = this.props;
    const filteredData = graphs.filter(
      (graph) => graph[0].registered_state === selectedState
    );
    filteredGraphs(filteredData); // Dispatch filtered graphs action
    console.log("store data", filteredData); // Log filtered data
  };

  // Function to shuffle colors randomly
  shuffleColors = () => {
    const colors = ["#1f943e", "#05387b", "#8e2424", "#fcdb1c"];
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return colors;
  };

  // const shuffleColors = Math.random() > 0.2 && Math.random() < 0.5 ? "#1f943e" :Math.random() >0.5 ? "#05387b" : "#8e2424";

  render() {
    const { loading, graphs } = this.props;
    const { selectedState } = this.state;

    // If data is still loading, displaying loading spinner
    if (loading) {
      return (
        <div>
          <NavBar />
          <div className="loader">
            <FaSpinner className="spinner" /> <h1>Loading...</h1>
          </div>
        </div>
      );
    }

    // Filtering graphs based on selected state
    const filteredGraphs = graphs.filter(
      (graph) => graph[0].registered_state === selectedState
    );
    const randomMap = Math.random() > 0.5 ? "line" : "bar";

    return (
      <>
        <NavBar />
        <div className="allmainGraphs">
          <div className="select">
            <h3>Displaying the data of the company's Annual Import</h3>
            <div className="select-dropdown">
              {/* Dropdown to select state */}
              <select
                name="stateSelector"
                id="stateSelector"
                value={selectedState}
                onChange={this.handleStateChange}
              >
                <option value="">All Graphs Data</option>
                {/* Mapping through all graphs to populate dropdown */}
                {graphs.map((graph, index) => (
                  <option key={index} value={graph[0].registered_state}>
                    {[...new Set(graph.map((state) => state.registered_state))]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="graph-page">
            <div className="chart-display">
              {/* Rendering filtered graphs */}
              {filteredGraphs.length > 0 ? (
                filteredGraphs.map((filteredGraph, index) => (
                  <div key={index} className="main-charts">
                    <Link
                      to={`/graph`}
                      state={{ graphData: filteredGraph }}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="chart-state">
                        {/* Rendering chart for each filtered graph */}
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
                            // colors: this.shuffleColors(),
                          }}
                          series={[
                            {
                              name: `series-${index}`,
                              data: filteredGraph.map(
                                (record) => record.paidup_capital
                              ),
                            },
                          ]}
                          type="bar"
                          className="single-chart"
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
                    {/* Rendering all graphs */}
                    {graphs.map((data, index) => {
                      const randomMap = Math.random() > 0.5 ? "line" : "bar";
                      // const shuffleColors = () => {
                      //   const colors = [
                      //     "#1f943e",
                      //     "#05387b",
                      //     "#8e2424",
                      //     "#fcdb1c",
                      //   ];
                      //   for (let i = colors.length - 1; i > 0; i--) {
                      //     const j = Math.floor(Math.random() * (i + 1));
                      //     [colors[i], colors[j]] = [colors[j], colors[i]];
                      //   }
                      //   return colors;
                      // };
                      const color =
                        Math.random() > 0.2 && Math.random() < 0.4
                          ? "#1f943e"
                          : Math.random() < 0.5 && Math.random() < 0.7
                          ? "#05387b"
                          : "#8e2424";

                      return (
                        <div className="main-charts" key={index}>
                          <Link
                            to={`/graph-details/${index}?mapType=${randomMap}&color=${encodeURIComponent(
                              color
                            )}`}
                            state={{ graphData: data }}
                            style={{ textDecoration: "none" }}
                          >
                            <div className="chart-home">
                              {/* Rendering chart for each graph */}
                              <Chart
                                options={{
                                  chart: {
                                    id: `basic-bar-${index}`,
                                    // foreColor: this.shuffleColors(),
                                  },
                                  xaxis: {
                                    categories: data?.map((record: any) =>
                                      record.company_name.slice(0, 5)
                                    ),
                                  },
                                  colors: [color],
                                }}
                                series={[
                                  {
                                    name: `series-${index}`,
                                    data: data?.map(
                                      (record: any) => record.paidup_capital
                                    ),
                                  },
                                ]}
                                type={randomMap}
                                className="chart-single"
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
                      );
                    })}
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

// Maping Redux state to component props
const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
  loading: state.graphs.loading,
});

// Maping Redux dispatch actions to component props
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchGraphs: () => dispatch(fetchGraphs()),
  filteredGraphs: (graphs: GraphData[]) => dispatch(filteredGraphs(graphs)), // Added dispatch for filtered graphs
});

// Connecting the component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(Home);
