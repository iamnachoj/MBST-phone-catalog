import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

// Mock next/link to render children directly (simple mock)
jest.mock("next/link", () => {
    // eslint-disable-next-line react/display-name
    return ({ children, href, ...props }: any) => (
        <a href={href} {...props}>
            {children}
        </a>
    );
});

jest.mock("@/hooks/useCart", () => ({
    useCart: jest.fn(),
}));

import { useCart } from "@/hooks/useCart";

describe("Navbar", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders logo link with image", () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [],
            loaded: false,
        });

        render(<Navbar />);
        const logoLink = screen.getByRole("link", { name: /logo: mbst/i });
        expect(logoLink).toBeInTheDocument();
        expect(screen.getByAltText("Logo")).toBeInTheDocument();
    });

    it("renders cart link with image", () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [],
            loaded: false,
        });

        render(<Navbar />);
        const cartLink = screen.getByRole("link", { name: /shooping cart/i });
        expect(cartLink).toBeInTheDocument();
        expect(screen.getByAltText("Cart")).toBeInTheDocument();
    });

    it("does not render item count if cart is not loaded", () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [{ quantity: 3 }],
            loaded: false,
        });

        render(<Navbar />);
        expect(screen.queryByText("3")).not.toBeInTheDocument();
    });

    it("renders correct item count when loaded", () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [
                { quantity: 2 },
                { quantity: 5 },
            ],
            loaded: true,
        });

        render(<Navbar />);
        const quantitySpan = screen.getByText("7");
        expect(quantitySpan).toBeInTheDocument();
        expect(quantitySpan).toHaveAttribute("aria-label", "item quantity in the cart: 7");
    });

    it("handles empty cart with loaded true", () => {
        (useCart as jest.Mock).mockReturnValue({
            cart: [],
            loaded: true,
        });

        render(<Navbar />);
        expect(screen.getByText("0")).toBeInTheDocument();
    });
});
