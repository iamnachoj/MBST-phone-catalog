import React, { useState } from "react";
import { act, renderHook } from "@testing-library/react";
import { useCart } from "@/hooks/useCart";
import { CartContext } from "@/context/CartContext";
import { CartItem } from "@/types/cart";
import {
  mockColorOptions,
  mockPhone,
  mockStorageOptions,
} from "@/__mocks__/mockPhoneData";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const loaded = true;
  return (
    <CartContext.Provider value={{ cart, setCart, loaded }}>
      {children}
    </CartContext.Provider>
  );
};

const WrapperWithInitialCart = ({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart: CartItem[];
}) => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const loaded = true;
  return (
    <CartContext.Provider value={{ cart, setCart, loaded }}>
      {children}
    </CartContext.Provider>
  );
};

describe("useCart hook with proper mocks and basePrice", () => {
  it("throws error if used outside CartProvider", () => {
    expect(() => {
      renderHook(() => useCart());
    }).toThrow("useCart must be used within a CartProvider");
  });

  it("returns initial cart and loaded state", () => {
    const WrapperWithLoadedFalse = ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
      const [cart, setCart] = useState<CartItem[]>([]);
      const loaded = false;
      return (
        <CartContext.Provider value={{ cart, setCart, loaded }}>
          {children}
        </CartContext.Provider>
      );
    };

    const { result } = renderHook(() => useCart(), {
      wrapper: WrapperWithLoadedFalse,
    });

    expect(result.current.cart).toEqual([]);
    expect(result.current.loaded).toBe(false);
  });

  it("adds a new item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    const newItem: CartItem = {
      id: mockPhone.id,
      brand: mockPhone.brand,
      name: mockPhone.name,
      basePrice: mockPhone.basePrice,
      color: mockColorOptions[0].name,
      storage: mockStorageOptions[0],
      quantity: 1,
      totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
      imageUrl: mockPhone.imageUrl,
    };

    act(() => {
      result.current.addToCart(newItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toMatchObject({
      id: mockPhone.id,
      quantity: 1,
      color: mockColorOptions[0].name,
      storage: mockStorageOptions[0],
      totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
      basePrice: mockPhone.basePrice,
    });
  });

  it("increments quantity if item already exists", () => {
    const initialCart: CartItem[] = [
      {
        id: mockPhone.id,
        brand: mockPhone.brand,
        name: mockPhone.name,
        basePrice: mockPhone.basePrice,
        color: mockColorOptions[0].name,
        storage: mockStorageOptions[0],
        quantity: 2,
        totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
        imageUrl: mockPhone.imageUrl,
      },
    ];

    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) =>
        WrapperWithInitialCart({ children, initialCart }),
    });

    const addItem: CartItem = {
      id: mockPhone.id,
      brand: mockPhone.brand,
      name: mockPhone.name,
      basePrice: mockPhone.basePrice,
      color: mockColorOptions[0].name,
      storage: mockStorageOptions[0],
      quantity: 3,
      totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
      imageUrl: mockPhone.imageUrl,
    };

    act(() => {
      result.current.addToCart(addItem);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(5); // 2 + 3
  });

  it("adds a new item if different color or storage", () => {
    const initialCart: CartItem[] = [
      {
        id: mockPhone.id,
        brand: mockPhone.brand,
        name: mockPhone.name,
        basePrice: mockPhone.basePrice,
        color: mockColorOptions[0].name,
        storage: mockStorageOptions[0],
        quantity: 2,
        totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
        imageUrl: mockPhone.imageUrl,
      },
    ];

    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) =>
        WrapperWithInitialCart({ children, initialCart }),
    });

    const addItem: CartItem = {
      id: mockPhone.id,
      brand: mockPhone.brand,
      name: mockPhone.name,
      basePrice: mockPhone.basePrice,
      color: mockColorOptions[1].name,
      storage: mockStorageOptions[0],
      quantity: 1,
      totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
      imageUrl: mockPhone.imageUrl,
    };

    act(() => {
      result.current.addToCart(addItem);
    });

    expect(result.current.cart).toHaveLength(2);
  });

  it("removes item by id", () => {
    const initialCart: CartItem[] = [
      {
        id: mockPhone.id,
        brand: mockPhone.brand,
        name: mockPhone.name,
        basePrice: mockPhone.basePrice,
        color: mockColorOptions[0].name,
        storage: mockStorageOptions[0],
        quantity: 2,
        totalPrice: mockPhone.basePrice + mockStorageOptions[0].price,
        imageUrl: mockPhone.imageUrl,
      },
      {
        id: "other-id",
        brand: "OtherBrand",
        name: "Other Phone",
        basePrice: 400,
        color: "White",
        storage: mockStorageOptions[1],
        quantity: 1,
        totalPrice: 400,
        imageUrl: "/img.jpg",
      },
    ];

    const { result } = renderHook(() => useCart(), {
      wrapper: ({ children }) =>
        WrapperWithInitialCart({ children, initialCart }),
    });

    act(() => {
      result.current.removeFromCart(mockPhone.id);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].id).toBe("other-id");
  });
});
