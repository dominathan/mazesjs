const Joi = require('@hapi/joi')

/**
 * Validate a FHIR Bundle Resource
 */
const schemaForBundle = Joi.object({
	resourceType: Joi.string()
		.valid('Bundle')
		.required(),
	type: Joi.string()
		.valid(
			'document',
			'message',
			'transaction',
			'transaction-response',
			'batch',
			'batch-response',
			'history',
			'searchset',
			'collection'
		)
		.required(),
	identifier: Joi.object(),
	total: Joi.number(),
	link: Joi.array().items(Joi.object({ relation: Joi.string(), url: Joi.string() })),
	entry: Joi.array().items(
		Joi.object({
			resource: Joi.object(),
			request: Joi.object(),
			response: Joi.object()
		})
	)
})

/**
 * @description Validator to verify Bundle is FHIR compliant
 * @param {object} bundle a bundle to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error, or the error if it is invalid.
 */
module.exports = bundle => {
	return schemaForBundle.validate(bundle)
}
