import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../redux/store";
import { fetchGraphs } from "../redux/action";

export class FilterData extends Component {
  state = {
    filteredData: [],
  };

  filter = [];

  //   componentDidMount({}): void {
  //     this.props.fetchGraphs();
  //   }

  render() {
    const { graphs } = this.props;
    console.log("graphs filter", graphs);
    // this.setState((predata) => {
    //   filteredData: graphs.map((graph) => graph.registered_state);
    // });

    this.filter = graphs.map((graph) => graph[0].registered_state);
    console.log("filter", this.filter);

    return (
      <div>
        <div className="dropdown">
          <select name="stateSelector" id="stateSelector">
            {this.filter.map((item, index) => (
              <>
                <option key={index} value={item}>
                  {item}
                </option>
              </>
            ))}
          </select>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterData);
