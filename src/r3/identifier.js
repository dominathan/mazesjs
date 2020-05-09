const Joi = require('@hapi/joi')
const { schemaForCodeableConcept } = require('./codeable-concept')
const { schemaForPeriod } = require('./period')

/**
 * Schema object to reference FHIR Identifier object
 * http://www.hl7.org/fhir/datatypes.html#Identifier
 */
const schemaForIdentifier = Joi.object().keys({
	use: Joi.string()
		.valid('usual', 'official', 'temp', 'secondary')
		.required(),
	type: schemaForCodeableConcept,
	system: Joi.string()
		.uri()
		.required(),
	value: Joi.string(),
	period: schemaForPeriod
})

/**
 * @description Validator to verify identifier is FHIR compliant
 * @param {object} identifier a identifier to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the identifier, or the error if it is invalid.
 */
const identifierValidator = identifier => {
	return schemaForIdentifier.validate(identifier)
}

module.exports = { schemaForIdentifier, identifierValidator }
