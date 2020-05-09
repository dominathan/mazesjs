const Joi = require('@hapi/joi')

/**
 * Schema object to reference FHIR Coding object
 * http://www.hl7.org/fhir/datatypes.html#Coding
 */
const schemaForCoding = Joi.object().keys({
	system: Joi.string().uri(),
	version: Joi.string(),
	code: Joi.string(),
	display: Joi.string(),
	userSelected: Joi.boolean()
})

/**
 * Schema object to reference FHIR Codeable Concept object
 * http://www.hl7.org/fhir/datatypes.html#CodeableConcept
 */
const schemaForCodeableConcept = Joi.object().keys({
	coding: Joi.array().items(schemaForCoding),
	text: Joi.string()
})

/**
 * @description Validator to verify codeable concept is FHIR compliant
 * @param {object} codeableConcept a codeable concept to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the codeable concept, or the error if it is invalid.
 */
const codeableConceptValidator = codeableConcept => {
	return schemaForCodeableConcept.validate(codeableConcept)
}

module.exports = { schemaForCoding, schemaForCodeableConcept, codeableConceptValidator }
