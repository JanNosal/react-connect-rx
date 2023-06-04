import{j as n,a as h,F as m}from"./jsx-runtime-803a8b37.js";import{C as s,a as p}from"./StopWatch-4480766c.js";import{u as i}from"./index-e2514e4c.js";import{M as u,C as r,b as a}from"./index-d172901b.js";import"./index-91e8ec2f.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-0a002081.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function c(t){const e=Object.assign({h1:"h1",h2:"h2",h3:"h3",pre:"pre",code:"code",p:"p"},i(),t.components);return h(m,{children:[n(u,{title:"Examples/connectRx",parameters:{viewMode:"docs"}}),`
`,n(e.h1,{id:"connectrx",children:"connectRx"}),`
`,n(e.h2,{id:"simple-counter-example",children:"Simple Counter Example"}),`
`,n(r,{children:n(a,{name:"Counter",children:n(s,{})})}),`
`,n(e.h3,{id:"declaration",children:"declaration"}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`import React from 'react'
import {interval, timer} from 'rxjs'
import {map, mapTo} from 'rxjs/operators'
import {connectRx} from 'react-connect-rx'

interface CounterProps {
    label: string,
    count: number,
    note: string
}

const Counter = ({label, count, note}: CounterProps) =>
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

const props = {
    count: 0,
    label: "SIMPLE COUNTER",
    note: "Hey"
}
// In the first arguments list, which accepts the array of observables,
// you can pass any number of observables, which can update the same subgroup of props a different one,
// or have an interception.
const ConnectedCounter = connectRx<CounterProps>(observables)(props)(Counter)

export default ConnectedCounter;
`})}),`
`,n(e.h3,{id:"usage",children:"usage"}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`import ConnectedCounter from './the place where you have your declaration'

const testComponent = () =>
    // since we have passed the props to connectRx function
    // we don't pass them here
    <ConnectedCounter />

`})}),`
`,n(e.h2,{id:"stopwatch",children:"StopWatch"}),`
`,n(r,{children:n(a,{name:"StopWatch",children:n(p,{})})}),`
`,n(e.h3,{id:"declaration-1",children:"declaration"}),`
`,n(e.p,{children:"(adapted from https://codepen.io/belfz/pen/WwrBej)"}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`const createCounterStream = (start$: Observable<any>, stop$: Observable<any>, reset$: Observable<any>) =>
  merge(
    start$.pipe(
      switchMap(
        () => interval(1000).pipe(
          takeUntil(stop$),
          mapTo(1)
        ),
      )
    ),
    reset$.pipe(
      mapTo(0)
    )
  ).pipe(
    scan((acc, n) => n === 0 ? 0 : acc + n),
    map(count => ({ count }))
  )

interface StopWatchProps {
  count: number,
  start: (e?: React.SyntheticEvent) => void,
  stop: (e?: React.SyntheticEvent) => void,
  reset: (e?: React.SyntheticEvent) => void,
}

function StopWatch({ count, start, stop, reset }: StopWatchProps) {
  return (
    <>
      <button onClick={start}>
        Start
      </button>
      <button onClick={stop}>
        stop
      </button>
      <button onClick={reset}>
        reset
      </button>
      <div className="container">
        <div className="wheel">
          <div id="pointer" style={{ "transform": \`rotate(\${(count % 60) * 6}deg)\` }}>
          </div>
        </div>
      </div>
    </>
  )
}

const start2$ = new Subject()
const stop2$ = new Subject()
const reset2$ = new Subject()

const count2$ = createCounterStream(start2$, stop2$, reset2$)

const ConnectedStopWatch =
  connectRx<StopWatchProps>
    ([count2$])
    ({ count: 0, start: () => start2$.next(), stop: () => stop2$.next(), reset: () => reset2$.next() })
    (StopWatch)

export {ConnectedStopWatch}
`})}),`
`,n(e.h3,{id:"usage-1",children:"usage"}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`import {ConnectedStopWatch} './the place where you have your declaration'

const testComponent = () =>
    // since we have passed the props to connectRx function
    // we don't pass them here
    <ConnectedStopWatch />
`})})]})}function b(t={}){const{wrapper:e}=Object.assign({},i(),t.components);return e?n(e,{...t,children:n(c,{...t})}):c(t)}const l=()=>n(s,{});l.storyName="Counter";l.parameters={storySource:{source:"<ConnectedCounter />"}};const d=()=>n(p,{});d.storyName="StopWatch";d.parameters={storySource:{source:"<ConnectedStopWatch />"}};const o={title:"Examples/connectRx",parameters:{viewMode:"docs"},tags:["stories-mdx"],includeStories:["counter","stopWatch"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:b};const R=["counter","stopWatch"];export{R as __namedExportsOrder,l as counter,o as default,d as stopWatch};
//# sourceMappingURL=ConnectRx.stories-6c7f6a62.js.map
