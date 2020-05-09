const conceptMapValidator = require('./concept-map')

describe('FHIR Concept Map Validator', () => {
	test('It should return the concept map as value if it is valid', () => {
		const goodConceptMap = {
			resourceType: 'ConceptMap',
			id: '101',
			url: 'http://hl7.org/fhir/ConceptMap/103',
			version: '20120613',
			name: 'TRHC NDC to RXCUI mapping of Viagra',
			status: 'draft',
			date: new Date(),
			publisher: 'TRHC',
			description: 'Mapping between NDC and RXCUI',
			jurisdiction: [
				{
					coding: [
						{
							system: 'http://unstats.un.org/unsd/methods/m49/m49.htm',
							code: '840',
							display: 'USA'
						}
					]
				}
			],
			purpose: 'Show mapping between NDC and RXCUI',
			copyright: '2018',
			sourceReference: {
				reference: 'http://snomed.info/id?fhir_vs'
			},
			targetReference: {
				reference: 'http://hl7.org/fhir/sid/icd-10-us'
			},
			group: [
				{
					source: 'http://snomed.info/sct',
					sourceVersion: 'November 2018 US Edition',
					target: 'http://hl7.org/fhir/sid/icd-10-us',
					element: [
						{
							code: '263204007',
							target: [
								{
									code: 'S52.209A',
									equivalence: 'narrower',
									comment:
										'The target mapping to ICD-10-CM is narrower, since additional patient data on the encounter (initial vs. subsequent) and fracture type is required for a valid ICD-10-CM mapping.'
								}
							]
						},
						{
							target: [
								{
									code: 'S52.209A',
									equivalence: 'narrower',
									comment:
										'The target mapping to ICD-10-CM is narrower, since additional patient data on the encounter (initial vs. subsequent), fracture type and healing (for subsequent encounter) is required for a valid ICD-10-CM mapping.'
								}
							]
						}
					]
				}
			]
		}

		const { error, value } = conceptMapValidator(goodConceptMap)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodConceptMap)
	})

	test('It should return an error if the concept map is invalid from a missing element', () => {
		const badConceptMap = {
			resourceType: 'ConceptMap',
			id: '101',
			url: 'http://hl7.org/fhir/ConceptMap/103',
			version: '20120613',
			name: 'TRHC NDC to RXCUI mapping of Viagra',
			status: 'draft',
			date: new Date(),
			publisher: 'TRHC',
			contact: [
				{
					name: 'TRHC CST',
					telecom: [
						{
							system: 'url',
							value: 'https://tabularasahealthcare.com/'
						}
					]
				}
			],
			description: 'Mapping between NDC and RXCUI',
			jurisdiction: [
				{
					coding: [
						{
							system: 'http://unstats.un.org/unsd/methods/m49/m49.htm',
							code: '840',
							display: 'USA'
						}
					]
				}
			],
			purpose: 'Show mapping between NDC and RXCUI',
			copyright: '2018',
			sourceReference: {
				reference: 'http://snomed.info/id?fhir_vs'
			},
			targetReference: {
				reference: 'http://hl7.org/fhir/sid/icd-10-us'
			},
			group: [
				{
					source: 'http://snomed.info/sct',
					sourceVersion: 'November 2018 US Edition',
					target: 'http://hl7.org/fhir/sid/icd-10-us'
				}
			]
		}

		const { error, value } = conceptMapValidator(badConceptMap)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"group[0].element" is required')
	})
})
