/**
 * @jest-environment jsdom
 */

import React from "react"
import { act } from "react-dom/test-utils"
import { render } from "@testing-library/react"
import { useSubscribe } from '../../index'
import { Subject} from "rxjs"

describe("useSubscribe", () => {
  it("updates state correctly per obserbable emit", () => {
    const Display = ({ digit }: { digit: number }) => <div data-testid="count-wrapper">{digit}</div>

    const count$ = new Subject<number>() 

    const Counter = () => {
      const count = useSubscribe(0)(count$)

      return <Display digit={count} />
    }

    const element = render(<Counter />)

    expect(element.getByTestId("count-wrapper").textContent == "0")

    act(() => { count$.next(1) })

    expect(element.getByTestId("count-wrapper").textContent == "1")

    act(() => { count$.next(777) })

    expect(element.getByTestId("count-wrapper").textContent == "777")
  })
})