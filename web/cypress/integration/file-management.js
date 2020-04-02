/// <reference types="cypress" />

context('File Management', () => {
  beforeEach(() => cy.visit('/'))

  it('Add & Delete File', () => {
    cy.get('[data-cy=FileInput]').attachFile('./wk.png')

    cy.get('[data-cy=ImageList]')
      .children()
      .should('have.length', 1)

    cy.get('[data-cy=ImageListItem__deleteButton]').click()

    cy.get('[data-cy=ImageList]')
      .children()
      .should('have.length', 0)
  })
})
