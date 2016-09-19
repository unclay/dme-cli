var metadata = require('read-metadata')
var path = require('path')

module.exports = (tmp, options) => {
  options = options || {}
  var extJson
  try {
    extJson = metadata.sync(path.resolve(tmp, 'meta.json'))
  } catch(err) {
    extJson = {}
  }
  return Object.assign(options, extJson)
}