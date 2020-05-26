import * as React from 'react'
import {ComponentType, useEffect, useState} from "react"
import {Observable} from "rxjs"

export default <P extends Object>(Cmp: ComponentType<P>) => (obs: Array<Observable<Partial<P>>>) => (props: P) => {

  const [properties, setProperties] = useState<P>(props)

  useEffect(
    () => {
      const subscriptions = obs.map(
        observable$ => observable$.subscribe(
          newProperties => setProperties((oldProperties: P) => ({...oldProperties, ...newProperties}))
        )
      )

      return () => {
        subscriptions.map(subscription => subscription.unsubscribe())
      }
    }, []
  )

  return <Cmp {...properties} />
}
