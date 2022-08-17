describe("accessing page and checking initial settings", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "countryvalue=");
  });
});
