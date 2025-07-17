import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneDetails } from "../PhoneDetails";
import { mockPhoneDetails } from "@/__mocks__/mockPhoneData";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));
jest.mock("@/hooks/usePhoneSelection", () => ({
  usePhoneSelection: jest.fn(),
}));
jest.mock("@/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

function MockSimilarProducts() {
  return <div data-testid="similar-products" />;
}

function MockPhoneDetailsInfoSection(props: {
  handleAddToCart: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <div data-testid="info-section">
      <button onClick={props.handleAddToCart}>Add to Cart</button>
    </div>
  );
}

function MockSpecList() {
  return <div data-testid="spec-list" />;
}

jest.mock("@/components/SimilarProducts/SimilarProducts", () => ({
  __esModule: true,
  default: MockSimilarProducts,
}));

jest.mock(
    "@/components/PhoneDetail/PhoneDetailsInfoSection/PhoneDetailsInfoSection",
    () => ({
      __esModule: true,
      PhoneDetailsInfoSection: MockPhoneDetailsInfoSection,
    })
);

jest.mock("@/components/SpectList/SpecList", () => ({
  __esModule: true,
  SpecList: MockSpecList,
}));


import { usePhoneSelection } from "@/hooks/usePhoneSelection";
import { useCart } from "@/hooks/useCart";
import { redirect } from "next/navigation";

describe("PhoneDetails", () => {
  const addToCartMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePhoneSelection as jest.Mock).mockReturnValue({
      selectedColor: mockPhoneDetails.colorOptions[0].name,
      setSelectedColor: jest.fn(),
      selectedStorage: {
        label: mockPhoneDetails.storageOptions[1].capacity,
        price: mockPhoneDetails.storageOptions[1].price,
      },
      setSelectedStorage: jest.fn(),
      totalPrice: mockPhoneDetails.basePrice + mockPhoneDetails.storageOptions[1].price,
      selectedImage: mockPhoneDetails.colorOptions[0].imageUrl,
    });

    (useCart as jest.Mock).mockReturnValue({
      addToCart: addToCartMock,
    });
  });

  it("renders all main sections", () => {
    render(<PhoneDetails phone={mockPhoneDetails} />);

    expect(screen.getByRole("link", { name: /volver/i })).toBeInTheDocument();
    expect(screen.getByAltText(mockPhoneDetails.name)).toBeInTheDocument();
    expect(screen.getByTestId("info-section")).toBeInTheDocument();
    expect(screen.getByTestId("spec-list")).toBeInTheDocument();
    expect(screen.getByTestId("similar-products")).toBeInTheDocument();
  });

  it("adds to cart and redirects when valid color and storage are selected", () => {
    render(<PhoneDetails phone={mockPhoneDetails} />);
    fireEvent.click(screen.getByText("Add to Cart"));

    expect(addToCartMock).toHaveBeenCalledWith({
      id: mockPhoneDetails.id,
      brand: mockPhoneDetails.brand,
      name: mockPhoneDetails.name,
      imageUrl: mockPhoneDetails.colorOptions[0].imageUrl,
      color: mockPhoneDetails.colorOptions[0].name,
      storage: {
        label: mockPhoneDetails.storageOptions[1].capacity,
        price: mockPhoneDetails.storageOptions[1].price,
      },
      totalPrice: mockPhoneDetails.basePrice + mockPhoneDetails.storageOptions[1].price,
      basePrice: mockPhoneDetails.basePrice,
      quantity: 1,
    });

    expect(redirect).toHaveBeenCalledWith("/cart");
  });

  it("does not add to cart or redirect if no color/storage selected", () => {
    (usePhoneSelection as jest.Mock).mockReturnValueOnce({
      selectedColor: null,
      setSelectedColor: jest.fn(),
      selectedStorage: null,
      setSelectedStorage: jest.fn(),
      totalPrice: mockPhoneDetails.basePrice,
    });

    render(<PhoneDetails phone={mockPhoneDetails} />);
    fireEvent.click(screen.getByText("Add to Cart"));

    expect(addToCartMock).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
