import React, {ComponentType, ComponentClass, useEffect, useState} from "react"
import {Observable, Subscription} from "rxjs"


export type UpdateWithRx = <P extends Object>(Cmp: ComponentType<P>) => (obs: Array<Observable<Partial<P>>>) => ComponentClass<P, P>

const updateWithRx: UpdateWithRx = <P extends Object>(Cmp: ComponentType<P>) => (obs: Array<Observable<Partial<P>>>) => class extends React.Component<P, P> {

  subscriptions: Subscription[]

  constructor(props: P) {
    super(props)
    this.subscriptions = []
  }

  componentDidMount() {
    this.setState(s => this.props)
    this.subscriptions = obs.map(
        observable$ => observable$.subscribe(
          newProperties => this.setState((oldProperties: P) => ({...oldProperties, ...newProperties}))
        )
      )
  }

  componentWillUnmount() {
    this.subscriptions.map(subscription => subscription.unsubscribe())
  }

  render() {
    return <Cmp {...this.state} />
  }
}

export default updateWithRx
