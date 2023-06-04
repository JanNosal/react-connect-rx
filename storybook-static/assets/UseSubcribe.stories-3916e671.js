import{j as e,a as i,F as m}from"./jsx-runtime-803a8b37.js";import{C as s}from"./StopWatch-4480766c.js";import{u as a}from"./index-e2514e4c.js";import{M as u,C as p,b as d}from"./index-d172901b.js";import"./index-91e8ec2f.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-0a002081.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function o(t){const n=Object.assign({h1:"h1",h2:"h2",h3:"h3",pre:"pre",code:"code"},a(),t.components);return i(m,{children:[e(u,{title:"Examples/useSubscribe",parameters:{viewMode:"docs"}}),`
`,e(n.h1,{id:"connectrx",children:"connectRx"}),`
`,e(n.h2,{id:"simple-counter-example",children:"Simple Counter Example"}),`
`,e(p,{children:e(d,{name:"Counter",children:e(s,{})})}),`
`,e(n.h3,{id:"declaration",children:"declaration"}),`
`,e(n.pre,{children:e(n.code,{className:"language-tsx",children:`import React from 'react'
import { interval } from 'rxjs'
import { useSubscribe } from '../..'

interface CounterProps {
    label: string,
    note: string
}

const count$ = interval(1000)


const Counter = ({ label, note }: CounterProps) => {

    const count = useSubscribe(0)(count$)

    return (
        <>
            <h4>{label}</h4>
            <div>{count}</div>
            <div>{note}</div>
        </>
    )
}

export default Counter;
`})}),`
`,e(n.h3,{id:"usage",children:"usage"}),`
`,e(n.pre,{children:e(n.code,{className:"language-tsx",children:`import Counter from './the place where you have your declaration'

const testComponent = () =>
    // since we have passed the props to connectRx function
    // we don't pass them here
    <Counter label={"I am counter"} note = {"Hello"} />

`})})]})}function l(t={}){const{wrapper:n}=Object.assign({},a(),t.components);return n?e(n,{...t,children:e(o,{...t})}):o(t)}const c=()=>e(s,{});c.storyName="Counter";c.parameters={storySource:{source:"<ConnectedCounter />"}};const r={title:"Examples/useSubscribe",parameters:{viewMode:"docs"},tags:["stories-mdx"],includeStories:["counter"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:l};const y=["counter"];export{y as __namedExportsOrder,c as counter,r as default};
//# sourceMappingURL=UseSubcribe.stories-3916e671.js.map
