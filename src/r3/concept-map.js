const Joi = require('@hapi/joi')
const { schemaForCodeableConcept } = require('./codeable-concept')
const { schemaForIdentifier } = require('./identifier')

/**
 * Schema object to reference FHIR Reference object
 * http://www.hl7.org/fhir/references.html#Reference
 */
const schemaForReference = Joi.object().keys({
	reference: Joi.string(),
	identifier: schemaForIdentifier,
	display: Joi.string()
})

/**
 * Schema for Target object embedded within Element object mentioned below
 */
const schemaForTarget = Joi.object().keys({
	code: Joi.string(),
	display: Joi.string(),
	equivalence: Joi.string().valid(
		'relatedto',
		'equivalent',
		'equal',
		'wider',
		'subsumes',
		'narrower',
		'specializes',
		'inexact',
		'unwatched',
		'disjoint'
	),
	comment: Joi.string()
})

/**
 * Schema for Element object embedded within the Group object mentioned below
 */
const schemaForElement = Joi.object().keys({
	code: Joi.string(),
	display: Joi.string(),
	target: Joi.array().items(schemaForTarget)
})

/**
 * Schema object for Group object embedded within the FHIR Concept-Map
 * http://www.hl7.org/fhir/conceptmap.html
 */
const schemaForGroup = Joi.object().keys({
	source: Joi.string().uri(),
	sourceVersion: Joi.string(),
	target: Joi.string().uri(),
	targetVersion: Joi.string(),
	element: Joi.array()
		.items(schemaForElement)
		.required(),
	unmapped: Joi.object({
		mode: Joi.string()
			.valid('provided', 'fixed', 'other-map')
			.required(),
		code: Joi.string(),
		display: Joi.string(),
		url: Joi.string().uri()
	})
})

/**
 * Run the FDB Concept-Map through Joi validator to ensure it meets FHIR standard
 * http://www.hl7.org/fhir/conceptmap.html
 */
const schemaForConceptMap = Joi.object({
	resourceType: Joi.string()
		.valid('ConceptMap')
		.required(),
	id: Joi.string(),
	url: Joi.string().uri(),
	identifier: schemaForIdentifier,
	version: Joi.string(),
	name: Joi.string(),
	title: Joi.string(),
	status: Joi.string()
		.valid('draft', 'active', 'retired', 'unknown')
		.required(),
	date: Joi.date(),
	publisher: Joi.string(),
	description: Joi.string(),
	jurisdiction: Joi.array().items(schemaForCodeableConcept),
	purpose: Joi.string(),
	copyright: Joi.string(),
	sourceUri: Joi.string().uri(),
	sourceReference: schemaForReference,
	targetUri: Joi.string().uri(),
	targetReference: schemaForReference,
	group: Joi.array().items(schemaForGroup)
})

/**
 * @description Validator to verify Concept Map is FHIR compliant
 * @param {object} conceptMap a Concept Map to validate as FHIR compliant
 * @return {object} returns {error, value}. Null if there is no error with the condition, or the error if it is invalid.
 */
module.exports = conceptMap => {
	return schemaForConceptMap.validate(conceptMap)
}
