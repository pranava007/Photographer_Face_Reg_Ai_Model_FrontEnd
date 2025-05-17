import { useState } from "react";
import "./App.css";
import Register from "./Page/Register";
import Login from "./Page/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Footero from "./Components/Footer";
import CreateEventForm from "./Page/CreateEventForm";
import UploadImages from "./Page/UploadImages";
import CreateEvent from "./Page/CreateEvent";
import AllEventsList from "./Page/AllEventsList";
import PhotographerDashboard from "./Page/PhotographerDashboard";
import EventDetail from "./Page/EventDetails";
import PublicUploadForm from "./Page/PublicUploadForm";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Step 1: Create Event */}
          <Route path="/dashboard" element={<PhotographerDashboard />} />

          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/event-list" element={<AllEventsList />} />
     

          <Route path="/create-event-form" element={<CreateEventForm />} />

          {/* Step 2: Upload Images */}
          <Route path="/upload-images" element={<UploadImages />} />

          <Route path="/upload" element={<PublicUploadForm />} />

        </Routes>
        <Footero />
      </BrowserRouter>
    </>
  );
}

export default App;
