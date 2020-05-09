const { parametersValidator } = require('./parameters')

describe('FHIR Parameters Validator', () => {
	test('It should return the parameters if it is valid', () => {
		const goodFhirParameters = {
			resourceType: 'Parameters',
			parameter: [
				{
					name: 'result',
					valueBoolean: true
				},
				{
					name: 'match',
					part: [
						{
							name: 'equivalence',
							valueString: 'narrower'
						},
						{
							name: 'concept',
							valueCoding: {
								system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
								code: '798271'
							}
						}
					]
				},
				{
					name: 'match',
					part: [
						{
							name: 'equivalence',
							valueString: 'wider'
						},
						{
							name: 'concept',
							valueCoding: {
								system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
								code: '00006404500',
								display: 'If FDB return the drug associated with this rxcui'
							}
						},
						{
							name: 'concept',
							valueCoding: {
								system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
								code: '00006404500',
								display: 'If FDB return the drug associated with this rxcui'
							}
						}
					]
				}
			]
		}

		const { error, value } = parametersValidator(goodFhirParameters)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirParameters)
	})

	test('It should return an error if it is invalid', () => {
		const badFhirParameters = {
			resourceType: 'Parameters',
			parameter: [
				{
					name: 'result',
					valueBoolean: true
				},
				{
					name: 'match',
					part: [
						{
							name: 'equivalence',
							valueString: 'narrower'
						},
						{
							name: 'concept',
							valueCoding: {
								system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
								code: '798271'
							}
						}
					]
				},
				{
					name: 'match',
					part: [
						{
							name: 'equivalence',
							valueString: 'wider'
						},
						{
							valueCoding: {
								system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
								code: '00006404500',
								display: 'If FDB return the drug associated with this rxcui'
							}
						}
					]
				}
			]
		}

		const { error, value } = parametersValidator(badFhirParameters)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"parameter[2].part[1].name" is required')
	})
})
