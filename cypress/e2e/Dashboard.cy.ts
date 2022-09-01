describe("accessing page and checking initial settings", () => {
  describe("check single page test", () => {
    it("navigation test", () => {
      cy.visit("http://localhost:3000");
      cy.contains("140").click();
      cy.contains("Back").click();
      cy.contains("Analysis");
    });
  });
  describe(" selects", () => {
    it("country select", () => {
      cy.get("#countryselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Egypt", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Egypt");
      cy.get("#countryselect")
        .find(".css-1hb7zxy-IndicatorsContainer")
        .find(".css-tj5bde-Svg ")
        .click({ multiple: true });
      cy.contains("Select..");
      cy.get("#countryselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Egypt", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Egypt");
    });
    it("camp select", () => {
      cy.get("#campselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Omaka", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Omaka");
      cy.get("#campselect")
        .find(".css-1hb7zxy-IndicatorsContainer")
        .find(".css-tj5bde-Svg ")
        .click({ multiple: true });
      cy.contains("Select..");
      cy.get("#campselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Omaka", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Omaka");
    });
    it("school select", () => {
      cy.get("#schoolselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Burke High School", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Burke High School");
      cy.get("#schoolselect")
        .find(".css-1hb7zxy-IndicatorsContainer")
        .find(".css-tj5bde-Svg ")
        .click({ multiple: true });
      cy.contains("Select..");
      cy.get("#schoolselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Burke High School", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Burke High School");
    });
    it("remove element from chart and adding it ", () => {
      cy.get("#620af3a468e4b2e765e7c9e7").click({ force: true });
      cy.get("#620af3a468e4b2e765e7c9e7")
        .should("have.attr", "style")
        .and("include", "background-color: rgb(255, 255, 255)");
      cy.get("#620af3a468e4b2e765e7c9e7").click({ force: true });
    });
  });

  describe("check the options in selects", () => {
    it("changing camp select value and check behaviour", () => {
      cy.get("#campselect")
        .find(".css-1hb7zxy-IndicatorsContainer")
        .find(".css-tj5bde-Svg ")
        .click({ multiple: true });
      cy.contains("Select..");

      cy.get("#campselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Kakuma", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      //check if all options are changed correctly
      cy.get("#schoolselect")
        .find(".css-319lph-ValueContainer input:text")
        .click();
      cy.contains("Kakuma");
      cy.get("#schoolselect")
        .find(".css-1hb7zxy-IndicatorsContainer")
        .find(".css-tj5bde-Svg ")
        .click({ multiple: true });

      cy.contains("Jolie");
      cy.contains("Greenlight");
      cy.get("#schoolselect")
        .find(".css-1hb7zxy-IndicatorsContainer")
        .find(".css-tj5bde-Svg ");
      cy.get("#schoolselect")
        .find(".css-319lph-ValueContainer input:text")
        .focus()
        .type("Greenlight", { force: true, delay: 100, timeout: 330000 })
        .type("{enter}", { force: true });
      cy.contains("Greenlight");
    });
  });
});
