var metalsmith = require('metalsmith')
var getOptions = require('./options')
var ask = require('./ask')
var path = require('path')

/**
 * Generate object
 *
 * @param name {string}   projectName
 * @param tmp  {Path}     tmp path
 * @param dest {Path}     build path
 * @param done {Function} callback
 */
module.exports = function (name, tmp, dest, done) {
  var opts = getOptions(name, tmp)
  metalsmith(tmp)
    .use(askQuestions(opts))
    .use(update())
    .source('./template')
    .clean(false)
    .destination(path.resolve(dest, name))
    .build(function(err) {
      done(err)
    })
}

/**
 * Gets answers by questions
 *
 * @param opts {Object} meta.json or meta.js
 */
function askQuestions (opts) {
  return function (files, metalsmith, done) {
    ask(opts.prompts, metalsmith.metadata(), done)
  }
}

/**
 * build by template and metadata
 */
function update () {
  return function (files, metalsmith, done) {
    var metaJson = metalsmith.metadata()
    require('./update')(files, metaJson, done)
  }
}