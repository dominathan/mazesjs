const Joi = require('@hapi/joi')

/**
 * @description Run the fdb drug-drug-interaction/duplicate-therapy through Joi validator to ensure it meets FHIR standards
 * see https://www.hl7.org/fhir/detectedissue.html
 */
const schemaForDetectedIssue = Joi.object({
	resourceType: Joi.string()
		.valid('DetectedIssue')
		.required(),
	id: Joi.string().required(),
	extension: Joi.array(),
	date: Joi.date(),
	status: Joi.string()
		.valid('final')
		.required(),
	category: Joi.object({
		coding: Joi.array().items(
			Joi.object({
				system: Joi.string(),
				code: Joi.string(),
				display: Joi.string()
			})
		)
	}),
	implicated: Joi.array().items(
		Joi.object({
			reference: Joi.string(),
			identifier: Joi.object({
				type: Joi.object({
					coding: Joi.array().items(
						Joi.object({
							system: Joi.string().uri(),
							code: Joi.string(),
							display: Joi.string()
						})
					),
					text: Joi.string()
				}),
				system: Joi.string(),
				value: Joi.string()
			}),
			display: Joi.string()
		})
	),
	detail: Joi.string(),
	severity: Joi.string(),
	mitigation: Joi.array().items(
		Joi.object({
			action: Joi.object({
				coding: Joi.array().items(
					Joi.object({
						system: Joi.string(),
						code: Joi.string(),
						display: Joi.string()
					})
				),
				text: Joi.string()
			}),
			date: Joi.date()
		})
	)
})

/**
 * @description Validator to verify detectedIssue is FHIR compliant
 * @param {object} detectedIssue a detectedIssue to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the detectedIssue, or the error if it is invalid.
 */
module.exports = detectedIssue => {
	return schemaForDetectedIssue.validate(detectedIssue)
}
