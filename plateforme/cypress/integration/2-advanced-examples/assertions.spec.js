/** @format */

/// <reference types="cypress" />

context('Assertions', () => {
	beforeEach(() => {
		cy.visit('https://example.cypress.io/commands/assertions')
	})

	describe('Implicit Assertions', () => {
		it('.should() - make an assertion about the current subject', () => {
			// https://on.cypress.io/should
			cy.get('.assertion-table')
				.find('tbody tr:last')
				.should('have.class', 'success')
				.find('td')
				.first()
				// Checking the text of the <td> element in various ways
				.should('have.text', 'Column content')
				.should('contain', 'Column content')
				.should('have.html', 'Column content')
				// Chai-jquery uses "is()" to check if element matches selector
				.should('match', 'td')
				// To match text content against a regular expression
				// First need to invoke jQuery method text()
				// And then match using regular expression
				.invoke('text')
				.should('match', /column content/i)

			// A better way to check element's text content against a regular expression
			// Is to use "cy.contains"
			// https://on.cypress.io/contains
			cy.get('.assertion-table')
				.find('tbody tr:last')
				// Finds first <td> element with text content matching regular expression
				.contains('td', /column content/i)
				.should('be.visible')

			// For more information about asserting element's text
			// See https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
		})

		it('.and() - chain multiple assertions together', () => {
			// https://on.cypress.io/and
			cy.get('.assertions-link')
				.should('have.class', 'active')
				.and('have.attr', 'href')
				.and('include', 'cypress.io')
		})
	})

	describe('Explicit Assertions', () => {
		// https://on.cypress.io/assertions
		it('expect - make an assertion about a specified subject', () => {
			// We can use Chai's BDD style assertions
			expect(true).to.be.true
			const o = {foo: 'bar'}

			expect(o).to.equal(o)
			expect(o).to.deep.equal({foo: 'bar'})
			// Matching text using regular expression
			expect('FooBar').to.match(/bar$/i)
		})

		it('pass your own callback function to should()', () => {
			// Pass a function to should that can have any number
			// Of explicit assertions within it.
			// The ".should(cb)" function will be retried
			// Automatically until it passes all your explicit assertions or times out.
			cy.get('.assertions-p')
				.find('p')
				.should(($p) => {
					// https://on.cypress.io/$
					// Return an array of texts from all of the p's
					// @ts-ignore TS6133 unused variable
					const texts = $p.map((i, el) => Cypress.$(el).text())

					// Jquery map returns jquery object
					// And .get() convert this to simple array
					const paragraphs = texts.get()

					// Array should have length of 3
					expect(paragraphs, 'has 3 paragraphs').to.have.length(3)

					// Use second argument to expect(...) to provide clear
					// Message with each assertion
					expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
						'Some text from first p',
						'More text from second p',
						'And even more text from third p',
					])
				})
		})

		it('finds element by class name regex', () => {
			cy.get('.docs-header')
				.find('div')
				// .should(cb) callback function will be retried
				.should(($div) => {
					expect($div).to.have.length(1)

					const className = $div[0].className

					expect(className).to.match(/heading-/)
				})
				// .then(cb) callback is not retried,
				// It either passes or fails
				.then(($div) => {
					expect($div, 'text content').to.have.text('Introduction')
				})
		})

		it('can throw any error', () => {
			cy.get('.docs-header')
				.find('div')
				.should(($div) => {
					if ($div.length !== 1) {
						// You can throw your own errors
						throw new Error('Did not find 1 element')
					}

					const className = $div[0].className

					if (!className.match(/heading-/)) {
						throw new Error(`Could not find class "heading-" in ${className}`)
					}
				})
		})

		it('matches unknown text between two elements', () => {
			/**
			 * Text from the first element.
			 * @type {string}
			 */
			let text

			/**
			 * Normalizes passed text,
			 * useful before comparing text with spaces and different capitalization.
			 * @param {string} s Text to normalize
			 */
			const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

			cy.get('.two-elements')
				.find('.first')
				.then(($first) => {
					// Save text from the first element
					text = normalizeText($first.text())
				})

			cy.get('.two-elements')
				.find('.second')
				.should(($div) => {
					// We can massage text before comparing
					const secondText = normalizeText($div.text())

					expect(secondText, 'second text').to.equal(text)
				})
		})

		it('assert - assert shape of an object', () => {
			const person = {
				name: 'Joe',
				age: 20,
			}

			assert.isObject(person, 'value is object')
		})

		it('retries the should callback until assertions pass', () => {
			cy.get('#random-number').should(($div) => {
				const n = parseFloat($div.text())

				expect(n).to.be.gte(1).and.be.lte(10)
			})
		})
	})
})
