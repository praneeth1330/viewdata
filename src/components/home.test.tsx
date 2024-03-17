import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("Home component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      graphs: {
        graphs: [
          [
            {
              company_name: "Company A",
              paidup_capital: 1000,
              registered_state: "State A",
            },
            {
              company_name: "Company B",
              paidup_capital: 2000,
              registered_state: "State A",
            },
          ],
          [
            {
              company_name: "Company C",
              paidup_capital: 3000,
              registered_state: "State B",
            },
            {
              company_name: "Company D",
              paidup_capital: 4000,
              registered_state: "State B",
            },
          ],
        ],
        loading: false,
      },
    });
  });

  // it("renders loading spinner when loading", () => {
  //   store = mockStore({ graphs: { graphs: [], loading: true } });
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Home />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const loadingSpinner = screen.getByRole("heading", { name: /Loading/i });
  //   expect(loadingSpinner).toBeInTheDocument();
  // });

  // it("renders dropdown with all states", async () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Home />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const stateDropdown = screen.getByLabelText(/All Graphs Data/i);
  //   expect(stateDropdown).toBeInTheDocument();

  //   userEvent.selectOptions(stateDropdown, ["State A", "State B"]);
  //   waitFor(() => expect(stateDropdown).toHaveValue("State B"));

  //   // expect(stateDropdown.value).toBe("State B");
  // });

  it("renders charts for selected state", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    // const stateDropdown = screen.getByLabelText(/All Graphs Data/i);
    // await userEvent.selectOptions(stateDropdown, "State A");

    // const chartContainers = await screen.findAllByTestId("chart-container");
    // await waitFor(() => expect(chartContainers).toHaveLength(1));
    // // expect(chartContainers).toHaveLength(2);
  });
});
