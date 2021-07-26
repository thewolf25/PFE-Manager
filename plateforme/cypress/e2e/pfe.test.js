/**
 * /* eslint-disable no-undef
 *
 * @format
 */

describe('PFE demo', () => {
	it.only('Login', () => {
		cy.visit('/')
		cy.wait(2000)
		cy.get('#txtUsername').type('adam@gmail.com') //fake
		cy.wait(2000)
		cy.get('#txtPassword').type('1111222')
		cy.wait(2000)
		cy.get('#btnSignIn').click()
		cy.wait(2000)
		cy.get('#txtUsername').clear()
		cy.get('#txtUsername').type('nawnaw@gmail.com') //real
		cy.wait(2000)
		cy.get('#txtPassword').clear()
		cy.get('#txtPassword').type('123456789')
		cy.wait(2000)
		cy.get('#btnSignIn').click()
		cy.wait(2000)
		cy.get('.form-group > :nth-child(1)').click()
		cy.wait(2000)

		cy.get(':nth-child(1) > #txtUsername').type('e2e Cahier de charge test')
		cy.wait(2000)
		cy.get(':nth-child(2) > #txtUsername').type('e2e entreprise test')
		cy.wait(2000)
		cy.get(':nth-child(4) > #btnSignIn').click()
		cy.wait(3000)
		cy.get('#btnSignIn').click()
		cy.wait(3000)
		cy.get('#btnSignIn').click()
	})
})
