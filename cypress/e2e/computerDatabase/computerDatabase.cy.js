const typedText = {
  computerName: 'Cypress Computer Name',
  introduced: '2023-02-25',
  discontinued: '2023-03-03',
  company: {
    label: 'Apple Inc.',
    value: '1',
  },
  search: 'Acer Iconia',
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

    cy.get('#company').select(typedText.company.label);
    cy.get('#company').should('have.value', typedText.company.value);
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

describe('Test Computer Database filter', () => {
  beforeEach(() => {
    cy.visit('http://computer-database.gatling.io/computers');
  });

  it('should Computer Database have a filter input and a button "Filter by name"', () => {
    cy.get('#searchbox').should('exist').and('have.attr', 'placeholder', 'Filter by computer name...');
    cy.get('#searchsubmit').should('exist').and('have.value', 'Filter by name');
  });

  it('should be possible to filter a computer', () => {
    cy.get('#searchbox').type(typedText.search);
    cy.get('#searchsubmit').click();

    cy.get('tbody').find('tr').should('have.length', 1);

    cy.get('#main > h1').should('have.text', 'One computer found');

    cy.get('tbody > tr > :nth-child(1) > a').should('have.text', typedText.search);
  });

  it('should not possible to filter a computer when the user does not fill in the input "Filter by computer name..."', () => {
    cy.get('#searchsubmit').click();

    cy.get('#main > h1').should('have.text', '574 computers found');
  });
});

describe('Test Edit and Delete a computer', () => {
  beforeEach(() => {
    cy.visit('http://computer-database.gatling.io/computers');
  });

  it('should be possible click on a computer and redirect to the computer page', () => {
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

    cy.url().should('eq', 'http://computer-database.gatling.io/computers/381');

    cy.get('#main > h1').should('have.text', 'Edit computer');

    cy.get('#name').should('have.value', 'ACE');
  });

  it('should be possible edit a computer', () => {
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

    cy.get('#name').type(typedText.computerName);
    cy.get('#introduced').type(typedText.introduced);
    cy.get('#discontinued').type(typedText.discontinued);
    cy.get('#company').select(typedText.company.label);

    cy.get('.primary').click();

    cy.get('.alert-message').should('exist');
    cy.get('.alert-message').contains(typedText.computerName);
    cy.get('.alert-message').contains('has been updated');
  });

  it('should be possible delete a computer', () => {
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

    cy.get('.topRight > .btn').click({ force: true });

    cy.get('.alert-message').should('exist');
    cy.get('.alert-message').contains('ACE');
    cy.get('.alert-message').contains('has been deleted');
  });
});
