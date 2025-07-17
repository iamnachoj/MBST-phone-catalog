import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        mockOnSearch.mockClear();
    });

    it("renders input with placeholder and default value", () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText("Buscar por marca o modelo...") as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input.value).toBe("");
    });

    it("renders with initial value", () => {
        render(<SearchBar onSearch={mockOnSearch} initialValue="Toyota" />);

        const input = screen.getByPlaceholderText("Buscar por marca o modelo...") as HTMLInputElement;
        expect(input.value).toBe("Toyota");
    });

    it("calls onSearch when input changes", () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText("Buscar por marca o modelo...");

        fireEvent.change(input, { target: { value: "Civic" } });

        expect(mockOnSearch).toHaveBeenCalledWith("Civic");
        expect((input as HTMLInputElement).value).toBe("Civic");
    });

    it("has accessible aria-label", () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByLabelText("Buscar");
        expect(input).toBeInTheDocument();
    });
});
