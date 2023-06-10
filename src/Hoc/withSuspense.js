import { Suspense } from 'react'

export function withSuspense(WrappedComponent) {
  function ComponentWithSuspense(props) {
    return (
      <Suspense fallback={<p> loading...</ p>}>
        <WrappedComponent {...props} />
      </Suspense>
    )
  }

  return ComponentWithSuspense
}
