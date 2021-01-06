# Require package.json

Load and parse nearest package.json, relative to the callers directory.

## Installation

```shell
 $ npm i req-package-json
```

## Usage


```ts
import config from "req-package-json"

console.log(config) // {name: "whatever", version: "1.0.0"}
```

### Advanced

```ts
import { reqPackageJson } from "req-package-json"

reqPackageJson("dir/where/to/start/searching")
```

## Contribute

All feedback is appreciated. Create a pull request or write an issue.
