describe('common tests', () => {
  it('redirect to login page when not authorized', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/login');
  });
});
