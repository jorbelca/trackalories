import { useRef, useEffect } from "react";

function useDebounce(callback, delay) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);

  // Update the reference of the callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFunction = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  };

  // Eliminate the timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}

export default useDebounce;
