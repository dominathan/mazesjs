const Joi = requrie('@hapi/joi')
const validate = require('../utils/validator')

const medicationResourceSchema = Joi.object({
  resourceType: Joi.string().valid('Medication').required(),
  // from Resource: id, meta, implicitRules, and language
  // from DomainResource: text, contained, extension, and modifierExtension
  identifier: Joi.array().items(Joi.object({})), // Business identifier for this medication
  code: Joi.object({
    coding: Joi.array().items(
      Joi.object({
        system: Joi.string(),
        code: Joi.string(),
        display: Joi.string()
      })
    ),
    text: Joi.string()
  }), // Codes that identify this medication
  status: Joi.string().valid('active', 'inactive', 'entered-in-error'),
  manufacturer: Joi.object({
    reference: Joi.string()
  }), // Manufacturer of the item
  form: Joi.object({
    coding: Joi.array().items(
      Joi.object({
        system: Joi.string(),
        code: Joi.string(),
        display: Joi.string()
      })
    ),
    text: Joi.string()
  }), // powder | tablets | capsule +
  amount: Joi.object({}), // Amount of drug in package
  ingredient: Joi.array().items(
    Joi.object({
      // Active or inactive ingredient
      // item[x]: The actual ingredient or content. One of these 2:
      itemCodeableConcept: Joi.object({
        coding: Joi.array().items(
          Joi.object({
            system: Joi.string(),
            code: Joi.string(),
            display: Joi.string()
          })
        ),
        text: Joi.string()
      }),
      itemReference: Joi.object({
        reference: Joi.string()
      }),
      isActive: Joi.boolean(), // Active ingredient indicator
      strength: Joi.object({}) // Quantity of ingredient present
    })
  ),
  batch: Joi.object({
    // Details about packaged medications
    lotNumber: Joi.string(), // Identifier assigned to batch
    expirationDate: Joi.datetime() // When batch will expire
  })
})

module.exports = validate(medicationResourceSchema)
