# node-fhir-validator

### USAGE

```js
const nodeFhirValidator = require('node-fhir-validator').R4
const { Medication, Patient } = nodeFhirValidator

const { value, error } = Medication({ resourceType: 'Medication' })
console.log('error: ', error)
// 'status is required'
```
