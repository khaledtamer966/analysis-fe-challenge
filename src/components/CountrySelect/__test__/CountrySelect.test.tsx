import { render, screen } from "@testing-library/react";
import CountrySelect from "../CountrySelect";

test("renders learn react link", () => {
  render(<CountrySelect />);
  const linkElement = screen.getByTestId("countryselect");
  expect(linkElement.textContent).toBe("Select");
});
