import React from "react";
import { render, waitFor } from "@testing-library/react";
import { CartProvider, CartContext } from "@/context/CartContext";
import { CartItem } from "@/types/cart";

const mockCart: CartItem[] = [
    {
        id: "1",
        brand: "TestBrand",
        name: "TestPhone",
        basePrice: 500,
        color: "Black",
        storage: { capacity: "128GB", price: 0 },
        quantity: 1,
        totalPrice: 500,
        imageUrl: "/test.jpg",
    },
];

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value;
        }),
        clear: jest.fn(() => {
            store = {};
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
});

describe("CartProvider", () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    it("loads cart from localStorage and sets loaded to true", async () => {
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(mockCart));

        let contextValue: any;
        function TestComponent() {
            contextValue = React.useContext(CartContext);
            return <div>Test</div>;
        }

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await waitFor(() => {
            expect(contextValue).toBeDefined();
            expect(contextValue.cart).toEqual(mockCart);
            expect(contextValue.loaded).toBe(true);
        });
    });

    it("sets empty cart and loaded true if no localStorage data", async () => {
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

        let contextValue: any;
        function TestComponent() {
            contextValue = React.useContext(CartContext);
            return <div>Test</div>;
        }

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        await waitFor(() => {
            expect(contextValue.cart).toEqual([]);
            expect(contextValue.loaded).toBe(true);
        });
    });

    it("saves cart to localStorage when cart changes and loaded is true", async () => {
        (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

        let contextValue: any;
        function TestComponent() {
            contextValue = React.useContext(CartContext);
            return (
                <button
                    onClick={() =>
                        contextValue.setCart([
                            ...contextValue.cart,
                            {
                                id: "2",
                                brand: "Brand2",
                                name: "Phone2",
                                basePrice: 600,
                                color: "White",
                                storage: { capacity: "256GB", price: 100 },
                                quantity: 1,
                                totalPrice: 700,
                                imageUrl: "/phone2.jpg",
                            },
                        ])
                    }
                >
                    Add item
                </button>
            );
        }

        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        // Wait for initial load
        await waitFor(() => {
            expect(contextValue.loaded).toBe(true);
        });

        // Click button to add item
        contextValue.setCart([
            ...contextValue.cart,
            {
                id: "2",
                brand: "Brand2",
                name: "Phone2",
                basePrice: 600,
                color: "White",
                storage: { capacity: "256GB", price: 100 },
                quantity: 1,
                totalPrice: 700,
                imageUrl: "/phone2.jpg",
            },
        ]);

        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith(
                "cart",
                expect.stringContaining('"id":"2"')
            );
        });
    });
});
