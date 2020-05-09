const Joi = require('@hapi/joi')

/**
 * Run the fdb allergy through Joi validator to ensure it meets FHIR standards
 */
const schemaForAllergy = Joi.object({
	id: Joi.string().required(),
	resourceType: Joi.string()
		.valid('AllergyIntolerance')
		.required(),
	verificationStatus: Joi.string().required(),
	clinicalStatus: Joi.string().required(),
	code: Joi.object({
		text: Joi.string().required(),
		coding: Joi.array().items(
			Joi.object({
				system: Joi.string(),
				code: Joi.string().required(),
				display: Joi.string().required()
			})
		)
	}),
	patient: Joi.object({
		identifier: Joi.object({
			system: Joi.string().required()
		})
	})
})

/**
 * @description Validator to verify allergy is FHIR compliant
 * @param {object} allergy a allergy to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the allergy, or the errorr if it is invalid.
 */
module.exports = allergy => {
	return schemaForAllergy.validate(allergy)
}
