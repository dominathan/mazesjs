const conditionValidator = require('./condition')

describe('FHIR Condition Validator', () => {
	test('It should return the condition if it is valid', () => {
		const goodFhirMed = {
			resourceType: 'Condition',
			code: {
				text: 'test',
				coding: [
					{
						system: 'http://hl7.org/fhir/sid/icd-10',
						code: 'test',
						display: 'test'
					}
				]
			},
			subject: {
				reference: {
					resourceType: 'Group',
					identifier: {
						system: 'http://www.eirenerx.com'
					},
					type: 'person',
					actual: false
				}
			}
		}

		const { error, value } = conditionValidator(goodFhirMed)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirMed)
	})

	test('it should returrn an error if the condition is invalid with the errorr location', () => {
		//No ICD10 code for this condition for this condition is bad.
		const badFhirMed = {
			resourceType: 'Condition',
			code: {
				text: 'test',
				coding: [
					{
						system: 'http://hl7.org/fhir/sid/icd-10',
						display: 'test'
					}
				]
			},
			subject: {
				reference: {
					resourceType: 'Group',
					identifier: {
						system: 'http://www.eirenerx.com'
					},
					type: 'person',
					actual: false
				}
			}
		}

		const { error, value } = conditionValidator(badFhirMed)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"code.coding[0].code" is required')
	})
})
