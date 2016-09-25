var metadata = require('read-metadata')
var path = require('path')
var exists = require('fs').existsSync
var validateNpmPackageName = require('validate-npm-package-name')
var gituser = require('./git-user')

module.exports = (name, tmp) => {
  var opts = getMetadata(tmp)
  setDefault(opts, 'name', name)
  setDefault(opts, 'author', gituser())
  setValidateName(opts)
  return opts
}

/**
 * Gets metadata from meta.json
 * @param tmpPath {String} template path
 */
function getMetadata (tmpPath) {
  var json = path.resolve(tmpPath, 'meta.json')
  var js = path.resolve(tmpPath, 'meta.js')
  var opts = {}
  if (exists(json)) {
    opts = metadata.sync(json)
  } else if (exists(js)) {
    var req = require(js)
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object')
    }
    opts = req
  }
  return opts
}


/**
 * Set medadata prompts default value
 * @param opts {Object} metadata
 * @param key  {String} metadata.prompts.key
 * @param val  {String} metadata.prompts.key => val
 */
function setDefault (opts, key, val) {
  var prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || Object.prototype.toString.call(prompts[key]) !== '[object Object]' ) {
    prompts[key] = {
      type: 'string',
      default: val 
    }
  } else {
    prompts[key]['default'] = val 
  }
}

/**
 * Set package name's validate
 * @param opts {Object} metadata
 */
function setValidateName (opts) {
  opts.prompts.name.validate = function (name) {
    var ret = validateNpmPackageName(name)
    if (!ret.validForNewPackages) {
      var errors = (ret.errors || []).concat(ret.warnings || [])
      return 'Sorry, ' + errors.join(' and ') + '.'
    } else {
      return true
    }
  }
}
