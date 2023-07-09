import Head from "next/head";
import { Inter } from "next/font/google";
import { useRef, useState } from "react";
import nookies from "nookies";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  console.log(cookies);
  return {
    props: {},
  };
}

export default function Camera() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [photoUrl, setPhotoUrl] = useState([]);
  const [files, setFiles] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleSuccess = (stream) => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const handleError = (error) => {
    console.log("Error accessing media devices", error);
  };

  const getVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      handleSuccess(stream);
    } catch (error) {
      handleError(error);
    }
  };

  const takePhoto = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.canvas.width = videoRef.current.videoWidth;
      context.canvas.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        context.canvas.width,
        context.canvas.height
      );
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const arr = [];
      arr.push(dataUrl);
      const base64 = arr[0].split(",");
      const result = baseToFloat(base64[1]);
      setPhotoUrl((prev) => [...prev, ...arr]);
    }
  };

  function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  function baseToFloat(base64String) {
    var base64String = "";
    var binaryString = atob(base64String);

    var arrayBuffer = new ArrayBuffer(binaryString.length);
    var bufferView = new Uint8Array(arrayBuffer);
    for (var i = 0; i < binaryString.length; i++) {
      bufferView[i] = binaryString.charCodeAt(i);
    }

    var float32Array = new Float32Array(arrayBuffer);
    console.log(float32Array);
  }

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < photoUrl.length; i++) {
      const blob = dataURItoBlob(photoUrl[i]);
      formData.append("files", blob, "image.jpg");
      console.log(blob);
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/upload`,
        formData
      );
      const imageId = [];
      for (let i = 0; i < photoUrl.length; i++) {
        imageId.push({ id: res.data[i].id });
      }
      console.log(imageId);
      const id = localStorage.getItem("id");
      axios
        .put(`${process.env.NEXT_PUBLIC_URL}/api/users/${id}`, {
          image: imageId,
        })
        .then((res) => {
          console.log("success");
          window.location.reload();
        })
        .catch((err) => {
          console.log("gagal");
        });
      console.log(imageId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (photoUrl.length === 0) {
      setShowNotification(true);
      return;
    }
    toggleModal();
  };

  const confirmUpload = async () => {
    toggleModal();
    await handleUpload();
  };

  const deleteImage = (index) => {
    const tempData = photoUrl;
    tempData.splice(index, 1);
    setPhotoUrl([...tempData]);
  };
  return (
    <>
      <div className="App my-8">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex gap-2 justify-center">
            <button
              className="btn btn-outline"
              type="button"
              onClick={getVideo}
            >
              Start Video
            </button>
            <button
              className="btn btn-active"
              type="button"
              onClick={takePhoto}
            >
              Take Photo
            </button>
          </div>
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg m-auto mt-4"
          ></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <div className="flex justify-center gap-4 my-8 flex-wrap">
            {photoUrl.map((photo, key) => (
              <div key={key} className="relative">
                <button
                  className="btn btn-circle btn-outline absolute -right-4 -top-4 bg-white"
                  type="button"
                  onClick={() => deleteImage(key)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <img src={photo} alt="object" className="rounded-lg w-64" />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="px-8 py-4 btn btn-outline" type="submit">
              Upload
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Confirm Upload</h2>
                <p>Are you sure you want to upload the selected photos?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="btn btn-outline mr-4"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={confirmUpload}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Notification</h2>
            <p>Please select at least one photo before uploading.</p>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setShowNotification(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}