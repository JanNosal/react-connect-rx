import React from 'react'
import {interval, timer} from 'rxjs'
import {map, mapTo} from 'rxjs/operators'
import {connectRx, updateWithRx} from 'react-connect-rx'

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

const UpdatingCounter = updateWithRx(Counter)(observables)
const ConnectedCounter = connectRx<CounterProps>(observables)({label: "Simple counter", count: 0, note: "Hi"})(Counter)

export default function SimpleCounter() {
    return  (
        <>
            <h3>UpdatingCounter</h3>
            <UpdatingCounter label={"Simple counter"} count={0} note={"Hi"} />
            <hr />
            <h3>ConnectedCounter</h3>
            <ConnectedCounter />
        </>
    )
}