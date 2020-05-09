const { periodValidator } = require('./period')

describe('FHIR Period Validator', () => {
	test('It should return the period if it is valid', () => {
		const goodPeriod = {
			start: new Date(),
			end: new Date()
		}

		const { error, value } = periodValidator(goodPeriod)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodPeriod)
	})

	test('It should return an error if it is invalid', () => {
		const badFhirPeriod = {
			start: '',
			end: new Date()
		}

		const { error, value } = periodValidator(badFhirPeriod)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"start" must be a valid date')
	})
})
