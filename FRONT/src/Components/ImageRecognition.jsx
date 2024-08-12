import { useState } from "react";
import { isMobileDevice } from "../utils/isMobile";
import describeImage from "../Services/describeImage";

const ImageRecognition = ({ setSearchFood }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mobile = isMobileDevice();
  const [error, setError] = useState(null);

  function openInterface(e) {
    e.preventDefault();
    document.getElementById("supersticial").showModal();
    document.getElementById("supersticial").style.visibility = "visible";
    document.getElementById("close-btn").style.visibility = "visible";

    if (mobile) {
      document
        .getElementById("capture")
        .addEventListener("click", capturePhoto);
      startCamera();
    }
  }
  function closeInterface(e) {
    e.preventDefault();
    document.getElementById("supersticial").close();
    document.getElementById("supersticial").style.visibility = "hidden";
    document.getElementById("close-btn").style.visibility = "hidden";
    setImage(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  }
  const handleImageUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setIsLoading(true);
      setError(null);
      try {
        let response = await describeImage(file);
        response = response.data.result.map(
          (res) => `${Math.round(res.score * 100)}% -> ${res.label}`
        );
        setResult(response);
      } catch (error) {
        console.error("Error al analizar la imagen:", error);
        setError("Error analyzing the image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  function capturePhoto() {
    const canvas = document.getElementById("canvas");
    const video = document.getElementById("video");
    const photo = document.getElementById("photo");
    const btnDescribe = document.getElementById("describe");
    const context = canvas.getContext("2d");
    const btnCapture = document.getElementById("capture");

    // Dibuja el cuadro de video en el canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convierte el contenido del canvas a una URL de datos y la asigna al elemento img
    const dataURL = canvas.toDataURL("image/png");
    photo.src = dataURL;

    // Convertir el dataURL en un archivo Blob
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        // Crea un archivo a partir del Blob
        const file = new File([blob], "captured_image.png", {
          type: "image/png",
        });
        // Ejecuta handleImageUpload con el archivo capturado
        handleImageUpload({
          target: { files: [file] },
          preventDefault: () => {},
        });
      });

    // Oculta el video y detén la transmisión
    video.style.display = "none";
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    btnCapture.style.display = "none";

    // Muestra la foto capturada
    photo.style.display = "block";
    btnDescribe.style.display = "block";
  }

  async function startCamera() {
    try {
      // Intenta activar la cámara trasera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } }, // Cámara trasera
      });
      const videoElement = document.getElementById("video");
      videoElement.srcObject = stream;
    } catch (error) {
      if (error.name === "OverconstrainedError") {
        try {
          // Si la cámara trasera no está disponible, intenta la delantera
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }, // Cámara delantera
          });
          const videoElement = document.getElementById("video");
          videoElement.srcObject = stream;
        } catch (innerError) {
          console.error("Error al acceder a la cámara:", innerError);
          alert(
            "No se puede acceder a ninguna cámara. Por favor, verifica los permisos."
          );
        }
      } else {
        console.error("Error al acceder a la cámara:", error);
        alert(
          "No se puede acceder a la cámara. Por favor, verifica los permisos."
        );
      }
    }
  }
  function setSearch(e, res) {
    closeInterface(e);
    const word = res.split("->")[1];
    setSearchFood(word);
  }
  return (
    <>
      <button className="button is-danger" onClick={(e) => openInterface(e)}>
        <i className="fa-solid fa-camera"></i>
      </button>
      {mobile ? (
        <>
          <dialog id="supersticial">
            <button id="close-btn" onClick={(e) => closeInterface(e)}>
              X
            </button>
            <h1>Camera</h1>
            <video id="video" width="640" height="480" autoPlay></video>
            <button id="capture" onClick={(e) => e.preventDefault()}>
              Take photo
            </button>
            <canvas
              id="canvas"
              width="640"
              height="480"
              style={{ display: "none" }}
            ></canvas>
            <img
              id="photo"
              src=""
              alt="Foto capturada"
              style={{ display: "none" }}
            />

            {isLoading && <p>Analyzing image...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && (
              <table>
                <thead>
                  <tr>
                    <th> Result:</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map(
                    (res) =>
                      (
                        <tr key={res}>
                          <td>
                            <a onClick={(e) => setSearch(e, res)}>{res}</a>
                          </td>
                        </tr>
                      ) ?? ""
                  )}
                </tbody>
              </table>
            )}
          </dialog>
        </>
      ) : (
        <dialog id="supersticial">
          <button id="close-btn" onClick={(e) => closeInterface(e)}>
            X
          </button>
          <h1>Choose the image you want to process</h1>
          <br />
          <input type="file" name="" id="" onChange={handleImageUpload} />
          {isLoading && <p>Analyzing image...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          {result && (
            <table>
              <thead>
                <tr>
                  <th> Result:</th>
                </tr>
              </thead>
              <tbody>
                {result.map(
                  (res) =>
                    (
                      <tr key={res}>
                        <td>
                          <a onClick={(e) => setSearch(e, res)}>{res}</a>
                        </td>
                      </tr>
                    ) ?? ""
                )}
              </tbody>
            </table>
          )}
        </dialog>
      )}
    </>
  );
};

export default ImageRecognition;
