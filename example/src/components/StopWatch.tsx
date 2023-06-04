import * as React from "react"
import {Subject, merge, interval, Observable} from "rxjs"
import {map, mapTo, scan, switchMap, takeUntil} from "rxjs/operators"
import {updateWithRx, connectRx} from "react-connect-rx"
import "./stopWatch.css"

/**
 * adapted from https://codepen.io/belfz/pen/WwrBej
 */

const createCounterStream = (start$: Observable<any>, stop$: Observable<any>, reset$: Observable<any>) =>
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
    map(count => ({count}))
  )

interface StopWatchProps {
  count: number,
  start: (e?: React.SyntheticEvent) => void,
  stop: (e?: React.SyntheticEvent) => void,
  reset: (e?: React.SyntheticEvent) => void,
}

function StopWatch({count, start, stop, reset}: StopWatchProps) {
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
          <div id="pointer" style={{"transform": `rotate(${(count % 60) * 6}deg)`}}>
          </div>
        </div>
      </div>
    </>
  )
}

export const start1$ = new Subject()
export const stop1$ = new Subject()
export const reset1$ = new Subject()

const count1$ = createCounterStream(start1$, stop1$, reset1$)

const UpdatingStopWatch = updateWithRx(StopWatch)([count1$])

const start2$ = new Subject()
const stop2$ = new Subject()
const reset2$ = new Subject()

const count2$ = createCounterStream(start2$, stop2$, reset2$)

const ConnectedStopWatch =
  connectRx<StopWatchProps>
  ([count2$])
  ({count: 0, start: () => start2$.next(1), stop: () => stop2$.next(1), reset: () => reset2$.next(1)})
  (StopWatch)

export default function StopWatchPage() {
  return (
    <>
      <div>
        <h4>Stop watch with fn updateRx</h4>
        <UpdatingStopWatch
          count={0}
          start={() => start1$.next(1)}
          stop={() => stop1$.next(1)}
          reset={() => reset1$.next(1)}
        />
      </div>
      <div>
        <h4>Stop watch with fn connectRx</h4>
        <ConnectedStopWatch />
      </div>
    </>
  )
}
