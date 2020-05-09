const timingValidator = require('./timing')

describe('FHIR timing Validator', () => {
	test('It should return the Timing if it is valid', () => {
		const goodFhirTiming = {
			timing: {
				code: {
					coding: [
						{
							code: 'bid',
							display: '2 times per day'
						}
					]
				}
			}
		}

		const { error, value } = timingValidator(goodFhirTiming)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirTiming)
	})

	test('it should returrn an error if the timing is invalid from a missing resourceType', () => {
		const badFhirTiming = {
			timing: {
				repeat: {
					frequency: 2,
					periodUnit: 'daily'
				}
			},
			wiener: false
		}

		const { error, value } = timingValidator(badFhirTiming)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"wiener" is not allowed')
	})
})
