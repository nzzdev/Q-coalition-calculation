# Q Coalition Calculation [![Build Status](https://travis-ci.com/nzzdev/Q-coalition-calculation.svg?token=g43MZxbtUcZ6QyxqUoJM&branch=dev)](https://travis-ci.com/nzzdev/Q-coalition-calculation)

**Maintainer**: [benib](https://github.com/benib)

## Table of contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Features](#features)
- [Options](#options)
- [License](#license)

## Installation
```
$ git clone git@github.com:nzzdev/Q-coalation-calculation.git
$ npm install
$ npm run build
```

[to the top](#table-of-contents)

## Development
Install the Q cli and start the Q dev server:
```
$ Q server
```

Run the Q tool:
```
$ node index.js
```

[to the top](#table-of-contents)

## Testing 
The testing framework used in this repository is Code.

Run the tests:
```
$ npm run test
``` 

### Implementing a new test
When changing or implementing...

- A `route`, it needs to be tested in the `e2e-tests.js` file
- Something on the frontend, it needs to be tested in the `dom-tests.js` file

[to the top](#table-of-contents)

##  Tool implentation details
If a tool then it can use this reference to the Q-server documentation about Q-tools:

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

[to the top](#table-of-contents)

## Features


[to the top](#table-of-contents)

## LICENSE
Copyright (c) 2019 Neue Zürcher Zeitung. All rights reserved.

This software is published under the MIT license.