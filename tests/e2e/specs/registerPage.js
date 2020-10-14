describe('Register page', () => {
  beforeEach(() => {
    cy.get('input[name="name"]').clear();
    cy.get('input[name="password"]').clear();
    cy.get('input[name="password-repeat"]').clear();
  });
  before(() => {
    cy.visit('/registration');
  });
  it('correct work of inputs', () => {
    cy.get('[data-testid="submit-btn"').should('be.disabled');
    cy.get('input[name="name"]')
      .type('test-user')
      .should('have.value', 'test-user');
    cy.get('input[name="password"]')
      .type('test-pwd')
      .should('have.value', 'test-pwd');
    cy.get('input[name="password-repeat"]')
      .type('test-pwd')
      .should('have.value', 'test-pwd');
    cy.get('[data-testid="submit-btn"').should('not.be.disabled');
  });

  it('show correct username validation error', () => {
    cy.get('input[name="name"]')
      .type('Us')
      .blur()
      .should('have.value', 'Us');
    cy.get('.v-messages__wrapper .v-messages__message').contains(
      'Слишком короткое имя!'
    );
  });

  it('show correct password validation error', () => {
    cy.get('input[name="password"]')
      .focus()
      .type('pwd')
      .blur()
      .should('have.value', 'pwd');
    cy.get('input[name="password"]')
      .closest('.v-input__control')
      .find('.v-text-field__details .v-messages__wrapper .v-messages__message')
      .contains('Слишком короткий пароль!');
  });

  it('show correct password repeat validation error', () => {
    cy.get('input[name="password-repeat"]')
      .focus()
      .clear()
      .blur()
      .should('have.value', '');
    cy.get('input[name="password-repeat"]')
      .closest('.v-input__control')
      .find('.v-text-field__details .v-messages__wrapper .v-messages__message')
      .contains('Слишком короткий пароль!');
  });

  it('correct error with user exist', () => {
    cy.get('input[name="name"]')
      .type('test-user')
      .should('have.value', 'test-user');
    cy.get('input[name="password"]')
      .type('test-pwd')
      .should('have.value', 'test-pwd');
    cy.get('input[name="password-repeat"]')
      .type('test-pwd')
      .should('have.value', 'test-pwd');
    cy.get('[data-testid="submit-btn"').should('not.be.disabled');
    cy.server();
    cy.route({
      method: 'POST',
      url: '/register',
      status: 400,
      response: [
        {
          token: null,
          error: 'Пользователь с таким именем уже зарегистрирован'
        }
      ]
    });
    cy.get('[data-testid="register-form"').submit();
    cy.get('[data-testid="app-notification"]').should('be.visible');
    cy.get('[data-testid="app-notification"] .v-alert__content').contains(
      'Пользователь с таким именем уже зарегистрирован'
    );
  });

  it('successfull registration', () => {
    cy.get('input[name="name"]').type('test');
    cy.get('input[name="password"]').type('1234');
    cy.get('input[name="password-repeat"]').type('1234');

    cy.server();
    cy.route({
      method: 'POST',
      url: '/register',
      status: 200,
      response: {
        message: 'Пользователь успешно зарегистрирован'
      }
    });
    cy.route({
      method: 'POST',
      url: '/login',
      status: 200,
      response: {
        token: 'somesecrettoken',
        error: null
      }
    });
    cy.get('[data-testid="register-form"').submit();
    cy.visit('/');
    cy.location('pathname').should('eq', '/');
    cy.url().should(() => {
      expect(localStorage.getItem('token')).to.eq('somesecrettoken');
    });
  });
});
