const Joi = require('@hapi/joi')

/**
 * @description Run the timing object through Joi validator to ensure it meets FHIR standards
 * see https://www.hl7.org/fhir/timing.html
 */
const schemaForTiming = Joi.object({
	timing: Joi.object({
		code: Joi.object({
			coding: Joi.array().items(
				Joi.object({
					system: Joi.string(),
					code: Joi.string(), // FDBItem.FrequencyShortDesc
					display: Joi.string()
				})
			)
		}),
		repeat: Joi.object({
			frequency: Joi.any(),
			periodUnit: Joi.string()
		})
	})
})

/**
 * @description Validator to verify timing is FHIR compliant
 * @param {object} timing a timing object to validate it as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the dosageInstruction, or the error if it is invalid.
 */
module.exports = timing => {
	return schemaForTiming.validate(timing)
}
