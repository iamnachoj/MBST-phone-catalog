import React from "react";
import { render, screen } from "@testing-library/react";
import SimilarProducts from "./SimilarProducts";
import { mockSimilarProducts } from "@/__mocks__/mockPhoneData";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("SimilarProducts", () => {
  it("renders nothing if similarProducts is empty", () => {
    const { container } = render(<SimilarProducts similarProducts={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders heading and product cards", () => {
    render(<SimilarProducts similarProducts={mockSimilarProducts} />);
    expect(
      screen.getByRole("heading", { name: /PRODUCTOS SIMILARES/i }),
    ).toBeInTheDocument();

    mockSimilarProducts.forEach((product) => {
      expect(
        screen.getByText(`${product.brand} ${product.name}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`${product.basePrice} €`)).toBeInTheDocument();
      expect(screen.getByRole("img", { name: product.name })).toHaveAttribute(
        "src",
        product.imageUrl,
      );
    });
  });

  it("renders links to each similar product", () => {
    render(<SimilarProducts similarProducts={mockSimilarProducts} />);
    mockSimilarProducts.forEach((product) => {
      const link = screen.getByText(`${product.brand} ${product.name}`);
      expect(link.closest("a")).toHaveAttribute("href", `/phone/${product.id}`);
    });
  });
});
