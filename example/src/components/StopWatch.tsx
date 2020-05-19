import * as React from "react"
import {Subject, merge, interval} from "rxjs"
import {map, mapTo, scan, switchMap, takeUntil} from "rxjs/operators"
import {updateWithRx} from 'react-connect-rx'

/**
 * adapted from https://codepen.io/belfz/pen/WwrBej
 */

const start$ = new Subject()
const stop$ = new Subject()
const reset$ = new Subject()

const count$ = merge(
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
  scan((acc, n) => n === 0 ? 0 : acc + n)
)

function StopWatch({count}: { count: number }) {
  return (
    <>
      <button onClick={() => start$.next()}>
        Start
      </button>
      <button onClick={() => stop$.next()}>
        stop
      </button>
      <button onClick={() => reset$.next()}>
        reset
      </button>
      <div className="container">
        <div className="wheel">
          <div id="pointer" style={{"transform": `rotate(${(count % 60) * 6}deg)`}}>
          </div>
        </div>
      </div>
    </>
  )
}

export default updateWithRx(StopWatch)([count$.pipe(map(count => ({count})))])
