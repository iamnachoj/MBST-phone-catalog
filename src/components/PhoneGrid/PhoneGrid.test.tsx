import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PhoneGrid from "./PhoneGrid";
import { Phone } from "@/types/phone";
import { fetchPhones } from "@/lib/api";
import {mockPhones} from "@/__mocks__/mockPhoneData";

jest.mock("@/components/PhoneCard/PhoneCard", () => {
  const MockPhoneCard = ({ phone }: { phone: Phone }) => (
    <div data-testid="phone-card">{phone.name}</div>
  );
  MockPhoneCard.displayName = "MockPhoneCard";
  return MockPhoneCard;
});

jest.mock("@/components/SearchBar/SearchBar", () => {
  const MockSearchBar = ({
    onSearch,
    initialValue,
  }: {
    onSearch: (term: string) => void;
    initialValue?: string;
  }) => (
    <input
      data-testid="search-bar"
      defaultValue={initialValue}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
  MockSearchBar.displayName = "MockSearchBar";
  return MockSearchBar;
});

jest.mock("@/lib/api", () => ({
  fetchPhones: jest.fn(),
}));

describe("PhoneGrid", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial phones", () => {
    render(<PhoneGrid initialPhones={mockPhones} />);
    expect(screen.getAllByTestId("phone-card")).toHaveLength(2);
    expect(screen.getByText("2 RESULTADOS")).toBeInTheDocument();
  });

  it("fetches phones on search", async () => {
    (fetchPhones as jest.Mock).mockResolvedValueOnce([
      { id: "3", name: "Pixel", brand: "Google", price: 799 },
    ]);

    render(<PhoneGrid initialPhones={mockPhones} />);
    fireEvent.change(screen.getByTestId("search-bar"), {
      target: { value: "Pixel" },
    });

    await waitFor(() => {
      expect(fetchPhones).toHaveBeenCalledWith(20, "Pixel");
    });

    expect(await screen.findByText("Pixel")).toBeInTheDocument();
    expect(screen.getByText("1 RESULTADOS")).toBeInTheDocument();
  });
});
