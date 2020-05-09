const Joi = require('@hapi/joi')

/**
 * @description Run the ValueSet object through Joi validator to ensure it meets FHIR standards
 * see https://www.hl7.org/fhir/valueset.html
 */
const schemaForValueSet = Joi.object({
	resourceType: Joi.string()
		.valid('ValueSet')
		.required(),
	status: Joi.string()
		.valid('active')
		.required(),
	expansion: Joi.object({
		identifier: Joi.string().required(),
		timestamp: Joi.date().required(),
		contains: Joi.array().items(
			Joi.object({
				system: Joi.string().required(),
				abstract: Joi.boolean(),
				code: Joi.string(),
				display: Joi.string(),
				contains: Joi.array().items(
					Joi.object({
						system: Joi.string().required(),
						abstract: Joi.boolean(),
						code: Joi.string(),
						display: Joi.string()
					})
				)
			})
		)
	})
})

/**
 * @description Validator to verify ValueSet is FHIR compliant
 * @param {object} valueSet a valueSet object to validate it as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the valueset, or the error if it is invalid.
 */
module.exports = valueSet => {
	return schemaForValueSet.validate(valueSet)
}
