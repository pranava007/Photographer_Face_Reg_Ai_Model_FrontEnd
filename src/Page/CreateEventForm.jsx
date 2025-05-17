import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  eventCreateStart,
  eventCreateSuccess,
  eventCreateFailure,
} from "../Redux/Slice/EventSlice";
import { useNavigate } from "react-router-dom";

const CreateEventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    dispatch(eventCreateStart());

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/event`,
        {
           event_name: eventName,
           event_date: eventDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(eventCreateSuccess(res.data));
      navigate("/upload-images");
    } catch (err) {
      dispatch(eventCreateFailure(err.response?.data || err.message));
      alert("Event creation failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleCreateEvent}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">Create Event</h2>

        <div>
          <Label htmlFor="event_name" value="Event Title" />
          <TextInput
            id="event_name"
            type="text"
            required
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="event_date" value="Event Date" />
          <TextInput
            id="event_date"
            type="date"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">Create Event</Button>
      </form>
    </div>
  );
};

export default CreateEventForm;
