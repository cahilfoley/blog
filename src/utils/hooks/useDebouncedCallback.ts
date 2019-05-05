const { useRef, useCallback, useEffect } = require('react')

type UseDebouncedCallbackOptions = {
  maxWait?: number
}

export default function useDebouncedCallback<T>(
  callback: (...args: T[]) => void,
  delay: number,
  options: UseDebouncedCallbackOptions = {},
) {
  const { maxWait } = options
  const maxWaitHandler = useRef(null)
  const maxWaitArgs = useRef([])
  const functionTimeoutHandler = useRef(null)
  const isComponentUnmounted = useRef(false)

  const debouncedFunction = callback

  const cancelDebouncedCallback = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current)
    clearTimeout(maxWaitHandler.current)
    maxWaitHandler.current = null
    maxWaitArgs.current = []
    functionTimeoutHandler.current = null
  }, [functionTimeoutHandler.current, maxWaitHandler.current])

  useEffect(
    () => () => {
      // we use flag, as we allow to call callPending outside the hook
      isComponentUnmounted.current = true
    },
    [],
  )

  const debouncedCallback = useCallback(
    function(...args: T[]) {
      maxWaitArgs.current = args
      clearTimeout(functionTimeoutHandler.current)
      functionTimeoutHandler.current = setTimeout(() => {
        if (!isComponentUnmounted.current) {
          debouncedFunction.apply(null, args)
        }

        cancelDebouncedCallback()
      }, delay)

      if (maxWait && !maxWaitHandler.current) {
        maxWaitHandler.current = setTimeout(() => {
          if (!isComponentUnmounted.current) {
            debouncedFunction.apply(null, maxWaitArgs.current)
          }
          cancelDebouncedCallback()
        }, maxWait)
      }
    },
    [debouncedFunction, maxWait, delay],
  )

  const callPending = () => {
    // Call pending callback only if we have anything in our queue
    if (!functionTimeoutHandler.current) {
      return
    }

    debouncedFunction.apply(null, maxWaitArgs.current)
    cancelDebouncedCallback()
  }

  // At the moment, we use 3 args array so that we save backward compatibility
  return [debouncedCallback, cancelDebouncedCallback, callPending]
}
