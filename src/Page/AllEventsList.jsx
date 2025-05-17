
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllEventsList = ({ refreshToggle }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refreshToggle]); // ✅ triggers on new event

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>
      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {events.length === 0 && !loading ? (
        <p>No events found. Create your first event.</p>
      ) : (
        <ul className="space-y-4 overflow-y-auto h-[500px] pr-2 ">
          {events.map((event) => (
            <li
              key={event._id}
              onClick={() => navigate(`/event/${event._id}`)}
              className="border p-4 rounded hover:bg-gray-100 cursor-pointer"
            >
              <h3 className="text-lg font-medium">{event.event_name}</h3>
              <p className="text-sm text-gray-500">{event.event_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllEventsList;
