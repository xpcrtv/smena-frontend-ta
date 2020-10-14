describe('Login page', () => {
  before(() => {
    cy.visit('/login');
  });
  beforeEach(() => {
    cy.get('input[name="name"]').clear();
    cy.get('input[name="password"]').clear();
  });
  it('correct work of inputs', () => {
    cy.get('[data-testid="submit-btn"').should('be.disabled');
    cy.get('input[name="name"]')
      .type('test-user')
      .should('have.value', 'test-user');
    cy.get('input[name="password"]')
      .type('test-pwd')
      .should('have.value', 'test-pwd');
    cy.get('[data-testid="submit-btn"').should('not.be.disabled');
  });

  it('show correct username validation error', () => {
    cy.visit('/login');
    cy.get('input[name="name"]')
      .blur()
      .should('have.value', '');
    cy.get('.v-messages__wrapper .v-messages__message').contains(
      'Введите имя!'
    );
  });

  it('show correct password validation error', () => {
    cy.get('input[name="password"]')
      .focus()
      .clear()
      .blur()
      .should('have.value', '');
    cy.get('input[name="password"]')
      .closest('.v-input__control')
      .find('.v-text-field__details .v-messages__wrapper .v-messages__message')
      .contains('Введите пароль!');
  });

  it('correct error with wrong username and password', () => {
    cy.get('input[name="name"]')
      .type('test-user')
      .should('have.value', 'test-user');
    cy.get('input[name="password"]')
      .type('test-pwd')
      .should('have.value', 'test-pwd');
    cy.get('[data-testid="submit-btn"').should('not.be.disabled');
    cy.server();
    cy.route({
      method: 'POST',
      url: '/login',
      status: 401,
      response: [
        {
          token: null,
          error: 'Введите правильные имя пользователя/пароль'
        }
      ]
    });
    cy.get('[data-testid="login-form"').submit();
    cy.get('[data-testid="app-notification"]').should('be.visible');
    cy.get('[data-testid="app-notification"] .v-alert__content').contains(
      'Неправильные имя пользователя/пароль'
    );
  });

  it('successfull login', () => {
    cy.get('input[name="name"]').type('test');
    cy.get('input[name="password"]').type('123');
    cy.server();
    cy.route({
      method: 'POST',
      url: '/login',
      status: 200,
      response: {
        token: 'somesecrettoken',
        error: null
      }
    });
    cy.get('[data-testid="login-form"').submit();
    cy.visit('/');
    cy.location('pathname').should('eq', '/');
    cy.url().should(() => {
      expect(localStorage.getItem('token')).to.eq('somesecrettoken');
    });
  });
});
