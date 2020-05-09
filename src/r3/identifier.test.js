const { identifierValidator } = require('./identifier')

describe('FHIR Identifier Validator', () => {
	test('It should return the identifer if it is valid', () => {
		const goodIdentifier = {
			use: 'official',
			type: {
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
			},
			system: 'https://google.com/',
			value: 'A valid string',
			period: {
				start: new Date(),
				end: new Date()
			}
		}

		const { error, value } = identifierValidator(goodIdentifier)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodIdentifier)
	})

	test('It should return an error if it is invalid', () => {
		const badFhirIdentifier = {
			use: 'official',
			type: {
				coding:
					{
						system: 'https://google.com/',
						version: '3.0.1',
						code: 'active',
						display: 'This is a string representation',
						userSelected: false
					}
				,
				text: 'A string representation of the concept'
			},
			system: 'https://google.com/',
			value: 'A valid string',
			period: {
				start: new Date(),
				end: new Date()
			}
		}

		const { error, value } = identifierValidator(badFhirIdentifier)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"type.coding" must be an array')
	})
})
