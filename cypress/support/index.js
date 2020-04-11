// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Cookies.defaults({
  whitelist: 'user'
});

describe('setup', () => {
  it('should reset the database', () => {
    cy.exec('npm run db:reset');
    cy.clearCookie('user');
  });

  it('should be able to visit the page', () => {
    cy.visit('/');
  });

  it('should be able to visit login page', () => {
    cy.contains('a', 'Login').click();
    cy.url().should('contain', 'login');
  });

  it('should be able to login', () => {
    cy.get('input[placeholder=Brugernavn]').type('user');
    cy.get('input[placeholder=Password]').type('password');
    cy.contains('button', 'Login').click();
    cy.url().should('not.contain', 'Login');
  });
});
