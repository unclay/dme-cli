'use strict'
var inquirer = require('inquirer')
var async = require('async')

/**
 * Prompt type map
 */
var promptMap = {
  string: 'input',
  boolean: 'confirm'
}

/**
 * Prompt default value map
 */
var defaultMap = {
  string: '',
  boolean: false
}

/**
 * Question After, set metadata
 *
 * @param data   {Object} metadata
 * @param key    {String} key
 * @param prompt {Object} prompt question
 */
function prompt (data, key, prompt, done) {
  inquirer
    .prompt([{
      type: promptMap[prompt.type] || prompt.type,
      name: key,
      message: prompt.message || prompt.label || key,
      default: prompt.default || defaultMap[prompt.type],
      choices: prompt.choices || [],
      validate: prompt.validate || function () { return true }
    }])
    .then(function (answers) {
      data[key] = answers[key]
      done()
    })
}

module.exports = function (prompts, data, done) {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next)
  }, done)
}
