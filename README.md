# react-connect-rx

<h1>WIP</h1>
<h2>not stable</h2>
At this stage, I do not recommend to use this. First - it is so small, that you might be better to
implement your own (similar or maybe better) solution. Then - it is not very well tested and the api may
be changing quickly.
The reason I have published this code is that I will use this little library for couple of my projects and I intend to work on it,
while working on the projects.
> Connect RxJS and React

[![NPM](https://img.shields.io/npm/v/react-connect-rx.svg)](https://www.npmjs.com/package/react-connect-rx) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

npm
```bash
npm install --save react-connect-rx
```
yarn
```bash
yarn add react-connect-rx
```

## Usage

```jsx
import React from 'react'
import {interval} from 'rxjs'
import {map} from 'rxjs/operators'
import {updateWithRx} from 'react-connect-rx'

const Counter = ({count}) =>
    <div>{count}</div>

const count$ = interval(1000).pipe(
    map(count => ({count}))
)

const ConnectedCounter = updateWithRx(Counter)([count$])

const App = () =>
    <ConnectedCounter count={0} />

```
[more examples](https://github.com/JanNosal/react-connect-rx/tree/master/example)

## License

MIT © [Jan Nosal](https://github.com/JanNosal)
