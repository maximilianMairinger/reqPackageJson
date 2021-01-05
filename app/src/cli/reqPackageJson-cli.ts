#!/usr/bin/env node
import reqPackageJson from "../reqPackageJson"
import { program } from "commander"
import config from "./packageJsonConfig"


program
  .version(config.version)
  .name(config.name)

program
  .option('-s, --silent', 'silence stdout')
.parse(process.argv)


reqPackageJson(...program.args)
