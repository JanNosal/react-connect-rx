# react-connect-rx
> Connect React with RxJS

[docs and examples](https://jannosal.github.io/react-connect-rx/)

This mini library provides two curried functions (or HOC if you wish) to connect React component with RxJS:
`updateWithRx` and `connectRx`.
These functions are basically the same, `connectRx` only wraps `updateWithRx` to change the order of the argument lists,
so it accepts the component in the last argument list.

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

## API

> ### updateWithRx

#### type signature
```ts
import React, {ComponentType, ComponentClass} from 'react'
import {Observable} from "rxjs"

export type UpdateWithRx =
<P extends Object>(Cmp: ComponentType<P>) => (obs: Array<Observable<Partial<P>>>) => ComponentClass<P, P>
```

#### usage
```js
import ReactDOM from 'react-dom';
import {updateWithRx} from 'react-connect-rx'

const Counter = ({count}) =>
        <div>{count}</div>

const count$ = interval(1000).pipe(
    map(count => ({count}))
)

const observables = [count$]

const UpdatingCounter = updateWithRx(Counter)(observables)

ReactDOM.render(
  <UpdatingCounter count={0} />,
  document.getElementById('root')
);

```

> ### connectRx

#### type signature
```ts
import React, {ComponentType, FunctionComponent} from "react"
import {Observable} from "rxjs"

export type ConnectRx =
<P extends Object>(obs: Observable<Partial<P>>[]) => (props: P) => (Cmp: ComponentType<P>) => FunctionComponent
```

#### usage
```tsx
import ReactDOM from 'react-dom';
import {connectRx} from 'react-connect-rx'

const Counter = ({count}) =>
        <div>{count}</div>

const count$ = interval(1000).pipe(
    map(count => ({count}))
)

const observables = [count$]

const props = {
    count: 0
}

const ConnectedCounter = connectRx<CounterProps>(observables)(props)(Counter)

ReactDOM.render(
  <ConnectedCounter />,
  document.getElementById('root')
);

```

## Notes
In the arguments list, which accepts the array of observables,
you can pass any number of observables, which can update the same subgroup of props a different one,
or have an interception. See more in the [docs and examples](https://jannosal.github.io/react-connect-rx/).

## License

MIT © [Jan Nosal](https://github.com/JanNosal)