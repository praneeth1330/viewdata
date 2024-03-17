import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "./NavBar";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  test("redirects to new page with clicked state data", () => {
    const mockStore = configureStore([]);
    const initialState = {
      auth: {
        decodedToken: null,
      },
      graphs: {
        graphs: [
          {
            id: 1,
            registered_state: "California",
            description: "Description for California",
          },
          {
            id: 2,
            registered_state: "New York",
            description: "Description for New York",
          },
          {
            id: 3,
            registered_state: "Texas",
            description: "Description for Texas",
          },
        ],
      },
    };
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>
    );
    //checking the rendering of input component
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();

    // Simulating  typing in the search input
    fireEvent.change(inputElement, { target: { value: "Cal" } });

    // Waiting for the search recommendations to render
    waitFor(() => {
      const suggestionElement = screen.getByText("California");
      expect(suggestionElement).toBeInTheDocument();

      // Simulateing click on the suggestion
      fireEvent.click(suggestionElement);
    });

    // Waiting for the user to be redirected to the correct page
    // Verifying if the user is redirected to the correct page
    waitFor(() => {
      expect(window.location.href).toBe("http://localhost/graph");
    });
  });
});
