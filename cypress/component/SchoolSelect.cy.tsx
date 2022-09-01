import SchoolSelect from "../../src/components/SchoolSelect/SchoolSelect_";
import { mount } from "cypress/react18";
import { getValuesCorrectlyFromURLForSchoolOptions } from "../../src/variables/general";
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

      let newSchoolOptions =
        getValuesCorrectlyFromURLForSchoolOptions(
          "Egypt" ?? "",
          "Omaka" ?? "",
          "" ?? "",
          res.data
        ) ?? [];
      expect(newSchoolOptions).to.have.length(5);
      const info = res.data;
      const school = "Kakuma";
      const defaultValue = newSchoolOptions?.filter(
        (op: { value: string; label: string }) => op.value === school
      );
      mount(
        <SchoolSelect
          schoolOptions={newSchoolOptions}
          info={info}
          id={"schoolselect"}
          name={"schoolselect"}
          defaultValue={defaultValue}
          value={newSchoolOptions?.filter(
            (op: { value: string; label: string }) => op.value === school
          )}
        />
      );
      cy.get("#schoolselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Burke High School", {
          force: true,
          delay: 100,
          timeout: 330000,
        });
      cy.contains("Burke High School");

      cy.get("#schoolselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Greenlight", { force: true, delay: 100, timeout: 330000 });
      cy.contains("Burke High SchoolGreenlight");
      cy.contains("No options");
    });
  });
});
