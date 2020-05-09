const Joi = require('@hapi/joi')

/**
 * @description Run the fdb dosageInstructions through Joi validator to ensure it meets FHIR standards
 * see https://www.hl7.org/fhir/dosageinstruction.html
 */
const schemaForDosageInstruction = Joi.object({
	dosageInstruction: Joi.array().items(
		Joi.object({
			text: Joi.string().required(), //FDBItem.SigText
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
			}),
			route: Joi.object({
				coding: Joi.array().items(
					Joi.object({
						code: Joi.string(), // FDBItem.RouteShortDesc
						display: Joi.string() // FDBItem.RouteLongDesc
					})
				)
			}),
			doseQuantity: Joi.object({
				value: Joi.number(), // FDBItem.LowAdminAmount
				unit: Joi.string(), // FDBItem.AdminUnitDesc
				code: Joi.string() // FDBItem.UnitID
			})
		})
	)
})

/**
 * @description Validator to verify dosageInstruction is FHIR compliant
 * @param {object} dosageInstruction a dosageInstruction to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the dosageInstruction, or the error if it is invalid.
 */
module.exports = dosageInstruction => {
	return schemaForDosageInstruction.validate(dosageInstruction)
}
