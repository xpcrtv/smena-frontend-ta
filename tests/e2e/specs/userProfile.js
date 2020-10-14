describe('User profile page', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'secrettoken');
  });
  it('show correct data', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/about',
      status: 200,
      response: {
        data: {
          id: 123,
          username: 'test-user',
          avatar: `https://picsum.photos/id/2/200/200`,
          about: 'user description'
        }
      }
    });
    cy.visit('/');
    cy.get('[data-testid="user-info-card"] .v-image__image')
      .should('have.attr', 'style')
      .and('match', /https:\/\/picsum\.photos\/id\/2\/200\/200/);
    cy.get('[data-testid="user-info-card"]')
      .find('.v-card__title')
      .contains('test-user');
    cy.get('[data-testid="user-info-card"]')
      .find(' .v-card__text > div')
      .contains('user description');
  });

  it('correct error when user unauthorized', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/about',
      status: 400,
      response: [
        {
          token: null,
          error: 'Не удалось получить информацию о пользователе'
        }
      ]
    });
    cy.visit('/');
    cy.get('[data-testid="app-notification"]').should('be.visible');
    cy.get('[data-testid="app-notification"] .v-alert__content').contains(
      'Не удалось получить информацию о пользователе'
    );
  });
});
