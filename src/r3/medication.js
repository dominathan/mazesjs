const Joi = require('@hapi/joi')

/**
 * Run the fdb medication through Joi validator to ensure it meets FHIR standards
 * see https://www.hl7.org/fhir/medication.html
 */
const schemaForMedication = Joi.object({
	resourceType: Joi.string()
		.valid('Medication')
		.required(),
	meta: Joi.object({
		versionId: Joi.string()
	}),
	extension: Joi.array().items(
		Joi.object({
			url: Joi.string().required(),
			valueString: Joi.string()
		}),
		Joi.object({
			url: Joi.string().required(),
			valueCodeableConcept: Joi.object({
				coding: Joi.array().items(
					Joi.object({
						system: Joi.string().uri(),
						code: Joi.string(),
						display: Joi.string()
					})
				)
			})
		}),
		Joi.object({
			url: Joi.string().required(),
			valueDate: Joi.string()
		})
	),
	id: Joi.string(),
	code: Joi.object({
		text: Joi.string().required(),
		coding: Joi.array().items(
			Joi.object({
				system: Joi.string().required(),
				version: Joi.string(),
				code: Joi.string().required(),
				display: Joi.any(),
				userSelected: Joi.boolean()
			})
		)
	}),
	isBrand: Joi.boolean(),
	isOverTheCounter: Joi.boolean(),
	manufacturer: Joi.any(), // TODO: need to double check this, says it is a reference https://www.hl7.org/fhir/medication.html,
	form: Joi.any(), // TODO: need to double check this, says it is a reference https://www.hl7.org/fhir/medication.html,
	ingredient: Joi.any(), // TODO: need to double check this, says it is a reference https://www.hl7.org/fhir/medication.html,
	package: Joi.any() // TODO: need to double check this, says it is a reference https://www.hl7.org/fhir/medication.html,
})

/**
 * @description Validator to verify medication is FHIR compliant
 * @param {object} medication a medication to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the medication, or the errorr if it is invalid.
 */
module.exports = medication => {
	return schemaForMedication.validate(medication)
}
