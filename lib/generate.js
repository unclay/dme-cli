var metalsmith = require('metalsmith')

/**
 * @param name {string}  projectName
 * @param tmp {pwd}      tmp pwd 
 */
module.exports = function (name, tmp, dest, done) {
  metalsmith(tmp)
    .use(extend(tmp, {
      name: name,
      author: ''
    }))
    .use(update())
    .source('./template')
    .clean(false)
    .destination(dest)
    .build(function(err) {
      done(err)
    })
}

/**
 * Extend metadata
 *
 * @param tmp {path}
 * @param options {object}
 */
function extend (tmp, options) {
  return function (files, metalsmith, done) {
    var metadata = metalsmith.metadata()
    var metaJson = require('./options')(tmp, options)
    for (var i in metaJson) {
      metadata[i] = metaJson[i]
    }
    done()
  }
}


/**
 * build by template and metadata
 *
 * @param tmp {path}
 * @param options {object}
 */
function update () {
  return function (files, metalsmith, done) {
    var metaJson = metalsmith.metadata()
    require('./update')(files, metaJson, done)
  }
}