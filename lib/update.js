var async = require('async')
var render = require('consolidate').ejs.render

module.exports = function (files, metaJson, done) {
  var keys = Object.keys(files)
  async.each(keys, function (file, next) {
    var str = files[file].contents.toString()
    render(str, metaJson, function (err, res) {
      if (err) return next(err)
      files[file].contents = new Buffer(res)
      next()
    })
  }, done)
}