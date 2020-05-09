const medicationValidator = require('./medication')

describe('FHIR Medication Validator', () => {
	test('It should return the medication if it is valid', () => {
		const goodFhirMed = {
			resourceType: 'Medication',
			id: '13424',
			meta: {
				versionId: '23423'
			},
			code: {
				text: 'test',
				coding: [
					{
						system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
						code: 'test',
						display: 'test' // is this the right display name?
					}
				]
			},
			isBrand: true,
			isOverTheCounter: false // Where do i get this info
		}

		const { error, value } = medicationValidator(goodFhirMed)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirMed)
	})

	test('it should returrn an error if the medication is invalid with the errorr location', () => {
		//No rxcui for this med for this med is bad.
		const badFhirMed = {
			resourceType: 'Medication',
			code: {
				text: 'test',
				coding: [
					{
						system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
						display: 'test' // is this the right display name?
					}
				]
			},
			isBrand: true,
			isOverTheCounter: false // Where do i get this info
		}

		const { error, value } = medicationValidator(badFhirMed)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"code.coding[0].code" is required')
	})
})
