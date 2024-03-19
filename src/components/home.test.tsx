import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { thunk } from "redux-thunk";
import "@testing-library/jest-dom";
import "@testing-library/user-event";
// src/setupTests.ts

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe("Home component", () => {
  let store;

  const props = {
    loading: false,
    graphs: [
      [
        {
          registered_state: "California",
          company_name: "Company A",
          paidup_capital: 100,
        },
        {
          registered_state: "California",
          company_name: "Company B",
          paidup_capital: 200,
        },
      ],
      [
        {
          registered_state: "Texas",
          company_name: "Company C",
          paidup_capital: 300,
        },
        {
          registered_state: "Texas",
          company_name: "Company D",
          paidup_capital: 400,
        },
      ],
    ],
    fetchGraphs: jest.fn(),
    filteredGraphs: jest.fn(),
  };

  beforeEach(() => {
    store = mockStore({
      graphs: {
        graphs: props.graphs,
        loading: props.loading,
      },
    });
  });

  test("renders loading spinner when loading", async () => {
    const loadingProps = { ...props, loading: true };
    store = mockStore({
      graphs: {
        graphs: loadingProps.graphs,
        loading: loadingProps.loading,
      },
    });

    console.log("checking the Store", store);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const loadingSpinner = screen.getByRole("heading", { name: /Loading/i });
    expect(loadingSpinner).toBeInTheDocument();
  });
  // test("renders dropdown to select state", async () => {
  //   render(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <Home />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const dropdown = screen.getByRole("combobox");
  //   waitFor(() => expect(dropdown).toBeInTheDocument());
  //   // expect(dropdown).toBeInTheDocument();

  //   //   const options = screen.getAllByRole("option");
  //   //   expect(options).toHaveLength(props.graphs.length + 1); // +1 for the default option

  //   //   const defaultOption = options[0];
  //   //   expect(defaultOption).toHaveTextContent(/All Graphs Data/i);
  // });
});
