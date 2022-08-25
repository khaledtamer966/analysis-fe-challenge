/// <reference types="cypress" />

function generateToken({ secret }): void {
  const totp = require("totp-generator");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = totp(secret);
}
// eslint-disable-next-line @typescript-eslint/no-use-before-define
Cypress.Commands.add("generateToken", generateToken);

// this is another example.
// eslint-disable-next-line @typescript-eslint/no-use-before-define
Cypress.Commands.add("login", login);
function login(username: string, password: string): void {
  // steps for login
}

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    generateToken({ secret }): void;

    /**
     * This will log user in
     * @param email string
     * @param password string
     */
    login(email: string, password: string): void;
  }
}
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
