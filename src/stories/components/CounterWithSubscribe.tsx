import React from 'react'
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

const props = {
    label: "SIMPLE COUNTER",
    note: "Hey"
}

export { Counter };