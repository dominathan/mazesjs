const medicationRequestValidator = require('./medication-request')

describe('FHIR MedicationRequest Validator', () => {
	test('It should return the medicationRequest if it is valid', () => {
		const goodFhirMedRequest = {
			resourceType: 'MedicationRequest',
			identifier: {
				value: '955811'
			},
			intent: 'proposal',
			medicationCodeableConcept: {
				coding: [
					{
						system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
						code: '1234567'
					}
				]
			},
			dosageInstruction: [
				{
					text: '0.5 tab by mouth 2 times per day',
					timing: {
						code: {
							coding: [
								{
									code: 'bid',
									display: '2 times per day'
								}
							]
						}
					},
					route: {
						coding: [
							{
								code: 'PO',
								display: 'oral'
							}
						]
					},
					doseQuantity: {
						value: 0.5,
						unit: 'tabs',
						code: '131'
					}
				}
			]
		}

		const { error, value } = medicationRequestValidator(goodFhirMedRequest)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirMedRequest)
	})

	test('it should returrn an error if the medicationRequest is invalid from a missing sig', () => {
		//No rxcui for this med for this med is bad.
		const badFhirMedRequest = {
			resourceType: 'MedicationRequest',
			identifier: {
				value: '955811'
			},
			intent: 'proposal',
			medicationCodeableConcept: {
				coding: [
					{
						system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
						code: '1234567'
					}
				]
			},
			dosageInstruction: [
				{
					timing: {
						code: {
							coding: [
								{
									code: 'bid',
									display: '2 times per day'
								}
							]
						}
					},
					route: {
						coding: [
							{
								code: 'PO',
								display: 'oral'
							}
						]
					},
					doseQuantity: {
						value: 0.5,
						unit: 'tabs',
						code: '131'
					}
				}
			]
		}

		const { error, value } = medicationRequestValidator(badFhirMedRequest)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"dosageInstruction[0].text" is required')
	})
})
