const { codeableConceptValidator } = require('./codeable-concept')

describe('FHIR Codeable Concept Validator', () => {
	test('It should return the codeable concept if it is valid', () => {
		const goodFhirCodeableConcept = {
			coding: [
				{
					system: 'https://google.com/',
					version: '3.0.1',
					code: 'active',
					display: 'This is a string representation',
					userSelected: false
				}
			],
			text: 'A string representation of the concept'
		}

		const { error, value } = codeableConceptValidator(goodFhirCodeableConcept)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirCodeableConcept)
	})

	test('It should return an error if it is invalid', () => {
		const badFhirCodeableConcept = {
			coding: [
				{
					system: 'potato',
					version: '3.0.1',
					code: 'active',
					display: 'This is a string representation',
					userSelected: false
				}
			],
			text: 'A string representation of the concept'
		}

		const { error, value } = codeableConceptValidator(badFhirCodeableConcept)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"coding[0].system" must be a valid uri')
	})
})
