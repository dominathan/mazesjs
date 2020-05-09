const Joi = require('@hapi/joi')

/**
 * Run the object through Joi validator to ensure it meets FHIR standards
 */
const schemaForCodeSystem = Joi.object({
	resourceType: Joi.string()
		.valid('CodeSystem')
		.required(),
	meta: Joi.object(),
	id: Joi.string(),
	status: Joi.string(),
	content: Joi.string(),
	concept: Joi.array().items(
		Joi.object({
			code: Joi.string(),
			designation: Joi.array().items(
				Joi.object({
					use: Joi.object({
						system: Joi.string(),
						code: Joi.string()
					}),
					value: Joi.string()
				})
			)
		})
	)
})

/**
 * @description Validator to verify codesystem is FHIR compliant
 * @param {object} codeSystem a codeSystem to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the condition, or the error if it is invalid.
 */
module.exports = codeSystem => {
	return schemaForCodeSystem.validate(codeSystem)
}
