const detectedIssueValidator = require('./detected-issue')
let response = {
	resourceType: 'DetectedIssue',
	id: '300',
	status: 'final',
	category: {
		coding: [{ system: 'http://hl7.org/fhir/v3/ActCode', code: 'DUPTHPY', display: 'Duplicate Therapy Alert' }]
	},
	implicated: [
		{
			identifier: { system: 'http://hl7.org/fhir/sid/ndc', value: '00378606001' },
			display: 'DILTIAZEM 12HR ER 60 MG CAP'
		},
		{
			identifier: { system: 'http://hl7.org/fhir/sid/ndc', value: '10370083105' },
			display: 'DILTIAZEM 24HR ER 240 MG CAP'
		}
	],
	detail:
		'The use of DILTIAZEM 12HR ER 60 MG CAP and DILTIAZEM 24HR ER 240 MG CAP may represent a duplication of drug therapy or pharmacologic effect based on their mutual association with the duplicate therapy class of Calcium Channel Blockers.'
}
describe('DetectedIssue Validator', () => {
	test('it should validate and return a detected issue', () => {
		const { error, value } = detectedIssueValidator(response)
		expect(error).toBe(undefined)
		expect(value).toEqual(response)
	})
	test('it should return an error with an invalid detected issue', () => {
		delete response.status
		const { error, value } = detectedIssueValidator(response)
		expect(error).toBeTruthy()
	})
})
