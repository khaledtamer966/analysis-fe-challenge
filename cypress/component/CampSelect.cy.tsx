import CampSelect from "../../src/components/CampSelect/CampSelect_";
import { mount } from "cypress/react18";
import { getValuesCorrectlyFromURLForCampOptions } from "../../src/variables/general";
describe("Camp Select", () => {
  it("mount component correctly", () => {
    cy.fixture("example").then((res: any) => {
      let newCampOptions =
        getValuesCorrectlyFromURLForCampOptions(
          "Egypt" ?? "",
          "" ?? "",
          "" ?? "",
          res.data
        ) ?? [];
      expect(newCampOptions).to.have.length(4);
      const info = res.data;
      const camp = "Omaka";
      const defaultValue = newCampOptions?.filter(
        (op: { value: string; label: string }) => op.value === camp
      );
      mount(
        <CampSelect
          campOptions={newCampOptions}
          info={info}
          id={"campselect"}
          name={"campselect"}
          defaultValue={defaultValue}
          value={newCampOptions?.filter(
            (op: { value: string; label: string }) => op.value === camp
          )}
        />
      );
      cy.get("#campselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Omaka", { force: true, delay: 100, timeout: 330000 });
      cy.contains("Omaka");

      cy.get("#campselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Greenlight", { force: true, delay: 100, timeout: 330000 });
      cy.contains("OmakaGreenlight");
      cy.contains("No options");
    });
  });
});
