import React from "react"
import { act } from "react-dom/test-utils"
import { connectRx } from './index'
import { configure, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { Subject } from "rxjs"
import { map, startWith } from "rxjs/operators"

configure({ adapter: new Adapter })

describe('connectRx', () => {
  it('updates on emit with one prop updating on observable emit', () => {
    const Display = ({ digit }: { digit: number }) => <div id="count-wrapper">{digit}</div>
    const Counter = ({ count }: { count: number }) => <Display digit={count} /> 

    const countSubject$ = new Subject<number>()

    const count$ = countSubject$.pipe(map(count => ({ count })))

    const ConnectedCounter = connectRx([count$])({count: 0})(Counter)

    const wrapper = mount(<ConnectedCounter />)

    expect(wrapper.find("#count-wrapper").text()).toBe("0")

    act(() => { countSubject$.next(1) })

    expect(wrapper.find("#count-wrapper").text()).toBe("1")

    act(() => { countSubject$.next(777) })

    expect(wrapper.find("#count-wrapper").text()).toBe("777")
  })

  it('updates on emit with subgroup of props updating on observable emit', () => {

    interface PersonalDetailsProps {
      firstName: string,
      middleName: string,
      lastName: string
    }

    const PersonalDetails = ({ firstName, middleName, lastName }: PersonalDetailsProps) =>
      <>
        <div id="firstName">{firstName}</div>
        <div id="middleName">{middleName}</div>
        <div id="lastName">{lastName}</div>
      </>

    const firstNameSubject$ = new Subject<string>()
    const middleNameSubject$ = new Subject<string>()

    const firstName$ = firstNameSubject$.pipe(
      map(firstName => ({ firstName }))
    )

    const middleName$ = middleNameSubject$.pipe(
      map(middleName => ({ middleName }))
    )

    const UpdatedingPersonalDetails = connectRx<PersonalDetailsProps>
    ([firstName$, middleName$])
    ({firstName: "James", middleName: "Herbert", lastName: "Bond"})
    (PersonalDetails)

    const wrapper = mount(<UpdatedingPersonalDetails />)

    expect(wrapper.find("#firstName").text()).toBe("James")
    expect(wrapper.find("#middleName").text()).toBe("Herbert")
    expect(wrapper.find("#lastName").text()).toBe("Bond")

    act(() => {
      firstNameSubject$.next("Nicol")
      middleNameSubject$.next("Rebeca")
    })

    expect(wrapper.find("#firstName").text()).toBe("Nicol")
    expect(wrapper.find("#middleName").text()).toBe("Rebeca")
    expect(wrapper.find("#lastName").text()).toBe("Bond")

    act(() => {
      middleNameSubject$.next("Sara")
    })

    expect(wrapper.find("#firstName").text()).toBe("Nicol")
    expect(wrapper.find("#middleName").text()).toBe("Sara")
    expect(wrapper.find("#lastName").text()).toBe("Bond")
  })

  it("updates on emit with more observables mapped to one prop", () => {

    type Color = "red" | "orange" | "green"

    const TrafficLights = ({ color }: { color: Color}) =>
      <>
        <div id="color-container">{color}</div>
        <div id="text-container">{color === "green" ? "go" : color === "orange" ? "ready" : "wait"}</div>
      </>

    const switchSubject1 = new Subject<Color>()
    const switchSubject2 = new Subject<Color>()
    const switchSubject3 = new Subject<Color>()

    const switch1$ = switchSubject1.pipe(map(color => ({color})), startWith({color: "green" as Color}))
    const switch2$ = switchSubject2.pipe(map(color => ({color})))
    const switch3$ = switchSubject3.pipe(map(color => ({color})))

    const ConnectedTrafficLights = connectRx<{color: Color}>
    ([switch1$, switch2$, switch3$])
    ({color: "red"})
    (TrafficLights)

    const wrapper = mount(<ConnectedTrafficLights />)

    expect(wrapper.find("#color-container").text()).toBe("green")
    expect(wrapper.find("#text-container").text()).toBe("go")

    act(() => {
      switchSubject2.next("red")
    })

    expect(wrapper.find("#color-container").text()).toBe("red")
    expect(wrapper.find("#text-container").text()).toBe("wait")


    act(() => {
      switchSubject3.next("orange")
    })

    expect(wrapper.find("#color-container").text()).toBe("orange")
    expect(wrapper.find("#text-container").text()).toBe("ready")


    act(() => {
      switchSubject1.next("green")
    })

    expect(wrapper.find("#color-container").text()).toBe("green")
    expect(wrapper.find("#text-container").text()).toBe("go")

    act(() => {
      switchSubject2.next("red")
      switchSubject1.next("orange")
    })

    expect(wrapper.find("#color-container").text()).toBe("orange")
    expect(wrapper.find("#text-container").text()).toBe("ready")
  })
})