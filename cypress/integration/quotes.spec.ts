// write tests here
enum SiteInfo {
  Root = 'http://localhost:1234',
  inputText = '[name="text"]',
  inputAuthor = '[name="author"]',
  testAuth = 'Michael Scott',
  testText = "You miss 100% of the shots you don't take - Wayne Gretzky",
  submitBtn = '#submitBtn',
  deleteBtn = 'ul > :nth-child(4) > button:nth-child(3)',
}

describe('These are sample test', (): void => {
  it('Renders our page to the screen', () => {
    cy.visit(SiteInfo.Root);
  });
  it('Makes a simple assertion', (): void => {
    expect(1 + 2).to.equal(3); // assertion
  });
  it('Getting HTML Elements', () => {
    // https://docs.cypress.io/guides/references/assertions.html#Chai
    cy.get('[name="text"]').should('exist');
    cy.get('.fake-class').should('not.exist');
  });
});

describe('Filling out and cancelling inputs', (): void => {
  beforeEach(() => {
    cy.visit(SiteInfo.Root);
  });
  it('Can navigate to the proper site', () => {
    cy.url().should('include', 'localhost');
  });

  it('Can type in the inputs', () => {
    cy.get(SiteInfo.inputText)
      .should('have.value', '')
      .type(SiteInfo.testText)
      .should('have.value', SiteInfo.testText);

    cy.get(SiteInfo.inputAuthor)
      .should('have.value', '')
      .type(SiteInfo.testAuth)
      .should('have.value', SiteInfo.testAuth);
  });

  it('Submit button is enabled after both inputs are filled in', () => {
    cy.get(SiteInfo.inputText)
      .should('have.value', '')
      .type(SiteInfo.testText)
      .should('have.value', SiteInfo.testText);

    cy.get(SiteInfo.inputAuthor)
      .should('have.value', '')
      .type(SiteInfo.testAuth)
      .should('have.value', SiteInfo.testAuth);

    cy.get(SiteInfo.submitBtn).should('not.be.disabled');
  });
});

describe('Adding a new quote and deleting quote', () => {
  beforeEach(() => {
    cy.visit(SiteInfo.Root);
  });
  it('Can submit and delete a new quote', () => {
    cy.get(SiteInfo.inputText).type(SiteInfo.testText);
    cy.get(SiteInfo.inputAuthor).type(SiteInfo.testAuth);
    cy.get(SiteInfo.submitBtn).click();

    cy.contains(SiteInfo.testText);

    cy.get(SiteInfo.deleteBtn).click();
    cy.get('ul > :nth-child(4)').should('not.exist');
  });
});
