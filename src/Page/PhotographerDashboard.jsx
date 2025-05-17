
// // 📁 src/pages/PhotographerDashboard.jsx
// import React, { useState } from "react";
// import CreateEvent from "./CreateEvent";
// import AllEventsList from "./AllEventsList";

// const PhotographerDashboard = () => {
//   const [refreshToggle, setRefreshToggle] = useState(false);

//   const handleEventCreated = () => {
//     setRefreshToggle((prev) => !prev);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Photographer Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="col-span-1 flex justify-center items-start">
//           <CreateEvent onEventCreated={handleEventCreated} />
//         </div>
//         <div className="col-span-2 space-y-1">
//           <AllEventsList refreshToggle={refreshToggle} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PhotographerDashboard;

// import React, { useState } from "react";
// import CreateEvent from "./CreateEvent";
// import AllEventsList from "./AllEventsList";

// const PhotographerDashboard = () => {
//   const [refreshToggle, setRefreshToggle] = useState(false);

//   const handleEventCreated = () => {
//     setRefreshToggle((prev) => !prev);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-8 py-10 flex gap-6">
//       {/* LEFT PANEL */}
//       <div className="w-full md:w-1/3 bg-white rounded shadow p-6 flex flex-col ">
//         <div>
//           <h1 className="text-3xl font-bold  text-gray-800">
//             Photographer Dashboard
//           </h1>
//         </div>

//         <div className="mt-14">
//           <CreateEvent onEventCreated={handleEventCreated} />
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="w-full md:w-2/3 bg-white rounded shadow p-6 ">
//         <AllEventsList refreshToggle={refreshToggle} />
//       </div>
//     </div>
//   );
// };

// export default PhotographerDashboard;

import React, { useState } from "react";
import CreateEvent from "./CreateEvent";
import AllEventsList from "./AllEventsList";

const PhotographerDashboard = () => {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const handleEventCreated = () => {
    setRefreshToggle((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <div className="bg-white rounded shadow p-6 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Photographer Dashboard
              </h1>

              <CreateEvent onEventCreated={handleEventCreated} />

            </div>

           
            


           
          </div>

          {/* RIGHT PANEL */}
          <div className="md:col-span-2 bg-white rounded shadow p-6  max-h-[80vh]">
            <AllEventsList refreshToggle={refreshToggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographerDashboard;
