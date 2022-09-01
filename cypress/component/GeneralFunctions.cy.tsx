import {
  removeObjDuplicateUsingFilterByCountryAndSchool,
  removeObjDuplicateUsingFilter,
  getValuesCorrectlyFromURLForCampOptions,
  getValuesCorrectlyFromURLForSchoolOptions,
  getValuesCorrectlyFromURLForChart,
} from "../../src/variables/general";
describe("Test All General Functions each of these functions have the logic for the filtering and retriving of the school information ", () => {
  it("Test removeObjDuplicateUsingFilterByCountryAndSchool function", () => {
    cy.fixture("example").then((res) => {
      const info = res.data;
      expect(info).to.have.length(300);
      expect(
        removeObjDuplicateUsingFilterByCountryAndSchool(info)
      ).to.have.length(62);
    });
  });
  it("Test removeObjDuplicateUsingFilter function", () => {
    cy.fixture("example").then((res) => {
      expect(removeObjDuplicateUsingFilter(res.data)).to.have.length(247);
    });
  });
  it("Test getValuesCorrectlyFromURLForCampOptions function", () => {
    cy.fixture("example").then((res) => {
      expect(
        getValuesCorrectlyFromURLForCampOptions("Egypt", "", "", res.data)
      ).to.have.length(4);
      expect(
        getValuesCorrectlyFromURLForCampOptions("Kenya", "", "", res.data)
      ).to.have.length(4);
      expect(
        getValuesCorrectlyFromURLForCampOptions("Tunisia", "", "", res.data)
      ).to.have.length(4);
      expect(
        getValuesCorrectlyFromURLForCampOptions("Tanzania", "", "", res.data)
      ).to.have.length(4);
      expect(
        getValuesCorrectlyFromURLForCampOptions("Tanzania", "", "", res.data)
      ).to.have.length(4);
    });
  });
  it("Test getValuesCorrectlyFromURLForSchoolOptions function", () => {
    cy.fixture("example").then((res) => {
      expect(
        getValuesCorrectlyFromURLForSchoolOptions(
          "Egypt",
          "Omaka",
          "",
          res.data
        )
      ).to.have.length(5);
      expect(
        getValuesCorrectlyFromURLForSchoolOptions(
          "Tunisia",
          "Lemaci",
          "",
          res.data
        )
      ).to.have.length(5);
      expect(
        getValuesCorrectlyFromURLForSchoolOptions(
          "Egypt",
          "Kakuma",
          "",
          res.data
        )
      ).to.have.length(5);
      expect(
        getValuesCorrectlyFromURLForSchoolOptions(
          "Egypt",
          "Sebuna",
          "",
          res.data
        )
      ).to.have.length(4);
    });
  });
  it("Test getValuesCorrectlyFromURLForChart function", () => {
    cy.fixture("example").then((res) => {
      expect(
        getValuesCorrectlyFromURLForChart("Egypt", "Omaka", "", res.data)
      ).to.have.length(16);
      expect(
        getValuesCorrectlyFromURLForChart("Tunisia", "Lemaci", "", res.data)
      ).to.have.length(21);
      expect(
        getValuesCorrectlyFromURLForChart(
          "Egypt",
          "Kakuma",
          "Kakuma Secondary",
          res.data
        )
      ).to.have.length(9);
      expect(
        getValuesCorrectlyFromURLForChart(
          "Egypt",
          "Sebuna",
          "Kebalepile High School",
          res.data
        )
      ).to.have.length(6);
    });
  });
});
