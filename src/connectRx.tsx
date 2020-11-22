import React, {ComponentType, FunctionComponent} from "react"
import {Observable} from "rxjs"
import updateWithRx from "./updateWithRx"

export type ConnectRx =
<P extends Object>
  (obs: Observable<Partial<P>>[]) =>
    (props: P) =>
      (Cmp: ComponentType<P>) =>
        FunctionComponent

const connectRx: ConnectRx = <P extends Object>(obs: Observable<Partial<P>>[]) => (props: P) => (Cmp: ComponentType<P>) => {
  const Decorated = updateWithRx(Cmp)(obs)
  return () => <Decorated {...props} />
}

export default connectRx
