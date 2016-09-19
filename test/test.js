const generate = require('../lib/generate')
const getOptions = require('../lib/options')
const { expect } = require('chai')
const path = require('path')
const render = require('consolidate').ejs.render
const async = require('async')
const fs = require('fs')
const exists = fs.existsSync
const read = fs.readFileSync
// const metalsmith = require('metalsmith')

const MOCK_TMP_BUILD_NAME = 'mock-tmp-build'
const MOCK_TMP_BUILD_PATH = path.resolve('./test/mock-tmp-build')
const MOCK_TMP_REPO_PATH = path.resolve('./test/mock-tmp')

describe('dme-cli',() => {

  it('read meta from meta.json', () => {
    var metadata = getOptions(MOCK_TMP_REPO_PATH)
    expect(metadata).to.be.an('object')
    expect(metadata).to.have.property('name')
    expect(metadata).to.have.property('description')
  })

  it('extend meta by meta.json', () => {
    var metadata = getOptions(MOCK_TMP_REPO_PATH, {
      author: 'dme author'
    })
    expect(metadata).to.be.an('object')
    expect(metadata).to.have.property('name')
    expect(metadata).to.have.property('description')
    expect(metadata).to.have.property('author')
  })
  
  it('generate dme', done => {
    generate(MOCK_TMP_BUILD_NAME, MOCK_TMP_REPO_PATH, MOCK_TMP_BUILD_PATH, err => {
      if (err)
        done(err)

      expect(exists(`${MOCK_TMP_BUILD_PATH}/README.md`)).to.be.equal(true)
      expect(exists(`${MOCK_TMP_BUILD_PATH}/package.json`)).to.be.equal(true)
      expect(exists(`${MOCK_TMP_BUILD_PATH}/src/index.js`)).to.be.equal(true)
      expect(exists(`${MOCK_TMP_BUILD_PATH}/src/demos.vue`)).to.be.equal(true)

      const metadata = getOptions(MOCK_TMP_REPO_PATH)
      async.eachSeries([
        'README.md',
        'package.json',
        'src/demos.vue',
        'src/index.js',
      ], function (file, next) {
        const strMockBuild = read(`${MOCK_TMP_BUILD_PATH}/${file}`, 'utf-8')
        const strMockRepo = read(`${MOCK_TMP_REPO_PATH}/template/${file}`, 'utf-8')
        render(strMockRepo, metadata, function (err, res) {
          if (err)
            return next(err)
          expect(res).to.equal(strMockBuild)
          next()
        })
      }, done)
    })
  })

})