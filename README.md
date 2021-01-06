# Require package.json

Load and parse nearest package.json, relative to the callers directory.

## Installation

```shell
 $ npm i req-package-json
```

## Usage


```ts
import reqPackageJson from "req-package-json"

console.log(reqPackageJson()) // {name: "whatever", version: "1.0.0"}
```

### Advanced

```ts
import { reqPackageJson } from "req-package-json"

reqPackageJson() // relative to current dir (where the function is called)
reqPackageJson("dir/where/to/start/searching") // relative to given dir
```

## Contribute

All feedback is appreciated. Create a pull request or write an issue.
