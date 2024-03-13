import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";

describe("NavBar", () => {
  test("renders learn react link", () => {
    const mockStore = configureStore([]);
    const initialState = {
      auth: {
        decodedToken: null,
      },
      graphs: {
        graphs: [],
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
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});
