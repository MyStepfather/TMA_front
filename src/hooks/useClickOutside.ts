import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = (
  elementRef: RefObject<Element>,
  callback: () => void
) => {
  const callbackRef = useRef<() => void>();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node) &&
        event.target !== elementRef.current
      ) {
        callbackRef.current?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [elementRef]);
};
