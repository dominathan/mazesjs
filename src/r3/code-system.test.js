const codeSystemValidator = require('./code-system')

describe('FHIR Code System Validator', () => {
	test('It should return the code system if it is valid', () => {
		const goodFhirCodeSystem = {
			resourceType: 'CodeSystem',
			id: 'codesystem-ObsoleteDate-1571323178366',
			meta: {
				versionId: '1'
			},
			status: 'active',
			content: 'complete',
			concept: [
				{
					code: 'ObsoleteDate',
					designation: [
						{
							use: {
								system: 'http://docs.fdbhealth.com/display/CCDOCUS/DispensableDrugs#ObsoleteDate'
							},
							value: 'The latest obsolete date for the associated packaged drugs.'
						}
					]
				}
			]
		}

		const { error, value } = codeSystemValidator(goodFhirCodeSystem)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodFhirCodeSystem)
	})

	test('It should return an error if it is invalid', () => {
		const badFhirCodeSystem = {
			resourceType: 'CodeSystem',
			id: 'codesystem-ObsoleteDate-1571323178366',
			meta: {
				versionId: '1'
			},
			status: 'active',
			content: 'complete',
			concept: [
				{
					value: 'ObsoleteDate',
					designation: [
						{
							use: {
								system: 'http://docs.fdbhealth.com/display/CCDOCUS/DispensableDrugs#ObsoleteDate'
							}
						}
					]
				}
			]
		}

		const { error, value } = codeSystemValidator(badFhirCodeSystem)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual('"concept[0].value" is not allowed')
	})
})
