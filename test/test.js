const generate = require('../lib/generate')
const getOptions = require('../lib/options')
const { expect } = require('chai')
const path = require('path')
const render = require('consolidate').ejs.render
const async = require('async')
const fs = require('fs')
const inquirer = require('inquirer')
const exists = fs.existsSync
const read = fs.readFileSync

const MOCK_TMP_BUILD_NAME = 'mock-tmp-build'
const MOCK_TMP_BUILD_PATH = path.resolve('./test')
const MOCK_TMP_REPO_PATH = path.resolve('./test/mock-tmp')
const MOCK_TMP_REPO_JS_PATH = path.resolve('./test/mock-tmp-js')

function monkeyPatchInquirer (answers) {
  inquirer.prompt = (questions) => {
    const key = questions[0].name
    const _answers = {}
    const validate = questions[0].validate
    if (typeof validate === 'function') {
      const valid = validate(answers[key])
      if (valid !== true) {
        throw new Error(valid)
      }
    }
    
    _answers[key] = answers[key]
    return new Promise(function (resolve) {
      resolve(_answers)
    })
  }
}

describe('dme-cli',() => {
  const answers = {
    name: MOCK_TMP_BUILD_NAME,
    description: 'dme project from unit test'
  }

  it('read meta from meta.json', () => {
    var metadata = getOptions(MOCK_TMP_BUILD_NAME, MOCK_TMP_REPO_PATH)
    expect(metadata).to.be.an('object')
    expect(metadata).to.have.property('prompts')
    expect(metadata.from).to.equal('from-mock-tmp')
  })

  it('read meta from meta.js', () => {
    var metadata = getOptions(MOCK_TMP_BUILD_NAME, MOCK_TMP_REPO_JS_PATH)
    expect(metadata).to.be.an('object')
    expect(metadata).to.have.property('prompts')
    expect(metadata.from).to.equal('from-mock-tmp-js')
  })

  it('generate dme project', done => {
    monkeyPatchInquirer(answers)
    generate(MOCK_TMP_BUILD_NAME, MOCK_TMP_REPO_PATH, MOCK_TMP_BUILD_PATH, err => {
      if (err) 
        done(err)

      expect(exists(`${MOCK_TMP_BUILD_PATH}/${MOCK_TMP_BUILD_NAME}/README.md`)).to.be.equal(true)
      expect(exists(`${MOCK_TMP_BUILD_PATH}/${MOCK_TMP_BUILD_NAME}/package.json`)).to.be.equal(true)
      expect(exists(`${MOCK_TMP_BUILD_PATH}/${MOCK_TMP_BUILD_NAME}/src/index.js`)).to.be.equal(true)
      expect(exists(`${MOCK_TMP_BUILD_PATH}/${MOCK_TMP_BUILD_NAME}/src/demos.vue`)).to.be.equal(true)
      
      done()
    })
  })

  it('build files are equal to the template compiled files', done => {
    async.eachSeries([
      'README.md',
      'package.json',
      'src/demos.vue',
      'src/index.js',
    ], function (file, next) {
      const strMockBuild = read(`${MOCK_TMP_BUILD_PATH}/${MOCK_TMP_BUILD_NAME}/${file}`, 'utf-8')
      const strMockRepo = read(`${MOCK_TMP_REPO_PATH}/template/${file}`, 'utf-8')
      render(strMockRepo, answers, function (err, res) {
        if (err)
          return next(err)
        expect(res).to.equal(strMockBuild)
        next()
      })
    }, done)
  })

})