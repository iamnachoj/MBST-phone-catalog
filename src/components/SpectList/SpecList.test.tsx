import { render, screen } from "@testing-library/react";
import { SpecList } from "./SpecList";
import { mockSpecs } from "@/__mocks__/mockPhoneData";

describe("SpecList", () => {
    it("renders the title and all the specs", () => {
        render(<SpecList specs={mockSpecs} />);

        // Check title
        expect(
            screen.getByRole("heading", { name: /especificaciones técnicas/i })
        ).toBeInTheDocument();

        // Check that each key-value pair appears in the table
        Object.entries(mockSpecs).forEach(([key, value]) => {
            expect(screen.getByText(key)).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });
    });
});
