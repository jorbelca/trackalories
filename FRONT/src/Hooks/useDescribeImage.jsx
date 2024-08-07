import { useEffect, useRef, useState } from "react";

function useDescribeImage(image) {
  // Crear una referencia al objeto worker.
  const worker = (useRef < Worker) | (null > null);

  // Estado para almacenar el resultado del análisis.
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Usamos el hook `useEffect` para configurar el worker cuando el componente se monta.
  useEffect(() => {
    if (!worker.current) {
      // Crear el worker si aún no existe.
      worker.current = new Worker(
        new URL("./workers/worker.ts", import.meta.url),
        {
          type: "module",
        }
      );
    }

    // Crear una función de callback para los mensajes del worker.
    const onMessageReceived = (e) => {
      if (e.data.status === "update") {
        console.log("Progreso:", e.data.output);
      } else if (e.data.status === "complete") {
        setResult(e.data.output);
        setIsLoading(false);
      }
    };

    // Adjuntar la función de callback como un event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Definir una función de limpieza para cuando el componente se desmonte.
    return () => {
      if (worker.current) {
        worker.current.removeEventListener("message", onMessageReceived);
      }
    };
  }, []);

  // Función para enviar la imagen al worker y empezar el análisis.
  const analyzeImage = () => {
    setIsLoading(true);
    worker.current?.postMessage({
      img: image,
    });
  };

  // Llamar a la función de análisis cuando se reciba una nueva imagen.
  useEffect(() => {
    if (image) {
      analyzeImage();
    }
  }, [image]);

  return { result, isLoading };
}

export default useDescribeImage;
