const ImageRecognition = () => {
  function openInterface() {
    if (isMobileDevice()) {
      document.querySelector(".App").insertAdjacentHTML(
        "beforeend",
        `
                    <div id="supersticial">
                    <div id="close-btn">X</div>
                    <h1>Captura de Fotos desde la Cámara</h1>
                    <video id="video" width="640" height="480" autoplay></video>
                    <button id="capture">Tomar Foto</button>
                    <canvas id="canvas" width="640" height="480" style="display: none;"></canvas>
                    <img id="photo" src="" alt="Foto capturada">
                    </div>`
      );
      document
        .getElementById("capture")
        .addEventListener("click", capturePhoto);

      window.addEventListener("load", startCamera);
    } else {
      document.querySelector(".App").insertAdjacentHTML(
        "beforeend",
        `
                <div id="supersticial">
                  <div id="close-btn">X</div>
                  <h1>Elige la imagen que quieras procesar</h1>
                  <input type="file" name="" id="" />
                </div>`
      );
    }
    document.getElementById("close-btn").addEventListener("click", function () {
      document.getElementById("supersticial").style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
  return (
    <div
      className="button is-info icon fa-solid fa-camera"
      onClick={() => openInterface()}
    ></div>
  );
};

function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
    userAgent
  );
}

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

  // Dibuja el cuadro de video en el canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convierte el contenido del canvas a una URL de datos y la asigna al elemento img
  const dataURL = canvas.toDataURL("image/png");
  photo.src = dataURL;
}
export default ImageRecognition;
