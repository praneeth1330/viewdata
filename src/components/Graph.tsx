import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Chart, { ApexChartType } from "react-apexcharts";
import NavBar from "./NavBar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./graph.scss";

// Define types for graph data
interface GraphData {
  company_name: string;
  principal_business_activity_as_per_cin: string;
  authorized_cap: number;
  paidup_capital: number;
  company_class: string;
  company_status: string;
  registered_state: string;
}
//  RootState interface for Redux store
interface RootState {
  graphs: {
    graphs: GraphData[][];
  };
}
// RouteParams interface for URL parameters
interface RouteParams {
  id: string;
}

interface Props {
  graphs: GraphData[][];
  randomMap: string;
}

type IChartType = "line" | "bar";

// Functional component for displaying graph details
const Graph: React.FC<Props> = ({ graphs }) => {
  //Geting Url parameter
  const { id } = useParams<RouteParams>();
  const [searchParams] = useSearchParams();
  const mapType = searchParams.get("mapType");
  const [searchColor] = useSearchParams();
  const color = searchColor.get("color");
  const decoded = decodeURIComponent(color);

  console.log(mapType);
  console.log("color", decoded);

  // State variables for sorting
  const [sortColumn, setSortColumn] = useState<keyof GraphData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  //Getting graph data based on URL parameter
  const graphData = graphs[parseInt(id)] || [];

  console.log("all graphs page", graphData);

  if (graphData.length === 0) {
    return <div>No data available</div>;
  }

  // Function to handle sorting
  const sortBy = (key: keyof GraphData) => {
    if (sortColumn === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc");
    }
  };

  // Sort graph data based on column and order
  const sortedGraphData = graphData.slice().sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Function to download table data
  const downloadTableData = () => {
    // Convert data to CSV format
    const csvContent =
      "data:text/csv;charset=utf-8," +
      sortedGraphData.map((row) => Object.values(row).join(",")).join("\n");
    // Create a download link and trigger click event
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "graph_data.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  // Rendering graph component
  return (
    <div className="single-graph">
      <NavBar />
      <div className="graph-details-page">
        {/* Back button */}
        <div className="back">
          <Link to="/home">
            <MdOutlineArrowBackIosNew className="back-button" />
          </Link>
        </div>
        {/* Graph title */}
        <div className="graph-text">
          <h3>{graphData[0].registered_state}</h3>
        </div>
        <div className="single-graph-container">
          <div className="chart">
            <p>Chart Data of company's</p>

            {/*Rendering charts based on the sorting   */}
            <Chart
              options={{
                chart: {
                  id: `basic-bar-details`,
                },
                xaxis: {
                  categories: sortedGraphData.map((record) =>
                    record.company_name.slice(0, 10)
                  ),
                },
                colors: [color],
              }}
              series={[
                {
                  name: `series-details`,
                  data: sortedGraphData.map((record) => record.paidup_capital),
                },
              ]}
              type={mapType as IChartType}
              className="chart-data"
            />
          </div>
          {/* Table for graph data */}
          <div className="table">
            <p>Tabular data of company's</p>
            <button onClick={downloadTableData}>Download Table Data</button>
            <table>
              <thead>
                <tr>
                  {/* Table headers with sorting functionality */}
                  <th onClick={() => sortBy("company_name")}>
                    Company Name{" "}
                    {sortColumn === "company_name" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() =>
                      sortBy("principal_business_activity_as_per_cin")
                    }
                  >
                    Business{" "}
                    {sortColumn === "principal_business_activity_as_per_cin" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("authorized_cap")}>
                    Capital{" "}
                    {sortColumn === "authorized_cap" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("paidup_capital")}>
                    Paid-up Capital{" "}
                    {sortColumn === "paidup_capital" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("company_class")}>
                    Class{" "}
                    {sortColumn === "company_class" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("company_status")}>
                    Company Status{" "}
                    {sortColumn === "company_status" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedGraphData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.company_name.slice(0, 10)}</td>
                    <td>{record.principal_business_activity_as_per_cin}</td>
                    <td>{record.authorized_cap}</td>
                    <td>{record.paidup_capital}</td>
                    <td>{record.company_class}</td>
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
              The Company's Master Data of {graphData[0].registered_state}
            </h3>
            <div className="company-data">
              <p>
                Our charting tool offers a user-friendly interface, making data
                visualization effortless. <br /> Customize your charts with
                various colors, styles, and data points to suit your needs.{" "}
                <br />
                Easily import your data sets and generate insightful visuals in
                minutes. <br /> Explore trends, patterns, and correlations with
                our comprehensive range of chart types. <br /> Gain a deeper
                understanding of your data through interactive features like
                zooming and filtering. <br /> Collaborate with team members by
                sharing and exporting your charts seamlessly. <br /> Our charts
                are responsive and compatible across multiple devices for
                convenience. <br /> Stay up-to-date with real-time data updates,
                ensuring your visuals reflect the latest information. <br />{" "}
                Access advanced analytics tools to enhance your charting
                experience and uncover actionable insights. <br /> Whether
                you're a beginner or a seasoned analyst, our charting platform
                caters to all skill levels, empowering you to make informed
                decisions
              </p>
              <p className="paragraph">{/* Truncated for brevity */}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Maping Redux dispatch actions to component props
const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
});
// Connecting the component to Redux store
export default connect(mapStateToProps)(Graph);
