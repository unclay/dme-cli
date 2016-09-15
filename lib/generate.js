var metalsmith = require('metalsmith')
var path = require('path')
var async = require('async')
var Handlebars = require('handlebars')
var metadata = require('read-metadata')

/**
 * @param name {string}  projectName
 * @param tmp {pwd}      tmp pwd 
 */
module.exports = function (name, tmp) {
  metalsmith(tmp)
    .use(require('./match')(tmp, {
      name: name,
      author: ''
    }))
    .use(require('./update'))
    .source('./template')
    .destination(path.resolve(process.cwd(), name))
    .build(function(err) {
      if (err) throw err;
    });
}