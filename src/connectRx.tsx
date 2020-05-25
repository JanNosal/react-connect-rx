import {ComponentType} from "react"
import {Observable} from "rxjs"
import updateWithRx from "./updateWithRx"

export default function connectRx<T>(observables: Observable<Partial<T>>[]) {
  return (props: T) => (Component: ComponentType<T>) => () => updateWithRx(Component)(observables)(props)
}