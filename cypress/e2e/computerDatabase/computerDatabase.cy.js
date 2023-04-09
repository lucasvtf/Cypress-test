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
