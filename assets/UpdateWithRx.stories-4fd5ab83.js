import{j as t,a as b,F as $}from"./jsx-runtime-803a8b37.js";import{U as c,b as p,s as i,c as l,r as u}from"./StopWatch-4480766c.js";import{u as d}from"./index-e2514e4c.js";import{M as x,C as a,b as r}from"./index-d172901b.js";import"./index-91e8ec2f.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-0a002081.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function s(n){const e=Object.assign({h1:"h1",h2:"h2",h3:"h3",pre:"pre",code:"code",p:"p"},d(),n.components);return b($,{children:[t(x,{title:"Examples/updateWithRx",parameters:{viewMode:"docs"}}),`
`,t(e.h1,{id:"updatewithrx",children:"updateWithRx"}),`
`,t(e.h2,{id:"simple-counter-example",children:"Simple Counter Example"}),`
`,t(a,{children:t(r,{name:"Counter",children:t(c,{label:"Simple Counter",count:0,note:"Hi"})})}),`
`,t(e.h3,{id:"declaration",children:"declaration"}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`import React from 'react'
import {interval, timer} from 'rxjs'
import {map, mapTo} from 'rxjs/operators'
import {updateWithRx} from 'react-connect-rx'

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

// In the second arguments list, which accepts the array of observables,
// you can pass any number of observables, which can update the same subgroup of props a different one,
// or have an interception.
const UpdatingCounter = updateWithRx(Counter)(observables)

export default UpdatingCounter;
`})}),`
`,t(e.h3,{id:"usage",children:"usage"}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`import UpdatingCounter from './the place where you have your declaration'

const testComponent = () =>
    <UpdatingCounter label={'Simple Counter'} count={0} note={'Hi'} />

`})}),`
`,t(e.h2,{id:"stopwatch",children:"StopWatch"}),`
`,t(a,{children:t(r,{name:"StopWatch",children:t(p,{count:0,start:()=>i.next(),stop:()=>l.next(),reset:()=>u.next()})})}),`
`,t(e.h3,{id:"declaration-1",children:"declaration"}),`
`,t(e.p,{children:"(adapted from https://codepen.io/belfz/pen/WwrBej)"}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`const createCounterStream = (start$: Observable<any>, stop$: Observable<any>, reset$: Observable<any>) =>
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

const start1$ = new Subject()
const stop1$ = new Subject()
const reset1$ = new Subject()

const count1$ = createCounterStream(start1$, stop1$, reset1$)

const UpdatingStopWatch = updateWithRx(StopWatch)([count1$])

export {UpdatingStopWatch, start1$, stop1$, reset1$}
`})}),`
`,t(e.h3,{id:"usage-1",children:"usage"}),`
`,t(e.pre,{children:t(e.code,{className:"language-tsx",children:`import {UpdatingStopWatch, start1$, stop1$, reset1$} './the place where you have your declaration'

const testComponent = () =>
    <UpdatingStopWatch count={0} start={() => start1$.next()} stop={() => stop1$.next()} reset={()=> reset1$.next()} />
`})})]})}function g(n={}){const{wrapper:e}=Object.assign({},d(),n.components);return e?t(e,{...n,children:t(s,{...n})}):s(n)}const m=()=>t(c,{label:"Simple Counter",count:0,note:"Hi"});m.storyName="Counter";m.parameters={storySource:{source:'<UpdatingCounter label={"Simple Counter"} count={0} note={"Hi"} />'}};const h=()=>t(p,{count:0,start:()=>i.next(),stop:()=>l.next(),reset:()=>u.next()});h.storyName="StopWatch";h.parameters={storySource:{source:"<UpdatingStopWatch count={0} start={() => start1$.next()} stop={() => stop1$.next()} reset={() => reset1$.next()} />"}};const o={title:"Examples/updateWithRx",parameters:{viewMode:"docs"},tags:["stories-mdx"],includeStories:["counter","stopWatch"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:g};const R=["counter","stopWatch"];export{R as __namedExportsOrder,m as counter,o as default,h as stopWatch};
//# sourceMappingURL=UpdateWithRx.stories-4fd5ab83.js.map
