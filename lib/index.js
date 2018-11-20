const process = require('process')
const path = require('upath')
const matcher = require('matcher')

// TODO: Make this an env variable
const ENVY_CONFIG_PATH = path.resolve(__dirname, '../test/fixtures/example-config')
const pathToValueMap = require(path.join(ENVY_CONFIG_PATH, 'path-to-value-map.json'))
const valueStore = require(path.join(ENVY_CONFIG_PATH, 'value-store.json'))
module.exports = function envy () {
  const cwd = path.normalize(process.cwd())
  pathToValueMap.forEach(
    pathVariableList => {
      // Iterate over path/variable lists
      Object.entries(pathVariableList).forEach(([rawPattern, variableList]) => {
        const pattern = path.normalize(rawPattern)
        // CWD matchers this pattern... so set env variables
        if (matcher.isMatch(cwd, pattern)) {
          variableList.forEach(
            variableName => {
              let value = valueStore[variableName]
              if (value.constructor === Array) {
                value = value.join('') // Join array values with no delimiter
              }
              // TODO: Actually set env variable, fail if no value etc.
              // TODO: Probably just console.log() the names?
              // TODO: Or abbreviate... use chalk?
              console.log(`${variableName}=${value}`)
            }
          )
        }
      })
    }
  )
}
