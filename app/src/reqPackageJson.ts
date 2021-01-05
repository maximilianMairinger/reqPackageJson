import * as fs from "fs"
import * as path from "path"


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

export function reqPachaeJson(dirname: string) {
  let attempt = dirname
  while (!fs.existsSync(path.join(attempt, "package.json")) || !tryParse(path.join(attempt, "package.json"))) {
    attempt = path.join(attempt, "..")
  }

  return parsed
}


export default reqPachaeJson(path.resolve(__dirname, "../../../../../"))
