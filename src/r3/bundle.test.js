const bundleValidator = require('./bundle')

describe('Bundle Validator', () => {
	test('it should validate a good Bundle', () => {
		const goodBundle = {
			resourceType: 'Bundle',
			type: 'collection',
			entry: [{ resource: { resourceType: 'Medication' } }]
		}

		const { error, value } = bundleValidator(goodBundle)

		expect(error).toBe(undefined)
		expect(value).toEqual(goodBundle)
	})

	test('should return an error on a bad bundle', () => {
		const badBundle = {
			resourceType: 'Bundle',
			type: 'weiner',
			entry: [{ resource: { resourceType: 'Medication' } }]
		}

		const { error, value } = bundleValidator(badBundle)

		expect(error).not.toBe(null)
		expect(error.details[0].message).toEqual(
			'"type" must be one of [document, message, transaction, transaction-response, batch, batch-response, history, searchset, collection]'
		)
	})
})
