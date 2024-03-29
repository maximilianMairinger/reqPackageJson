import * as fs from "fs"
import * as path from "path"


const regex = /(?<=\().*\.(js|mjs)(?=((\:[0-9][0-9]*)(\:[0-9][0-9]*))\))/gm;
function getFileNamesOfStacktrace(str: string) {
  const ar = [] as string[]
  str.match(regex)?.forEach((matchStr) => {
    ar.push(matchStr)
  })
  return ar
}

export function getCallerFilenames() {
  try {
    throw new Error()
  }
  catch(e) {
    const fileNames = getFileNamesOfStacktrace(e.stack)
    fileNames.shift()
    return fileNames
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

export function reqPackageJson(dirname: string = callerFunctionName(1)) {
  reqPackagePath(dirname)
  return parsed
}

export function reqPackagePath(dirname: string = callerFunctionName(1)) {
  let attempt = dirname
  while (!fs.existsSync(path.join(attempt, "package.json")) || !tryParse(path.join(attempt, "package.json"))) {
    attempt = path.join(attempt, "..")
    if (attempt === "..") throw new Error(`Could not find package.json in any parent directory of ${dirname}`)
  }

  return attempt
}


export default reqPackageJson
