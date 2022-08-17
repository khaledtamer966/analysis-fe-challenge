describe("accessing page and checking initial settings", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "countryvalue=");
  });
});

describe("check single page test", () => {
  it("navigation test", () => {
    cy.contains("140").click();
    cy.contains("ID");
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
    cy.url().should("include", "Egypt");
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
    cy.url().should("include", "Omaka");
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
    cy.url().should("include", "Burke_High_School");
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
    cy.get("#620af3a468e4b2e765e7c9e7")
      .should("have.attr", "style")
      .and("include", "background-color: rgb(255, 102, 51)");
    cy.get("#620af3a468e4b2e765e7c9e7").click({ force: true });
    cy.get("#620af3a468e4b2e765e7c9e7")
      .should("have.attr", "style")
      .and("include", "background-color: rgb(255, 255, 255)");
    cy.get("#620af3a468e4b2e765e7c9e7").click({ force: true });
    cy.get("#620af3a468e4b2e765e7c9e7")
      .should("have.attr", "style")
      .and("include", "background-color: rgb(255, 102, 51)");
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
    cy.contains("Jolie");
    cy.contains("Greenlight");
  });
});
