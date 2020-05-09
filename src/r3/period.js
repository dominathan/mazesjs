const Joi = require('@hapi/joi')

/**
 * Schema object to reference FHIR Period object
 * http://www.hl7.org/fhir/datatypes.html#Period
 */
const schemaForPeriod = Joi.object().keys({
	start: Joi.date(),
	end: Joi.date()
})

/**
 * @description Validator to verify period is FHIR compliant
 * @param {object} period a period to validate as FHIR compliant
 * @return {object} returns {error, value}.  Null is there is no error with the period, or the error if it is invalid.
 */
const periodValidator = period => {
	return schemaForPeriod.validate(period)
}

module.exports = { schemaForPeriod, periodValidator }
