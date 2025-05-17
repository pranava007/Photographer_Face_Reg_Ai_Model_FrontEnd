// import React, { useEffect, useState, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { app } from "../firbase"; // ✅ Make sure firebase.js is correct

// const PublicUploadForm = () => {
//   const [params] = useSearchParams();
//   const eventId = params.get("event_id");

//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");
//   const [file, setFile] = useState(null);
//   const [previewSrc, setPreviewSrc] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [matchedPhotos, setMatchedPhotos] = useState([]);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const storage = getStorage(app);

//   // ✅ Access webcam
//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((err) => {
//         alert("Camera access denied");
//         console.error("Camera error:", err);
//       });
//   }, []);

//   // ✅ Capture photo
//   const handleTakeSelfie = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//       const selfieFile = new File([blob], "selfie.png", { type: "image/png" });
//       setFile(selfieFile);

//       // Show preview
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewSrc(reader.result);
//       reader.readAsDataURL(selfieFile);
//     }, "image/png");
//   };

//   // ✅ Upload + match
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file || !name || !number) return alert("All fields required");

//     setUploading(true);

//     try {
//       const storageRef = ref(storage, `user_uploads/${eventId}/${file.name}`);
//       await uploadBytes(storageRef, file);
//       const selfieUrl = await getDownloadURL(storageRef);

//       // Store user selfie data
//       await axios.post(`http://localhost:5000/api/events/${eventId}/user-upload`, {
//         name,
//         number,
//         selfie_url: selfieUrl,
//       });

//       // AI Matching
//       const aiRes = await axios.post(`http://localhost:5000/api/events/${eventId}/ai-match`, {
//         selfie_url: selfieUrl,
//       });

//       setMatchedPhotos(aiRes.data.matches || []);
//       alert("Uploaded and matched successfully!");
//       setName(""); setNumber(""); setFile(null); setPreviewSrc(null);

//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-5"
//       >
//         <h2 className="text-xl font-bold text-center">Upload Your Selfie</h2>

//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full border px-3 py-2 rounded"
//         />

//         <input
//           type="text"
//           placeholder="Mobile Number"
//           value={number}
//           onChange={(e) => setNumber(e.target.value)}
//           required
//           className="w-full border px-3 py-2 rounded"
//         />

//         {/* Webcam */}
//         <div className="space-y-3 text-center">
//           <video ref={videoRef} autoPlay className="w-full rounded" width={300} height={220} />
//           <canvas ref={canvasRef} width={300} height={220} className="hidden" />
//           <button
//             type="button"
//             onClick={handleTakeSelfie}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Take Selfie
//           </button>
//         </div>

//         {/* Preview */}
//         {previewSrc && (
//           <img src={previewSrc} alt="Captured Selfie" className="w-full h-40 object-cover rounded" />
//         )}

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded w-full"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Submit Selfie"}
//         </button>
//       </form>

//       {/* Matched Output */}
//       {matchedPhotos.length > 0 && (
//         <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
//           <h3 className="text-lg font-semibold mb-4">AI Matched Photos</h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {matchedPhotos.map((url, idx) => (
//               <div key={idx} className="text-center space-y-2">
//                 <img src={url} alt="Matched" className="w-full h-32 object-cover rounded" />
//                 <a href={url} download className="text-blue-500 underline text-sm">
//                   Download
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PublicUploadForm;


import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firbase"; // ✅ Make sure firebase.js is correct

const PublicUploadForm = () => {
  const [params] = useSearchParams();
  const eventId = params.get("event_id");

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [file, setFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [matchedPhotos, setMatchedPhotos] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const storage = getStorage(app);

  // ✅ Access webcam with better resolution
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",
      },
    })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        alert("Camera access denied");
        console.error("Camera error:", err);
      });
  }, []);

  // ✅ Capture photo
  const handleTakeSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas size same as video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const selfieFile = new File([blob], "selfie.png", { type: "image/png" });
      setFile(selfieFile);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => setPreviewSrc(reader.result);
      reader.readAsDataURL(selfieFile);
    }, "image/png");
  };

  // ✅ Upload + match
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !number) return alert("All fields required");

    setUploading(true);

    try {
      const storageRef = ref(storage, `user_uploads/${eventId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const selfieUrl = await getDownloadURL(storageRef);

      // Store user selfie data
      await axios.post(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/user-upload`, {
        name,
        number,
        selfie_url: selfieUrl,
      });

      // AI Matching
      const aiRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/ai-match`, {
        selfie_url: selfieUrl,
      });

      setMatchedPhotos(aiRes.data.matches || []);
      alert("Uploaded and matched successfully!");
      setName(""); setNumber(""); setFile(null); setPreviewSrc(null);

    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto space-y-5"
      >
        <h2 className="text-xl font-bold text-center">Upload Your Selfie</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        {/* Webcam */}
        <div className="space-y-3 text-center">
          <video
            ref={videoRef}
            autoPlay
            className="w-full rounded border"
            width={480}
            height={360}
          />
          <canvas ref={canvasRef} className="hidden" />
          <button
            type="button"
            onClick={handleTakeSelfie}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Take Selfie
          </button>
        </div>

        {/* Preview */}
        {previewSrc && (
          <img src={previewSrc} alt="Captured Selfie" className="w-full h-40 object-cover rounded" />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Submit Selfie"}
        </button>
      </form>

      {/* Matched Output */}
      {matchedPhotos.length > 0 && (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">AI Matched Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {matchedPhotos.map((url, idx) => (
              <div key={idx} className="text-center space-y-2">
                <img src={url} alt="Matched" className="w-full h-32 object-cover rounded" />
                <a href={url} download className="text-blue-500 underline text-sm">
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicUploadForm;
