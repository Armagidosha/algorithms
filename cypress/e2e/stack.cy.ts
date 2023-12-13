import { buttonSelector, circleClass, circleIsChanging, circleIsDefault, inputSelector } from "../../src/constants/utils"
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../src/constants/delays"

describe('stack', () => {
  beforeEach(() => {
    cy.visit('/stack')
    cy.get(inputSelector).as('input')
    cy.get(buttonSelector).as('button')
    cy.get(buttonSelector).contains('Добавить').as('addButton')
    cy.get(buttonSelector).contains('Удалить').as('removeButton')
    cy.get(buttonSelector).contains('Очистить').as('clearButton')
  })

  it('checks if button is disabled', () => {
    cy.get('@input').should('be.empty')
    cy.get('@button').should('be.disabled')
  })

  it('adds elements to the stack', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@addButton').click()
    cy.get(circleClass).last().as('circle')
    cy.get('@circle')
      .invoke('attr', 'class')
      .should('include', circleIsChanging)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@circle')
      .invoke('attr', 'class')
      .should('include', circleIsDefault)
    cy.get('@circle').should('contain', '10')
    cy.get('@input').type('20')
    cy.get('@addButton').click()
    cy.get('@circle')
      .invoke('attr', 'class')
      .should('include', circleIsChanging)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@circle')
      .invoke('attr', 'class')
      .should('include', circleIsDefault)
    cy.get('@circle').should('contain', '20')
  })

  it('removes an element from the stack', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@input').type('20')
    cy.get('@addButton').click()
    cy.get(circleClass).last().as('circle')
    cy.get(circleClass).as('circles')
    cy.get('@circles').should('have.length', 2)
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@removeButton').click()
    cy.get('@circle')
      .invoke('attr', 'class')
      .should('include', circleIsChanging)
    cy.tick(DELAY_IN_MS)
    cy.get('@circle')
      .invoke('attr', 'class')
      .should('include', circleIsDefault)
    cy.get('@circles').should('have.length', 1)
  })

  it('clears the stack', () => {
    cy.clock()
    cy.get('@input').type('10')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get('@input').type('20')
    cy.get('@addButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleClass).should('have.length', 2)
    cy.get('@clearButton').click()
    cy.tick(SHORT_DELAY_IN_MS)
    cy.get(circleClass).should('have.length', 0)
  })
})