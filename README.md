# react-connect-rx
> Connect React with RxJS

## Simple functions to connect React component with RxJS observables
This mini library provides two curried functions to connect React component with RxJS: `updateWithRx` and `connectRx`.
These functions are basically the same, `connectRx` only wraps `updateWithRx` to change the order of the arguments,
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

## Usage

### updateWithRx
```tsx
type updateWithRx<Props> =
    (Component: ComponentType<Props>)
        => (observables: Observable<Partial<Props>>[])
            => (props: Props)
                => ComponentType<Props>
```
Whole `updateWithRx` function works with Props object which is supposed to have the same type for every argument list. It is quite simple.
Lets say we have a `Counter` component like this:

```jsx
const Counter = ({label, count}) =>
    <>
        <div>{label}</div>
        <div>{count}</div>
    </>
```

The observable we will use to update the `Counter` is supposed to resolve to the object with keys matching the properties of the component we want to connect and (obviously) values with the new values we want to assing to the properties when the observable emits.

```jsx
import {iterval} from "rxjs"
import {map} from "rxjs/operators"

const count$ = interval(1000).pipe(
    map(count => ({count}))
)
```

Maybe you have noticed the `count$` observable will resolve to object which contains only the `count` property from our `Counter` component. If we only want this property to be updated by the `count$` observable, this is correct. We only return object with keys matching the properties we want to update.

Lets connect our `Counter` component and the `count$` observable.

```jsx
const ConnectedCounter = updateWithRx(Counter)([count$])
```

Finally, we can simly render our `ConnectedCounter` component as usual. We also pass the original properties to the component, which will serve as defaults, untill they are updated with values from `count$`.

```jsx
const App = () =>
    <ConnectedCounter label={"simple counter"} count={0} />
```

Full code:
```jsx
import React from 'react'
import {interval} from 'rxjs'
import {map} from 'rxjs/operators'
import {updateWithRx} from 'react-connect-rx'

const Counter = ({label, count}) =>
    <>
        <div>{label}</div>
        <div>{count}</div>
    </>

const count$ = interval(1000).pipe(
    map(count => ({count}))
)

const ConnectedCounter = updateWithRx(Counter)([count$])

const App = () =>
    <ConnectedCounter label={"simple counter"} count={0} />

```
Note that in the second arguments list, which accepts the array of observables, you can pass any number of observables, which can update the same same subgroup of props a different one, or have an iterception.

```jsx
import React from 'react'
import {interval, timer} from 'rxjs'
import {map, mapTo} from 'rxjs/operators'
import {updateWithRx} from 'react-connect-rx'

const Counter = ({label, count, note}) =>
    <>
        <h4>{label}</h4>
        <div>{count}</div>
        <div>{note}</div>
    </>

const count$ = interval(1000).pipe(
    map(count => ({count}))
)

const labelOne$ = timer(2000, 10000).pipe(
    mapTo({label: "SIMPLE COUNTER"})
)

const labelTwo$ = timer(4000, 10000).pipe(
    mapTo({label: "Simple counter"})
)

const labelThreeWithNote$ = timer(6000, 10000).pipe(
    mapTo({label: "SiMpLe CoUnTeR", note: "Hey"})
)

const labelFourWithNote$ = timer(8000, 10000).pipe(
    mapTo({label: "sImPlE cOuNtEr", note: "Hello"})
)

const observables = [count$, labelOne$, labelTwo$, labelThreeWithNote$, labelFourWithNote$]

const ConnectedCounter = updateWithRx(Counter)(observables)

export default function() {
    return <ConnectedCounter label={"Simple counter"} count={0} note={"Hi"} />
}
```
### connectRx
```tsx
type connectRx<Props> =
    => (observables: Observable<Partial<Props>>[])
        => (props: Props)
            => (Component: ComponentType<Props>)
                => ComponentType<Props>
```
As already mentioned there is no difference between `updateWithRx` and `connectRx` other than changed order of the arguments. We can use it like this:
```jsx
import React from 'react'
import {interval} from 'rxjs'
import {map} from 'rxjs/operators'
import {connectRx} from 'react-connect-rx'

const Counter = ({label, count}) =>
    <>
        <div>{label}</div>
        <div>{count}</div>
    </>

const count$ = interval(1000).pipe(
    map(count => ({count}))
)

const props = {label: "Simple counter", count: 0}

const ConnectedCounter = connectRx([count$])(props)(Counter)

const App = () =>
    <ConnectedCounter />
    // we have passed the props to connectRx function
    // so we don't pass them here
```


<hr>

[see the working examples](https://jannosal.github.io/react-connect-rx/)

[more usage examples](https://github.com/JanNosal/react-connect-rx/tree/master/example)

## License

MIT © [Jan Nosal](https://github.com/JanNosal)
