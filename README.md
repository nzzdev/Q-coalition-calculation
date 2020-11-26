# Q Coalition Calculation [![Build Status](https://travis-ci.com/nzzdev/Q-coalition-calculation.svg?token=g43MZxbtUcZ6QyxqUoJM&branch=dev)](https://travis-ci.com/nzzdev/Q-coalition-calculation)

**Maintainer**: [Manuel Roth](https://github.com/manuelroth)

Q election executive is one tool of the Q toolbox to display results of executive elections. Test it in the [demo](https://editor.q.tools).

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Functionality](#functionality)
- [License](#license)

## Installation

```
git clone git@github.com:nzzdev/Q-coalition-calculation.git
cd ./Q-coalition-calculation
nvm use
npm install
npm run build
```

[to the top](#table-of-contents)

## Configuration

No configuration is needed for this tool.

[to the top](#table-of-contents)

## Development

Start the Q dev server:

```
npx @nzz/q-cli server
```

Run the Q tool:

```
node index.js

```

[to the top](#table-of-contents)

## Testing

The testing framework used in this repository is [Code](https://github.com/hapijs/code).

Run the tests:

```
npm run test
```

### Implementing a new test

When changing or implementing...

- A `route`, it needs to be tested in the `e2e-tests.js` file
- Something on the frontend, it needs to be tested in the `dom-tests.js` file

[to the top](#table-of-contents)

## Deployment

We provide automatically built [docker images](https://hub.docker.com/r/nzzonline/q-coalition-calculation/).
There are three options for deployment:

- Use the provided images
- Build your own docker images
- Deploy the service using another technology

### Use the provided docker images

1. Deploy `nzzonline/q-coalition-calculation` to a docker environment

[to the top](#table-of-contents)

## Functionality

If a tool then it can use this reference to the Q-server documentation about Q-tools:

The tool structure follows the general structure of each Q tool. Further information can be found in [Q server documentation - Developing tools](https://nzzdev.github.io/Q-server/developing-tools.html).

Q Coalition Calculation uses the [svelte framework](https://svelte.technology/guide) to render the markup on server-side.

[to the top](#table-of-contents)

### Features

#### Parties

Each entry will require the name of the party, how many seats they achived and their party color.

##### Implementation details

- The parties will be stored like this:

```
{
  "id": "6d1fc99ca8eb5fa38e8ccca47996701c-1545148795903-312092644",
  "color": {
    "colorCode": "#59d1ff"
  },
  "name": "FDP",
  "seats": 10
}
```

- The color can be either a `colorCode` which will be set as `hex-code` or a `classAttribute` which needs to be a [viz-color](https://github.com/nzzdev/sophie-viz-color/blob/master/vars/general.json)

#### Coalitions

When adding parties to the coalition, the seats will be added and displayed if taken over the majority.

##### Implementation details

- The coalitions will be stores like this:

```
"possibleCoalitions": [
  [
    {
      "id": "6d1fc99ca8eb5fa38e8ccca47996701c-1545148795903-312092644"
    },
    {
      "id": "6d1fc99ca8eb5fa38e8ccca47996701c-1545148811272-606674397"
    },
    {
      "id": "6d1fc99ca8eb5fa38e8ccca47996701c-1545148811272-606674397"
    }
  ]
]
```

- The `id` of the party will be added to an array

### Options

There are no options for this tool.

#### Display Options

Display options can be set before embedding the graphic in the article.

##### hideTitle

Allows to hide the title

[to the top](#table-of-contents)

## License

Copyright (c) 2019 Neue Zürcher Zeitung. All rights reserved.

This software is published under the [MIT](LICENSE) license.

[to the top](#table-of-contents)
