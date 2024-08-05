import { isMobileDevice } from "../utils/isMobile";

const ImageRecognition = () => {
  const mobile = isMobileDevice();
  function openInterface() {
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
  function closeInterface() {
    document.getElementById("supersticial").close();
    document.getElementById("supersticial").style.visibility = "hidden";
    document.getElementById("close-btn").style.visibility = "hidden";
  }

  return (
    <>
      <div
        className="button is-info icon fa-solid fa-camera"
        onClick={() => openInterface()}
      ></div>
      {mobile ? (
        <>
          <dialog id="supersticial">
            <button id="close-btn" onClick={() => closeInterface()}>
              X
            </button>
            <h1>Captura de Fotos desde la Cámara</h1>
            <video id="video" width="640" height="480" autoPlay></video>
            <button id="capture">Tomar Foto</button>
            <canvas
              id="canvas"
              width="640"
              height="480"
              style={{ display: "none" }}
            ></canvas>
            <img id="photo" src="" alt="Foto capturada" />
          </dialog>
        </>
      ) : (
        <dialog id="supersticial">
          <button id="close-btn" onClick={() => closeInterface()}>
            X
          </button>
          <h1>Elige la imagen que quieras procesar</h1>
          <input type="file" name="" id="" />
        </dialog>
      )}
    </>
  );
};

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.getElementById("video");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error al acceder a la cámara:", error);
    alert("No se puede acceder a la cámara. Por favor, verifica los permisos.");
  }
}

function capturePhoto() {
  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  const photo = document.getElementById("photo");
  const context = canvas.getContext("2d");
  const btnCapture = document.getElementById("capture");

  // Dibuja el cuadro de video en el canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convierte el contenido del canvas a una URL de datos y la asigna al elemento img
  const dataURL = canvas.toDataURL("image/png");
  photo.src = dataURL;
  // Oculta el video y detén la transmisión
  video.style.display = "none";
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());
  video.srcObject = null;
  btnCapture.style.display = "none";

  // Muestra la foto capturada
  photo.style.display = "block";
}
export default ImageRecognition;
