const typedText = {
  computerName: 'Cypress Computer Name',
  introduced: '2023-02-25',
  discontinued: '2023-03-03',
  company: {
    label: 'Apple Inc.',
    value: '1',
  },
};

describe('Test site Computer Database', () => {
  beforeEach(() => {
    cy.visit('http://computer-database.gatling.io/computers');
  });

  it('should render computer database homepage correctly', () => {
    cy.url()
      .should('eq', 'http://computer-database.gatling.io/computers');
  });

  it('should open Add a new computer page when user click on a button "Add a new computer"', () => {
    cy.get('#add').click();

    cy.get('#main > h1')
      .should('have.text', 'Add a computer');
  });
});

describe('Test Add a new computer', () => {
  beforeEach(() => {
    cy.visit('http://computer-database.gatling.io/computers');
    cy.get('#add').click();
  });

  it('should return to homepage when click on a button "Cancel"', () => {
    cy.contains('Cancel').click();
    cy.url().should('eq', 'http://computer-database.gatling.io/computers');
  });

  it('should all inputs be editable', () => {
    cy.get('#name').type(typedText.computerName);
    cy.get('#name').should('have.value', typedText.computerName);

    cy.get('#introduced').type(typedText.introduced);
    cy.get('#introduced').should('have.value', typedText.introduced);

    cy.get('#discontinued').type(typedText.discontinued);
    cy.get('#discontinued').should('have.value', typedText.discontinued);

    cy.get('#discontinued').select(typedText.company.label);
    cy.get('#discontinued').should('have.value', typedText.company.value);
  });

  it('should add a new computer with sucess', () => {
    cy.get('#name').type(typedText.computerName);
    cy.get('#introduced').type(typedText.introduced);
    cy.get('#discontinued').type(typedText.discontinued);
    cy.get('#company').select(typedText.company.label);

    cy.get('.primary').click();

    cy.get('.alert-message').should('exist');
    cy.get('.alert-message').contains(typedText.computerName);
  });

  it('should add a new computer only with name', () => {
    cy.get('#name').type(typedText.computerName);

    cy.get('.primary').click();

    cy.get('.alert-message').should('exist');
  });

  it('should throw warning with no name', () => {
    cy.get('.primary').click();

    cy.get('.error').should('have.class', 'error');
    cy.get('.error > label').should('have.css', 'color', 'rgb(157, 38, 29)');
    cy.get('.error > .input > .help-inline').should('have.css', 'color', 'rgb(157, 38, 29)');
  });

  it('should throw warning with wrong "Introduced" format date', () => {
    cy.get('#name').type(typedText.computerName);
    cy.get('#introduced').type('19-01-1994');
    cy.get('.primary').click();

    cy.get('.error').should('have.class', 'error');
    cy.get('.error > label').should('have.css', 'color', 'rgb(157, 38, 29)');
    cy.get('.error > .input > .help-inline').should('have.css', 'color', 'rgb(157, 38, 29)');
  });

  it('should throw warning with wrong "Introduced" value', () => {
    cy.get('#name').type(typedText.computerName);
    cy.get('#introduced').type('wrong value');
    cy.get('.primary').click();

    cy.get('.error').should('have.class', 'error');

    cy.get('.error > label')
      .should('have.css', 'color', 'rgb(157, 38, 29)');

    cy.get('.error > .input > .help-inline').should('have.css', 'color', 'rgb(157, 38, 29)');
  });

  it('should throw warning with wrong "Discontinued" format date', () => {
    cy.get('#name').type(typedText.computerName);
    cy.get('#discontinued').type('19-01-1994');
    cy.get('.primary').click();

    cy.get('.error').should('have.class', 'error');
    cy.get('.error > label').should('have.css', 'color', 'rgb(157, 38, 29)');
    cy.get('.error > .input > .help-inline').should('have.css', 'color', 'rgb(157, 38, 29)');
  });

  it('should throw warning with wrong "Discontinued" wrong value', () => {
    cy.get('#name').type(typedText.computerName);
    cy.get('#discontinued').type('wrong value');
    cy.get('.primary').click();

    cy.get('.error').should('have.class', 'error');
    cy.get('.error > label').should('have.css', 'color', 'rgb(157, 38, 29)');
    cy.get('.error > .input > .help-inline').should('have.css', 'color', 'rgb(157, 38, 29)');
  });
});
