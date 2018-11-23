const childProcess = require('child_process')

module.exports = function setWindowsEnvVariable (variableName, value) {
  childProcess.execSync(
    `setx ${variableName} "${value}"`
  )
}
