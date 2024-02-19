// GraphDetailsPage.js

import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import NavBar from "./NavBar";
import { IoArrowBackOutline } from "react-icons/io5";
import "./graphdetails.scss";

const GraphDetailsPage = ({ graphs }) => {
  const { id } = useParams();

  const graphData = graphs[id] || [];

  return (
    <div className="single-graph">
      <NavBar />
      <div className="back-arrow">
        <Link to="/home">
          <IoArrowBackOutline className="back-button" />
        </Link>
        <h3>{graphData.length > 0 && graphData[0].registered_state}</h3>
      </div>
      <div className="single-graph-container">
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
        <div className="chart">
          <p>Chart Data of company's</p>
          <Chart
            options={{
              chart: {
                id: `basic-bar-details`,
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
      </div>
      <div className="company-details">
        <h3>
          The Company's Master Data of{" "}
          {graphData.length > 0 && graphData[0].registered_state}
        </h3>
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

const mapStateToProps = (state) => ({
  graphs: state.graphs.graphs,
});

export default connect(mapStateToProps)(GraphDetailsPage);
