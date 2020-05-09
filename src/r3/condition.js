const Joi = require('@hapi/joi')

/**
 * Run the fdb condition through Joi validator to ensure it meets FHIR standards
 */
const schemaForCondition = Joi.object({
	resourceType: Joi.string()
		.valid('Condition')
		.required(),
	meta: Joi.object(),
	id: Joi.string(),
	code: Joi.object({
		coding: Joi.array().items(
			Joi.object({
				system: Joi.string().required(),
				code: Joi.string().required(),
				display: Joi.string().required()
			})
		),
		text: Joi.string().required()
	}),
	subject: Joi.object({
		reference: Joi.object({
			resourceType: Joi.string().required(),
			identifier: Joi.object({
				system: Joi.string().required()
			}),
			type: Joi.string().required(),
			actual: Joi.boolean().required()
		})
	}).required()
})

/**
 * @description Validator to verify condition is FHIR compliant
 * @param {object} condition a condition to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the condition, or the error if it is invalid.
 */
module.exports = condition => {
	return schemaForCondition.validate(condition)
}
