const process = require('process')
const path = require('upath')
const matcher = require('matcher')
const template = require('lodash.template')

module.exports = function envy (options) {
  // Find dir the Envy config is in, either by options.envyRepoPath or $ENVY_REPO_PATH
  let envyRepoPath
  if (options) {
    envyRepoPath = options.envyRepoPath
  }
  if (!envyRepoPath) {
    envyRepoPath = process.env.ENVY_REPO_PATH
  }
  if (!envyRepoPath) {
    throw new Error(`Unable to find Envy repo, have you set the ENVY_REPO_PATH environment variable defined? Please see README.md: https://github.com/wmfs/envy`)
  }

  // Load-up config
  const pathToValueMap = require(path.join(envyRepoPath, 'path-router.json'))
  const valueStore = require(path.join(envyRepoPath, 'value-store.json'))
  const cwd = path.normalize(process.cwd())

  let matchCount = 0
  pathToValueMap.forEach(
    routeConfig => {
      const pattern = path.normalize(routeConfig.pattern)
      if (matcher.isMatch(cwd, pattern)) {
        routeConfig.variableNames.forEach(
          variableName => {
            let value = valueStore[variableName]
            if (value.constructor === Array) {
              value = value.join('') // Join array values with no delimiter
            }
            // TODO: Actually set env variable, fail if no value etc.
            // TODO: Probably just console.log() the names?
            // TODO: Or abbreviate... use chalk?
            const compiledTemplate = template(value)
            console.log(`${variableName}=${compiledTemplate(valueStore)}`)
            matchCount++
          }
        )
      }
    }
  )
  console.log(`Set ${matchCount} variable${matchCount === 1 ? '' : 's'}`)

  // pathToValueMap.forEach(
  //   pathVariableList => {
  //     // Iterate over path/variable lists
  //     Object.entries(pathVariableList).forEach(([rawPattern, variableList]) => {
  //       const pattern = path.normalize(rawPattern)
  //       // CWD matchers this pattern... so set env variables
  //       if (matcher.isMatch(cwd, pattern)) {
  //         variableList.forEach(
  //           variableName => {
  //             let value = valueStore[variableName]
  //             if (value.constructor === Array) {
  //               value = value.join('') // Join array values with no delimiter
  //             }
  //             // TODO: Actually set env variable, fail if no value etc.
  //             // TODO: Probably just console.log() the names?
  //             // TODO: Or abbreviate... use chalk?
  //             console.log(`${variableName}=${value}`)
  //           }
  //         )
  //       }
  //     })
  //   }
  // )
}
