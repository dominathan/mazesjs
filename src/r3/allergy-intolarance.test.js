const allergyValidator = require('./allergy-intolerance')

describe('FHIR Allergy Validator', () => {
	test('It should return the allergy if it is valid', () => {
		const goodFhirAllergy = {
			id: '15800',
			resourceType: 'AllergyIntolerance',
			clinicalStatus: 'active',
			verificationStatus: 'unconfirmed',
			code: {
				coding: [
					{
						system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
						code: '15800',
						display: 'acetylene'
					}
				],
				text: 'acetylene'
			},
			patient: {
				identifier: {
					system: 'https://www.eirenerx.com/patients'
				}
			}
		}

		const { error, value } = allergyValidator(goodFhirAllergy)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirAllergy)
	})

	test('it should returrn an error if the allergy is invalid with the error location', () => {
		//No rxcui for this med for this med is bad.
		const badFhirAllergy = {
			id: '15800',
			resourceType: 'AllergyIntolerance',
			clinicalStatus: 'active',
			verificationStatus: 'unconfirmed',
			code: {
				coding: [
					{
						system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
						display: 'acetylene'
					}
				],
				text: 'acetylene'
			},
			patient: {
				identifier: {
					system: 'https://www.eirenerx.com/patients'
				}
			}
		}

		const { error, value } = allergyValidator(badFhirAllergy)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"code.coding[0].code" is required')
	})
})
