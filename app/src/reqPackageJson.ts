import * as fs from "fs"
import * as path from "path"
import { callerDirname } from 'caller-dirname';


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

export function reqPackageJson(dirname?: string) {
  let attempt = dirname !== undefined ? dirname : callerDirname()
  while (!fs.existsSync(path.join(attempt, "package.json")) || !tryParse(path.join(attempt, "package.json"))) {
    attempt = path.join(attempt, "..")
  }

  return parsed
}


export default reqPackageJson
