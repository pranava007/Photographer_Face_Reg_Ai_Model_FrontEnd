// UploadImages.jsx (React)
import React, { useState } from "react";
import { Button, Label, FileInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { clearEvent } from "../Redux/Slice/EventSlice"
import { app } from "../firbase"; // make sure firebase.js is correctly configured

const UploadImages = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const eventId = useSelector((state) => state.event.eventId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storage = getStorage(app);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!eventId || imageFiles.length === 0) {
      alert("Please create event and select images.");
      return;
    }

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const storageRef = ref(storage, `events/${eventId}/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${eventId}/upload-images`,
        { photo_urls: urls },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Images uploaded and saved to DB!");
      dispatch(clearEvent());
      navigate("/");
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Failed to upload images.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Upload Images</h2>

        <div>
          <Label htmlFor="images" value="Select Images" />
          <FileInput
            id="images"
            multiple
            accept="image/*"
            onChange={(e) => setImageFiles([...e.target.files])}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Upload Images
        </Button>
      </form>
    </div>
  );
};

export default UploadImages;