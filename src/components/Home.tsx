import React, { Component } from "react";
import { connect } from "react-redux";
import { addGraphs } from "../redux/action";
import axios from "axios";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import "./home.scss";
import NavBar from "./NavBar";
import { fetchGraphs } from "../redux/action";

interface RootState {
  graphs: {
    graphs: any[];
  };
}

interface Props {
  graphs: any[];
  addGraphs: (graphs: any[]) => void;
}

class Home extends Component<Props> {
  state = {
    chartsData: [],
  };

  componentDidMount() {
    this.props.fetchGraphs();
  }

  async fetchDataFromApis() {
    const apiURLs = [
      "https://api.data.gov.in/resource/af3ce5b4-a469-4a0d-9e55-d2faa054afbd?api-key=579b464db66ec23bdd000001818659bdf1f54b0e51a76cec8f25aee7&format=json",
      "https://api.data.gov.in/resource/d69b405e-78ce-463e-bbcd-b177aadcc729?api-key=579b464db66ec23bdd000001818659bdf1f54b0e51a76cec8f25aee7&format=json",
      "https://api.data.gov.in/resource/04431104-6db3-4324-8a8b-5db3baa0a99d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/8c658b1c-8ee6-474c-9ac8-09e54df73479?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/a22c20cc-0bc0-44b2-a187-656dd3da3ebf?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/7cb9db7d-8241-45cb-9644-a048a0286602?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/a74d1f0f-ab3e-4d61-ad15-71c9233e7393?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/d06978c6-62c2-43a7-9876-1d6e0f30a8e2?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/36af6f80-af7a-4c94-83ec-b56e38ae384d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/36af6f80-af7a-4c94-83ec-b56e38ae384d?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
      "https://api.data.gov.in/resource/0d680b33-42d4-4591-a897-7cee09703966?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json",
    ];

    try {
      const responses = await Promise.all(apiURLs.map((url) => axios.get(url)));
      const chartsData = responses.map((response) => response.data.records);

      this.setState({
        chartsData: chartsData,
      });

      this.props.addGraphs(chartsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="graph-page">
          <h1>Displaying the data of the company's </h1>

          <div className="chart-display ">
            {this.state.chartsData.map((data, index) => (
              <div className="main-charts" key={index}>
                <Link
                  to={`/graph-details/${index}`}
                  state={{ graphData: data }}
                  style={{ textDecoration: "none" }}
                >
                  <h5>
                    {[
                      ...new Set(
                        data.map((state: any) => state.registered_state)
                      ),
                    ]}
                  </h5>{" "}
                  <div className="charts">
                    <Chart
                      options={{
                        chart: {
                          id: `basic-bar-${index}`,
                        },
                        xaxis: {
                          categories: data?.map((record: any) =>
                            record.company_name.slice(0, 10)
                          ),
                        },
                      }}
                      series={[
                        {
                          name: `series-${index}`,
                          data: data?.map(
                            (record: any) => record.paidup_capital
                          ),
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

const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
});

export default connect(mapStateToProps, { addGraphs })(Home);
