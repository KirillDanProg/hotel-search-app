import {act, getByText, queryByLabelText, screen} from "@testing-library/react";
import App from "../App";
import {renderWithProviders} from "./renderWithProveder";
import {loginSlice} from "../features/login/loginSlice";
import {scryRenderedComponentsWithType} from "react-dom/test-utils";

describe("App component", () => {
    it("should render login page", async () => {
        renderWithProviders(<App/>)
        await screen.queryByLabelText(/Login/i)
        screen.debug()
        // expect(screen.queryByLabelText(/Login/i)).toBeInTheDocument()
    })
})
