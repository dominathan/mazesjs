const Joi = require('@hapi/joi')

/**
 * @description Run the fdb medication-request through Joi validator to ensure it meets FHIR standards
 * see https://www.hl7.org/fhir/medicationrequest.html
 */
const schemaForMedicationRequest = Joi.object({
	resourceType: Joi.string()
		.valid('MedicationRequest')
		.required(),
	id: Joi.string(),
	identifier: Joi.object({
		system: Joi.string(),
		value: Joi.string() //FDBItem.SigID
	}).required(),
	intent: Joi.string()
		.valid('proposal')
		.required(),
	medicationCodeableConcept: Joi.object({
		coding: Joi.array().items(
			Joi.object({
				system: Joi.string(),
				code: Joi.string()
			})
		)
	}),
	subject: Joi.object({
		reference: Joi.string()
	}),
	supportingInformation: Joi.object({
		reference: Joi.object({
			resourceType: Joi.string().valid('Parameters'),
			parameters: Joi.array().items(
				Joi.object({
					name: Joi.string(),
					value: Joi.string()
				})
			)
		})
	}),
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
				system: Joi.string().uri(),
				value: Joi.number(), // FDBItem.LowAdminAmount
				unit: Joi.string(), // FDBItem.AdminUnitDesc
				code: Joi.string() // FDBItem.UnitID
			}),
			additionalInstruction: Joi.array().items(
				Joi.object({
					coding: Joi.object({
						system: Joi.string().uri(),
						display: Joi.string(),
						userSelected: Joi.boolean()
					}),
					text: Joi.string()
				})
			)
		})
	)
})

/**
 * @description Validator to verify medication-request is FHIR compliant
 * @param {object} medicationRequest a medicationRequest to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the medicationRequest, or the errorr if it is invalid.
 */
module.exports = medicationRequest => {
	return schemaForMedicationRequest.validate(medicationRequest)
}
