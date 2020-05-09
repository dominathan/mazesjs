const Joi = require('@hapi/joi')
const { schemaForCoding, schemaForCodeableConcept } = require('./codeable-concept')
const { schemaForIdentifier } = require('./identifier')
const { schemaForPeriod } = require('./period')

/**
 * Schema object to reference the Parameter key/value pairs within the Parameter object
 * http://www.hl7.org/fhir/parameters.html
 */
const schemaForParamTypes = Joi.object().keys({
	name: Joi.string().required(),
	valueInteger: Joi.number().integer(),
	valueDecimal: Joi.number(),
	valueDateTime: Joi.date(),
	valueDate: Joi.date(),
	valueString: Joi.string(),
	valueUri: Joi.string().uri(),
	valueBoolean: Joi.boolean(),
	valueCode: Joi.string(),
	valueCoding: schemaForCoding,
	valueCodeableConcept: schemaForCodeableConcept,
	valueIdentifier: schemaForIdentifier,
	resource: Joi.object(),
	valuePeriod: schemaForPeriod
})

/**
 * Schema object to reference the Parameter object within the Parameters object
 * http://www.hl7.org/fhir/parameters.html
 */
const schemaForParameter = schemaForParamTypes.keys({
	part: Joi.array().items(schemaForParamTypes)
})

/**
 * Schema object to reference FHIR Parameters object
 * http://www.hl7.org/fhir/parameters.html
 */
const schemaForParameters = Joi.object().keys({
	resourceType: Joi.string()
		.valid('Parameters')
		.required(),
	id: Joi.string(),
	parameter: Joi.array().items(schemaForParameter)
})

/**
 * @description Validator to verify parameters is FHIR compliant
 * @param {object} parameters a parameters object to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the parameters, or the error if it is invalid.
 */
const parametersValidator = parameters => {
	return schemaForParameters.validate(parameters)
}

module.exports = { schemaForParameters, parametersValidator }
