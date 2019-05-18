import { useEffect, useRef } from 'react'

type EventHandler<T extends Event> = (event: T) => any

export default function useEventListener<T extends keyof DocumentEventMap>(
  eventName: T,
  handler: EventHandler<DocumentEventMap[T]>,
  element: HTMLElement = document.documentElement,
) {
  const savedHandler = useRef<EventHandler<DocumentEventMap[T]>>()

  // Update a ref to the latest handler whenever it changes
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Ensure add event listener is supported
    if (!(element && element.addEventListener)) return

    // Use the latest event handler in the listener
    const eventListener = (event: DocumentEventMap[T]) =>
      savedHandler.current && savedHandler.current(event)

    // Add listener and cleanup
    element.addEventListener(eventName, eventListener)
    return () => element.removeEventListener(eventName, eventListener)
  }, [eventName, element])
}
