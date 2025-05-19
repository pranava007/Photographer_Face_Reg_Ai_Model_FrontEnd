import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firbase"; // make sure firebase.js is configured correctly

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const storage = getStorage(app);

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvent(res.data);
      setImages(res.data.official_photos || []);
    } catch (error) {
      console.error("Failed to fetch event:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return;

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = ref(storage, `events/${eventId}/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const firebaseUrls = await Promise.all(uploadPromises);

      await axios.post(
        // `http://localhost:5000/api/events/${eventId}/upload-images`,
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/upload-official`,
        // http://localhost:5000/api/events/<event_id>/upload-official
        { photo_urls: firebaseUrls },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSelectedFiles([]);
      fetchEvent(); // refresh event data
    } catch (error) {
      alert(`Upload failed ${error}`);
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  if (!event) return <p className="p-6">Loading event...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.event_name}</h1>
        <p className="text-gray-600 mb-6">Date: {event.event_date}</p>

<form onSubmit={handleUpload} className="space-y-6">
  {/* Upload Box */}
  <div className="w-full">
    <label
      htmlFor="image-upload"
      className="flex flex-col items-center justify-center w-full h-48 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
    >
      <svg
        className="w-10 h-10 mb-3 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 014-4h10a4 4 0 014 4v1a4 4 0 01-4 4H7a4 4 0 01-4-4v-1z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11V3m0 0l3.5 3.5M12 3L8.5 6.5"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500">
        <span className="font-semibold">Drag & Drop</span> or click to upload
      </p>
      <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 10MB</p>
      <input
        id="image-upload"
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => setSelectedFiles([...e.target.files])}
      />
    </label>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-wrap gap-4 justify-start">
    <button
      type="submit"
      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
      disabled={uploading}
    >
      {uploading ? "Uploading..." : "Upload Images"}
    </button>

    {event?.qr_code_url && (
      <a
        href={`${event.qr_code_url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
      >
        View QR Code
      </a>
    )}
  </div>
</form>


        <div>
          <h2 className="text-xl font-semibold mb-3">Uploaded Photos</h2>
          {images.length === 0 ? (
            <p className="text-gray-500">No photos uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
