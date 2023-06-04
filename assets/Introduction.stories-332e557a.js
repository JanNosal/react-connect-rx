import{j as n,a as r,F as a}from"./jsx-runtime-803a8b37.js";import{u as s}from"./index-e2514e4c.js";import{M as i}from"./index-d172901b.js";import"./index-91e8ec2f.js";import"./_commonjsHelpers-042e6b4d.js";import"./iframe-0a002081.js";import"../sb-preview/runtime.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function c(t){const e=Object.assign({h1:"h1",blockquote:"blockquote",p:"p",a:"a",img:"img",h2:"h2",pre:"pre",code:"code",h3:"h3",h4:"h4"},s(),t.components);return r(a,{children:[n(i,{title:"Introduction",parameters:{viewMode:"docs"}}),`
`,n(e.h1,{id:"react-connect-rx",children:"react-connect-rx"}),`
`,r(e.blockquote,{children:[`
`,n(e.p,{children:"Connect React with RxJS"}),`
`]}),`
`,n(e.p,{children:"This simplistic library provides a few higher order components and hooks to connect React component with RxJS."}),`
`,r(e.p,{children:[n(e.a,{href:"https://www.npmjs.com/package/react-connect-rx",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.img,{src:"https://img.shields.io/npm/v/react-connect-rx.svg",alt:"NPM"})})," ",n(e.a,{href:"https://standardjs.com",target:"_blank",rel:"nofollow noopener noreferrer",children:n(e.img,{src:"https://img.shields.io/badge/code_style-standard-brightgreen.svg",alt:"JavaScript Style Guide"})})]}),`
`,n(e.h2,{id:"install",children:"Install"}),`
`,n(e.p,{children:"npm"}),`
`,n(e.pre,{children:n(e.code,{className:"language-bash",children:`npm install --save react-connect-rx
`})}),`
`,n(e.p,{children:"yarn"}),`
`,n(e.pre,{children:n(e.code,{className:"language-bash",children:`yarn add react-connect-rx
`})}),`
`,n(e.h2,{id:"api",children:"API"}),`
`,r(e.blockquote,{children:[`
`,n(e.h3,{id:"usesubscribe",children:"useSubscribe"}),`
`]}),`
`,n(e.h4,{id:"type-signature",children:"type signature"}),`
`,n(e.p,{children:`It takes initial state in the first argmment list,
observalbe to subcribe in the second one
and return current state produced by the observable.`}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`import {Observable} from 'rxjs'

export type UseSubscribe =
  <T>(init: T) => (observable: Observable<T>) => T
`})}),`
`,n(e.h4,{id:"usage",children:"usage"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`import {useSubscribe} from 'react-connect-rx'
import {Observable} from 'rxjs'

const count$ = interval(1000)

const Conter = () => {
    const count = useSubscribe(0)(count$)
    return <div>{count}</div>
}
`})}),`
`,r(e.blockquote,{children:[`
`,n(e.h3,{id:"updatewithrx",children:"updateWithRx"}),`
`]}),`
`,n(e.h4,{id:"type-signature-1",children:"type signature"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`import React, {ComponentType, ComponentClass} from 'react'
import {Observable} from 'rxjs'

export type UpdateWithRx =
<P extends Object>
  (Cmp: ComponentType<P>) =>
    (obs: Array<Observable<Partial<P>>>) =>
      ComponentClass<P, P>
`})}),`
`,n(e.h4,{id:"usage-1",children:"usage"}),`
`,n(e.pre,{children:n(e.code,{className:"language-js",children:`import ReactDOM from 'react-dom';
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

`})}),`
`,r(e.blockquote,{children:[`
`,n(e.h3,{id:"connectrx",children:"connectRx"}),`
`]}),`
`,n(e.h4,{id:"type-signature-2",children:"type signature"}),`
`,n(e.pre,{children:n(e.code,{className:"language-ts",children:`import React, {ComponentType, FunctionComponent} from 'react'
import {Observable} from 'rxjs'

export type ConnectRx =
<P extends Object>
  (obs: Observable<Partial<P>>[]) =>
    (props: P) =>
      (Cmp: ComponentType<P>) =>
        FunctionComponent
`})}),`
`,n(e.h4,{id:"usage-2",children:"usage"}),`
`,n(e.pre,{children:n(e.code,{className:"language-tsx",children:`import ReactDOM from 'react-dom';
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

// If you are using typescript, you might need to annotate by the type of props.
// The whole type signature is based on the type of the props and
// since props are comming in the second argument list,
// compiler is unable to infer the type for the first arguments list.
// connectRx<{count: number}>(observables)(props)(Counter)
const ConnectedCounter = connectRx(observables)(props)(Counter)

ReactDOM.render(
  <ConnectedCounter />,
  document.getElementById('root')
);

`})}),`
`,n(e.h2,{id:"notes",children:"Notes"}),`
`,n(e.p,{children:`In the arguments list, which accepts the array of observables,
you can pass any number of observables.
These can update the same subgroup of props, a different one,
or an interception. See more in the examples.`})]})}function p(t={}){const{wrapper:e}=Object.assign({},s(),t.components);return e?n(e,{...t,children:n(c,{...t})}):c(t)}const d=()=>{throw new Error("Docs-only story")};d.parameters={docsOnly:!0};const o={title:"Introduction",parameters:{viewMode:"docs"},tags:["stories-mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:p};const C=["__page"];export{C as __namedExportsOrder,d as __page,o as default};
//# sourceMappingURL=Introduction.stories-332e557a.js.map
