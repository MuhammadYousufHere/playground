import { ComponentType, Suspense } from 'react'
import Loader from './Loader'

export function withSuspense(WrappedComponent: ComponentType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function ComponentWithSuspense(props: any) {
    return (
      <Suspense fallback={<Loader isDashboard={window.location.pathname.includes('/dashboard')} />}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }

  return ComponentWithSuspense
}
