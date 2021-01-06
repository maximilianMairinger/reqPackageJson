import * as fs from "fs"
import * as path from "path"


const regex = /(?<=\().*\.(js|mjs)(?=((\:[0-9][0-9]*)(\:[0-9][0-9]*))\))/gm;
function getFileNamesOfStacktrace(str: string) {
  return str.match(regex).reverse()
}

function getCallerFilenames() {
  try {
    throw new Error()
  }
  catch(e) {
    return getFileNamesOfStacktrace(e.stack)
  }
}

export function callerFunctionName(atStack = 0) {
  return getCallerFilenames()[atStack + 1]
}

let parsed: any
function tryParse(file: string) {
  try {
    parsed = JSON.parse(fs.readFileSync(file).toString())
    return true
  }
  catch(e) {
    return false
  }
}

export function reqPackageJson(dirname: string = callerFunctionName()) {
  let attempt = dirname
  while (!fs.existsSync(path.join(attempt, "package.json")) || !tryParse(path.join(attempt, "package.json"))) {
    attempt = path.join(attempt, "..")
  }

  return parsed
}


export default reqPackageJson
