import { useEffect, useRef } from "react";

export function describeImage(image: File) {
  // Create a reference to the worker object.
  const worker = useRef<Worker | null>(null);

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(
        new URL("./workers/worker.ts", import.meta.url),
        {
          type: "module",
        }
      );
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      // TODO: Will fill in later
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => {
      if (worker.current) {
        worker.current.removeEventListener("message", onMessageReceived);
      }
    };
  }, []);

  return image;
}
