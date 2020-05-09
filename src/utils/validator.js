module.exports = (schema) => {
  return function (object) {
    schema.validate(object, {
      abortEarly: false
    })
  }
}
