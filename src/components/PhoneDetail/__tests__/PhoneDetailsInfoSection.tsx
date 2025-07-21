import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneDetailsInfoSection } from "../PhoneDetailsInfoSection/PhoneDetailsInfoSection";
import { mockPhoneDetails } from "@/__mocks__/mockPhoneData";
import { StorageOption } from "@/types/phone";

describe("PhoneDetailsInfoSection", () => {
    const setSelectedColor = jest.fn();
    const setSelectedStorage = jest.fn();
    const handleAddToCart = jest.fn();

    const baseProps = {
        phone: mockPhoneDetails,
        selectedColor: null,
        setSelectedColor,
        selectedStorage: null,
        setSelectedStorage,
        totalPrice: mockPhoneDetails.basePrice,
        handleAddToCart,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders phone title and base price", () => {
        render(<PhoneDetailsInfoSection {...baseProps} />);
        expect(
            screen.getByRole("heading", {
                name: /PIXELTECH PIXEL X20/,
            })
        ).toBeInTheDocument();

        expect(screen.getByText(`${mockPhoneDetails.basePrice} EUR`)).toBeInTheDocument();
    });

    it("renders all storage options", () => {
        render(<PhoneDetailsInfoSection {...baseProps} />);
        mockPhoneDetails.storageOptions.forEach((option) => {
            expect(screen.getByText(option.capacity)).toBeInTheDocument();
        });
    });

    it("renders all color options with correct aria-labels", () => {
        render(<PhoneDetailsInfoSection {...baseProps} />);
        mockPhoneDetails.colorOptions.forEach((color) => {
            expect(screen.getByLabelText(color.name)).toBeInTheDocument();
        });
    });

    it("calls setSelectedStorage when a storage option is clicked", () => {
        render(<PhoneDetailsInfoSection {...baseProps} />);
        const targetStorage: StorageOption = mockPhoneDetails.storageOptions[2];
        fireEvent.click(screen.getByText(targetStorage.capacity));
        expect(setSelectedStorage).toHaveBeenCalledWith(targetStorage);
    });

    it("calls setSelectedColor when a color swatch is clicked", () => {
        render(<PhoneDetailsInfoSection {...baseProps} />);
        fireEvent.click(screen.getByLabelText("Obsidian Black"));
        expect(setSelectedColor).toHaveBeenCalledWith("Obsidian Black");
    });

    it("disables Add to Cart button if no color or storage is selected", () => {
        render(<PhoneDetailsInfoSection {...baseProps} />);
        const button = screen.getByText("Añadir al carrito");
        expect(button).toBeDisabled();
    });

    it("enables Add to Cart button when both color and storage are selected", () => {
        render(
            <PhoneDetailsInfoSection
                {...baseProps}
                selectedColor="Glacier Blue"
                selectedStorage={mockPhoneDetails.storageOptions[1]}
            />
        );

        const button = screen.getByText("Añadir al carrito");
        expect(button).toBeEnabled();
    });

    it("calls handleAddToCart when button is clicked", () => {
        render(
            <PhoneDetailsInfoSection
                {...baseProps}
                selectedColor="Glacier Blue"
                selectedStorage={mockPhoneDetails.storageOptions[0]}
            />
        );

        fireEvent.click(screen.getByText("Añadir al carrito"));
        expect(handleAddToCart).toHaveBeenCalled();
    });
});
