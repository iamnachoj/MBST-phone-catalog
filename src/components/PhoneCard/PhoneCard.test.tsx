import React from "react";
import { render, screen } from "@testing-library/react";
import PhoneCard from "./PhoneCard";
import { mockPhone } from "@/__mocks__/mockPhoneData";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("PhoneCard", () => {
  it("renders phone image with correct alt text", () => {
    render(<PhoneCard phone={mockPhone} />);
    const img = screen.getByRole("img", {
      name: `${mockPhone.brand} ${mockPhone.name}`,
    });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPhone.imageUrl);
    expect(img).toHaveAttribute("loading", "lazy");
  });

  it("renders brand and name in uppercase", () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByText(mockPhone.brand.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(mockPhone.name.toUpperCase())).toBeInTheDocument();
  });

  it("renders base price correctly", () => {
    render(<PhoneCard phone={mockPhone} />);
    expect(screen.getByText(`${mockPhone.basePrice} EUR`)).toBeInTheDocument();
  });

  it("renders a link to the correct phone detail page", () => {
    render(<PhoneCard phone={mockPhone} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/phone/${mockPhone.id}`);
  });
});
