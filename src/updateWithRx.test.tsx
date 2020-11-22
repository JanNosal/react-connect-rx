import React from "react"
import { act } from "react-dom/test-utils"
import { render } from "@testing-library/react"
import { updateWithRx } from './index'
import { Subject } from "rxjs"
import { map, startWith } from "rxjs/operators"

describe("updateWithRx", () => {
  it("renders withough crashing", () => {
    const Display = ({ digit }: { digit: number }) => <div data-testid="count-wrapper">{digit}</div>
    const Counter = ({ count }: { count: number }) => <Display digit={count} />

    const countSubject$ = new Subject<number>()

    const count$ = countSubject$.pipe(map(count => ({ count })))

    const UpdatingCounter = updateWithRx(Counter)([count$])

    render(<UpdatingCounter count={0} />)
  })

  it('updates on emit with one prop updating on observable emit', () => {
    const Display = ({ digit }: { digit: number }) => <div data-testid="count-wrapper">{digit}</div>
    const Counter = ({ count }: { count: number }) => <Display digit={count} />

    const countSubject$ = new Subject<number>()

    const count$ = countSubject$.pipe(map(count => ({ count })))

    const UpdatingCounter = updateWithRx(Counter)([count$])

    const wrapper = render(<UpdatingCounter count={0} />)

    expect(wrapper.getByTestId("count-wrapper").textContent == "0")

    act(() => { countSubject$.next(1) })

    expect(wrapper.getByTestId("count-wrapper").textContent == "1")

    act(() => { countSubject$.next(777) })

    expect(wrapper.getByTestId("count-wrapper").textContent == "777")
  })

  it('updates on emit with subgroup of props updating on observable emit', () => {

    interface PersonalDetailsProps {
      firstName: string,
      middleName: string,
      lastName: string
    }

    const PersonalDetails = ({ firstName, middleName, lastName }: PersonalDetailsProps) =>
      <>
        <div data-testid="firstName">{firstName}</div>
        <div data-testid="middleName">{middleName}</div>
        <div data-testid="lastName">{lastName}</div>
      </>

    const firstNameSubject$ = new Subject<string>()
    const middleNameSubject$ = new Subject<string>()

    const firstName$ = firstNameSubject$.pipe(
      map(firstName => ({ firstName }))
    )

    const middleName$ = middleNameSubject$.pipe(
      map(middleName => ({ middleName }))
    )

    const UpdatedingPersonalDetails = updateWithRx(PersonalDetails)([firstName$, middleName$])

    const wrapper = render(<UpdatedingPersonalDetails firstName={"James"} middleName={"Herbert"} lastName={"Bond"} />)

    expect(wrapper.getByTestId("firstName").textContent == "James")
    expect(wrapper.getByTestId("middleName").textContent == "Herbert")
    expect(wrapper.getByTestId("lastName").textContent == "Bond")

    act(() => {
      firstNameSubject$.next("Nicol")
      middleNameSubject$.next("Rebeca")
    })

    expect(wrapper.getByTestId("firstName").textContent == "Nicol")
    expect(wrapper.getByTestId("middleName").textContent == "Rebeca")
    expect(wrapper.getByTestId("lastName").textContent == "Bond")

    act(() => {
      middleNameSubject$.next("Sara")
    })

    expect(wrapper.getByTestId("firstName").textContent == "Nicol")
    expect(wrapper.getByTestId("middleName").textContent == "Sara")
    expect(wrapper.getByTestId("lastName").textContent == "Bond")
  })

  it("updates on emit with more observables mapped to one prop", () => {

    type Color = "red" | "orange" | "green"

    const TrafficLights = ({ color }: { color: Color }) =>
      <>
        <div data-testid="color-container">{color}</div>
        <div data-testid="text-container">{color === "green" ? "go" : color === "orange" ? "ready" : "wait"}</div>
      </>

    const switchSubject1 = new Subject<Color>()
    const switchSubject2 = new Subject<Color>()
    const switchSubject3 = new Subject<Color>()

    const switch1$ = switchSubject1.pipe(map(color => ({ color })), startWith({ color: "green" as Color }))
    const switch2$ = switchSubject2.pipe(map(color => ({ color })))
    const switch3$ = switchSubject3.pipe(map(color => ({ color })))

    const ConnectedTrafficLights = updateWithRx(TrafficLights)([switch1$, switch2$, switch3$])

    const wrapper = render(<ConnectedTrafficLights color={"red"} />)

    expect(wrapper.getByTestId("color-container").textContent == "green")
    expect(wrapper.getByTestId("text-container").textContent == "go")

    act(() => {
      switchSubject2.next("red")
    })

    expect(wrapper.getByTestId("color-container").textContent == "red")
    expect(wrapper.getByTestId("text-container").textContent == "wait")


    act(() => {
      switchSubject3.next("orange")
    })

    expect(wrapper.getByTestId("color-container").textContent == "orange")
    expect(wrapper.getByTestId("text-container").textContent == "ready")


    act(() => {
      switchSubject1.next("green")
    })

    expect(wrapper.getByTestId("color-container").textContent == "green")
    expect(wrapper.getByTestId("text-container").textContent == "go")

    act(() => {
      switchSubject2.next("red")
      switchSubject1.next("orange")
    })

    expect(wrapper.getByTestId("color-container").textContent == "orange")
    expect(wrapper.getByTestId("text-container").textContent == "ready")
  })
})