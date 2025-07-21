import { act, renderHook } from "@testing-library/react";
import { usePhoneSelection } from "@/hooks/usePhoneSelection";
import {
  mockColorOptions,
  mockPhoneDetails,
  mockStorageOptions,
} from "@/__mocks__/mockPhoneData";

describe("usePhoneSelection hook", () => {
  it("preselects first color and storage option if available", () => {
    const { result } = renderHook(() => usePhoneSelection(mockPhoneDetails));

    expect(result.current.selectedColor).toBe(mockColorOptions[0].name);
    expect(result.current.selectedStorage).toEqual(mockStorageOptions[0]);
  });

  it("calculates totalPrice as basePrice + selectedStorage price", () => {
    const { result } = renderHook(() => usePhoneSelection(mockPhoneDetails));

    expect(result.current.totalPrice).toBe(
      mockPhoneDetails.basePrice + mockStorageOptions[0].price,
    );

    act(() => {
      result.current.setSelectedStorage(mockStorageOptions[2]);
    });

    expect(result.current.totalPrice).toBe(
      mockPhoneDetails.basePrice + mockStorageOptions[2].price,
    );
  });

  it("updates selectedColor and selectedImage correctly", () => {
    const { result } = renderHook(() => usePhoneSelection(mockPhoneDetails));

    expect(result.current.selectedImage).toBe(mockColorOptions[0].imageUrl);

    // change color
    act(() => {
      result.current.setSelectedColor(mockColorOptions[1].name);
    });

    expect(result.current.selectedImage).toBe(mockColorOptions[1].imageUrl);
  });

  it("returns null selectedColor and selectedStorage if no options", () => {
    const phoneNoOptions = {
      ...mockPhoneDetails,
      colorOptions: [],
      storageOptions: [],
    };

    const { result } = renderHook(() => usePhoneSelection(phoneNoOptions));

    expect(result.current.selectedColor).toBeNull();
    expect(result.current.selectedStorage).toBeNull();
  });
});
