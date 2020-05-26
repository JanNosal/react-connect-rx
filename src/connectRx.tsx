import {ComponentType} from "react"
import {Observable} from "rxjs"
import updateWithRx from "./updateWithRx"

export default <P extends Object>(obs: Observable<Partial<P>>[]) => (props: P) => (Cmp: ComponentType<P>) =>
  () => updateWithRx(Cmp)(obs)(props)
