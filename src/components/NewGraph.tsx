import React, { Component, MouseEvent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./graph.scss";
import { filteredGraphs } from "../redux/action";
import NavBar from "./NavBar";

// Define props and state interfaces
interface GraphProps {
  filteredGraphs: any[]; // Define your graph data structure here
}

interface GraphState {
  sortColumn: string | null;
  sortDirection: string;
}

// Class component for displaying new graph details
class NewGraph extends Component<GraphProps, GraphState> {
  constructor(props: GraphProps) {
    super(props);
    // Initialize state
    this.state = {
      sortColumn: null,
      sortDirection: "asc",
    };
  }

  // Function to handle sorting
  handleSort = (column: string) => {
    this.setState((prevState) => ({
      sortColumn: column,
      sortDirection:
        prevState.sortColumn === column && prevState.sortDirection === "asc"
          ? "desc"
          : "asc",
    }));
  };

  render() {
    // Destructure props and state
    const { filteredGraphs } = this.props;
    const { sortColumn, sortDirection } = this.state;

    // Log filtered graph data
    console.log("newdata of filter ", filteredGraphs);

    // Return if no data available
    if (!filteredGraphs || filteredGraphs.length === 0) {
      return <div>No data available</div>;
    }

    // Sort graph data based on column and direction
    const sortedGraphs = [...filteredGraphs].sort((a, b) => {
      if (sortColumn) {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });

    // Render new graph component
    return (
      <div className="single-graph">
        <NavBar />
        <div className="graph-details-page">
          <div className="back">
            <Link to="/home">
              <MdOutlineArrowBackIosNew className="back-button" />
            </Link>
          </div>
          <div className="graph-text">
            <h3>{filteredGraphs[0]?.registered_state}</h3>
          </div>
          <div className="single-graph-container">
            <div className="chart">
              <p>Chart Data of company's</p>
              {/* Chart component */}
              <Chart
                options={{
                  chart: {
                    id: `basic-bar-details`,
                  },
                  xaxis: {
                    categories: sortedGraphs?.map((record) =>
                      record?.company_name.slice(0, 5)
                    ),
                  },
                }}
                series={[
                  {
                    name: `series-details`,
                    data: sortedGraphs?.map((record) => record?.paidup_capital),
                  },
                ]}
                type="bar"
                className="chart-data"
              />
            </div>
            <div className="table">
              <p>Tabular data of company's</p>
              {/* Table of graph data */}
              <table>
                <thead>
                  <tr>
                    {/* Table headers with sorting functionality */}
                    <th onClick={() => this.handleSort("company_name")}>
                      Company Name{" "}
                      {sortColumn === "company_name" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th
                      onClick={() =>
                        this.handleSort(
                          "principal_business_activity_as_per_cin"
                        )
                      }
                    >
                      Business{" "}
                      {sortColumn ===
                        "principal_business_activity_as_per_cin" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => this.handleSort("authorized_cap")}>
                      Capital{" "}
                      {sortColumn === "authorized_cap" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => this.handleSort("paidup_capital")}>
                      Paid-up Capital{" "}
                      {sortColumn === "paidup_capital" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => this.handleSort("company_class")}>
                      Class{" "}
                      {sortColumn === "company_class" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                    <th onClick={() => this.handleSort("company_status")}>
                      Company Status{" "}
                      {sortColumn === "company_status" &&
                        (sortDirection === "asc" ? "▲" : "▼")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render sorted graph data */}
                  {sortedGraphs.map((record, index) => (
                    <tr key={index}>
                      <td>{record?.company_name.slice(0, 10)}</td>
                      <td>{record?.principal_business_activity_as_per_cin}</td>
                      <td>{record?.authorized_cap}</td>
                      <td>{record?.paidup_capital}</td>
                      <td>{record?.company_class}</td>
                      {/* Highlight active/inactive status */}
                      <td
                        className={
                          record.company_status === "ACTV" ||
                          record.company_status === "Active"
                            ? "active"
                            : "inactive"
                        }
                      >
                        {record.company_status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="company-details">
              <h3>
                The Company's Master Data of{" "}
                {filteredGraphs[0].registered_state}
              </h3>
              <div className="company-data">
                {/* Long text content */}
                <p>
                  Our charting tool offers a user-friendly interface, making
                  data visualization effortless. <br /> Customize your charts
                  with various colors, styles, and data points to suit your
                  needs. <br />
                  Easily import your data sets and generate insightful visuals
                  in minutes. <br /> Explore trends, patterns, and correlations
                  with our comprehensive range of chart types. <br /> Gain a
                  deeper understanding of your data through interactive features
                  like zooming and filtering. <br /> Collaborate with team
                  members by sharing and exporting your charts seamlessly.{" "}
                  <br /> Our charts are responsive and compatible across
                  multiple devices for convenience. <br /> Stay up-to-date with
                  real-time data updates, ensuring your visuals reflect the
                  latest information. <br /> Access advanced analytics tools to
                  enhance your charting experience and uncover actionable
                  insights. <br /> Whether you're a beginner or a seasoned
                  analyst, our charting platform caters to all skill levels,
                  empowering you to make informed decisions
                </p>
                <p className="paragraph">lorem1000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Map state to component props
const mapStateToProps = (state: any) => ({
  filteredGraphs: state.singleGraph.filteredGraphs.flat(),
});

// Connect component to Redux store
export default connect(mapStateToProps)(NewGraph);
