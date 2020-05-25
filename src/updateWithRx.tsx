import * as React from 'react'
import { ComponentType, useEffect, useState } from "react"
import { Observable } from "rxjs"

export default function updateWithRx<T>(Component: ComponentType<T>) {

    return (observables: Array<Observable<Partial<T>>>) => (props: T) => {

        const [properties, setProperties] = useState<T>(props)

        useEffect(
            () => {
                const subscriptions = observables.map(
                    observable$ => observable$.subscribe(
                        newProperties => setProperties((oldProperties: T) => ({ ...oldProperties, ...newProperties }))
                    )
                )

                return () => {
                    subscriptions.map(subscription => subscription.unsubscribe())
                }
            }, []
        )

        return <Component {...properties} />
    }
}