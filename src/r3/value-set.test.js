const valueSetValidator = require('./value-set')

describe('FHIR Value Set Validator', () => {
	test('It should return the valueset as value if it is valid', () => {
		const goodValueSet = {
			resourceType: 'ValueSet',
			status: 'active',
			expansion: {
				identifier: 'http://fdb.com',
				timestamp: new Date(),
				contains: [
					{
						system: 'http://rxnorm',
						code: '234324',
						display: 'Viag'
					}
				]
			}
		}

		const { error, value } = valueSetValidator(goodValueSet)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodValueSet)
	})

	test('it should return an error if the valueset is invalid from a missing required key', () => {
		const badValueSet = {
			resourceType: 'ValueSet',
			status: 'active',
			expansion: {
				identifier: 'http://fdb.com',
				timestamp: new Date(),
				contains: [
					{
						system: 'http://rxnorm',
						display: 'Viag'
					}
				]
			}
		}

		const { error, value } = valueSetValidator(badValueSet)

		expect(error).toBe(undefined)
	})
})
