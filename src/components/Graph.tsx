import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import NavBar from "./NavBar";
import { IoArrowBackOutline } from "react-icons/io5";
import "./graphdetails.scss";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

interface GraphData {
  company_name: string;
  principal_business_activity_as_per_cin: string;
  authorized_cap: number;
  paidup_capital: number;
  company_class: string;
  company_status: string;
  registered_state: string;
}

interface RootState {
  graphs: {
    graphs: GraphData[][];
  };
}

interface RouteParams {
  id: string;
}

interface Props {
  graphs: GraphData[][];
}

const Graph: React.FC<Props> = ({ graphs }) => {
  const { id } = useParams<RouteParams>();

  const graphData = graphs[parseInt(id, 10)] || [];

  if (graphData.length === 0) {
    return <div>No data available</div>; // Render message if no data is found
  }

  return (
    <div className="single-graph">
      <NavBar />
      <div className="back">
        <Link to="/home">
          <MdOutlineArrowBackIosNew className="back-button" />
        </Link>
      </div>
      <div className="graph-text">
        <h3>{graphData[0].registered_state}</h3>
      </div>
      <div className="single-graph-container">
        <div className="chart">
          <p>Chart Data of company's</p>
          <Chart
            options={{
              chart: {
                id: `basic-bar-details`,

                // parentHeightOffset: 0,
              },

              xaxis: {
                categories: graphData.map((record) =>
                  record.company_name.slice(0, 10)
                ),
              },
            }}
            series={[
              {
                name: `series-details`,
                data: graphData.map((record) => record.paidup_capital),
              },
            ]}
            type="line"
            className="chart-data"
          />
        </div>
        <div className="table">
          <p>Tabular data of company's</p>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Business</th>
                <th>Capital</th>
                <th>Paid-up Capital</th>
                <th>Class</th>
                <th>Company Status</th>
              </tr>
            </thead>
            <tbody>
              {graphData.map((record, index) => (
                <tr key={index}>
                  <td>{record.company_name.slice(0, 10)}</td>
                  <td>{record.principal_business_activity_as_per_cin}</td>
                  <td>{record.authorized_cap}</td>
                  <td>{record.paidup_capital}</td>
                  <td>{record.company_class}</td>
                  <td>{record.company_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="company-details">
        <h3>The Company's Master Data of {graphData[0].registered_state}</h3>
        <div className="company-data">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            dolor temporibus cum repudiandae! Nesciunt reprehenderit obcaecati
            eaque architecto aspernatur dolores atque illum mollitia? Fugiat
            corporis praesentium pariatur illum nemo magni?
          </p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
          ducimus sapiente veritatis quaerat a doloremque cupiditate, voluptatum
          deleniti repellendus dicta. Praesentium iure labore placeat quas
          quibusdam dolor magnam veniam similique recusandae odio, ex magni
          nulla animi ab rem velit tempora officiis atque exercitationem
          numquam. Libero sequi ad necessitatibus distinctio vitae!
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
});

export default connect(mapStateToProps)(Graph);
