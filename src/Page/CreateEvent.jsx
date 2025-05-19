// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import {
//   eventCreateStart,
//   eventCreateSuccess,
//   eventCreateFailure,
// } from "../Redux/Slice/EventSlice";
// import { useNavigate } from "react-router-dom";

// const CreateEvent = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [eventName, setEventName] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(eventCreateStart());

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:5000/api/event",
//         {
//           event_name: eventName,
//           event_date: eventDate,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       dispatch(eventCreateSuccess(res.data));
//       setShowModal(false);
//       setEventName("");
//       setEventDate("");
//       // navigate("/event-list");
//     } catch (err) {
//       dispatch(eventCreateFailure(err.response?.data || err.message));
//       alert("Event creation failed.");
//     }
//   };

//   return (
//     <div className="">
//       <button
//         className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         onClick={() => setShowModal(true)}
//       >
//         Create New Event
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
//             <h2 className="text-xl font-semibold text-center mb-4">Create Event</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="event_name" className="block mb-1 font-medium">
//                   Event Title
//                 </label>
//                 <input
//                   id="event_name"
//                   type="text"
//                   required
//                   value={eventName}
//                   onChange={(e) => setEventName(e.target.value)}
//                   className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="event_date" className="block mb-1 font-medium">
//                   Event Date
//                 </label>
//                 <input
//                   id="event_date"
//                   type="date"
//                   required
//                   value={eventDate}
//                   onChange={(e) => setEventDate(e.target.value)}
//                   className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
//                 />
//               </div>

//               <div className="flex justify-end space-x-2 pt-2">
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateEvent;


import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  eventCreateStart,
  eventCreateSuccess,
  eventCreateFailure,
} from "../Redux/Slice/EventSlice";

const CreateEvent = ({ onEventCreated }) => {
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(eventCreateStart());

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/event`,
        {
          event_name: eventName,
          event_date: eventDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      dispatch(eventCreateSuccess(res.data));
      setShowModal(false);
      setEventName("");
      setEventDate("");
      onEventCreated(); // 🔁 Trigger re-fetch in parent
    } catch (err) {
      dispatch(eventCreateFailure(err.response?.data || err.message));
      alert("Event creation failed.");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Create New Event
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
            <h2 className="text-xl font-semibold text-center mb-4">Create Event</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="event_name" className="block mb-1 font-medium">
                  Event Title
                </label>
                <input
                  id="event_name"
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label htmlFor="event_date" className="block mb-1 font-medium">
                  Event Date
                </label>
                <input
                  id="event_date"
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
