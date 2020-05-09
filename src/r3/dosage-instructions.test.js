const dosageInstructionValidator = require('./dosage-instructions')

describe('FHIR dosageInstruction Validator', () => {
	test('It should return the dosageInstruction if it is valid', () => {
		const goodFhirDosageInstruction = {
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

		const { error, value } = dosageInstructionValidator(goodFhirDosageInstruction)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirDosageInstruction)
	})

	test('it should returrn an error if the dosageInstruction is invalid from a missing resourceType', () => {
		const badFhirDosageInstructions = {
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

		const { error, value } = dosageInstructionValidator(badFhirDosageInstructions)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"dosageInstruction[0].text" is required')
	})
})
