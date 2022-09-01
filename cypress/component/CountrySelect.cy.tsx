import CountrySelect from "../../src/components/CountrySelect/CountrySelect_";
import { mount } from "cypress/react18";
import { useState } from "react";
import { removeStringDuplicateUsingFilter } from "../../src/variables/general";
describe("Country Select", () => {
  it("mount component correctly", () => {
    cy.fixture("example").then((res: any) => {
      interface IChartData {
        camp: string;
        country: string;
        id: string;
        lessons: number;
        month: string;
        school: string;
        checked: string;
        color: string;
      }
      let filteredCountryArr = removeStringDuplicateUsingFilter(
        res.data.map((record: IChartData) => record.country)
      );
      let newCountryOptions: { value: string; label: string }[] =
        filteredCountryArr?.map((country: string) => {
          return {
            value: country,
            label: `${country}`,
          };
        });
      const info = res.data;
      const country = "Egypt";
      const defaultValue = newCountryOptions?.filter(
        (op: { value: string; label: string }) => op.value === country
      );
      mount(
        <CountrySelect
          countryOptions={newCountryOptions}
          info={info}
          id={"countryselect"}
          name={"countryselect"}
          defaultValue={defaultValue}
          value={newCountryOptions?.filter(
            (op: { value: string; label: string }) => op.value === country
          )}
        />
      );
      cy.get("#countryselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Egypt", { force: true, delay: 100, timeout: 330000 });
      cy.contains("Egypt");

      cy.get("#countryselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Kenya", { force: true, delay: 100, timeout: 330000 });
      cy.contains("EgyptKenya");
      cy.contains("No options");
    });
  });
});
