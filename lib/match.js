var metadata = require('read-metadata')
var path = require('path')

function generateMatch(metaJson, tmp, options, done) {
  options = options || {}
  try {
    var extJson = metadata.sync(path.resolve(tmp, 'meta.json'))
  } catch(err) {
    var extJson = {}
  }
  extJson = Object.assign(extJson, options)
  for (var i in extJson) {
    metaJson[i] = extJson[i]
  }
  done()
}

module.exports = function (tmp, options) {
  return function (files, metalsmith, done) {
    generateMatch(metalsmith.metadata(), tmp, options, done)
  }
}