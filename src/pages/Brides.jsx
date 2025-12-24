// import React, { useState } from "react";
// import ProfileCard from "../components/Brides/GroomCard";
// import { Menu, X } from "lucide-react";
// import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

// const Brides = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

// const { data, isLoading, isError } = useBrowseProfilesByGenderQuery({
//   gender: "FEMALE",
//   page: 0,
//   size: 10,
// });

//   //CORRECT: API returns `list`
//   const users = data?.list || [];

//   return (
//     <div className="flex min-h-screen bg-white">
//       <button
//         className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {isLoading && (
//             <p className="text-center text-gray-500">Loading brides...</p>
//           )}

//           {isError && (
//             <p className="text-center text-red-500">
//               Failed to load brides.
//             </p>
//           )}

//           {!isLoading && users.length === 0 && (
//             <p className="text-center text-gray-600">No brides found.</p>
//           )}

//           {/*PASS RAW USER OBJECT */}
//           {users.map((user) => (
//             <ProfileCard key={user.userId} profile={user} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Brides;








// import React, { useState } from "react";
// import ProfileCard from "../components/Brides/GroomCard";
// import { Menu, X } from "lucide-react";
// import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

// const Brides = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { data, isLoading, isError } = useBrowseProfilesByGenderQuery({
//     gender: "FEMALE",
//     page: 0,
//     size: 10,
//   });

//   // CORRECT DATA PATH
//   const users = data?.data?.content || [];

//   return (
//     <div className="flex min-h-screen bg-white">
//       <button
//         className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {isLoading && (
//             <p className="text-center text-gray-500">Loading brides...</p>
//           )}

//           {isError && (
//             <p className="text-center text-red-500">
//               Failed to load brides.
//             </p>
//           )}

//           {!isLoading && users.length === 0 && (
//             <p className="text-center text-gray-600">No brides found.</p>
//           )}

//           {/* PASS PROFILE OBJECT */}
//           {users.map((profile) => (
//             <ProfileCard
//               key={profile.userProfileId}
//               profile={profile}
//             />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Brides;







import React, { useState } from "react";
import ProfileCard from "../components/Brides/GroomCard";
import { Menu, X } from "lucide-react";
import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

const Brides = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading, isError } = useBrowseProfilesByGenderQuery({
    gender: "FEMALE",
    page: 0,
    size: 10,
  });

  // ✅ CORRECT RESPONSE PATH
  const users = data?.data?.content || [];

  return (
    <div className="flex min-h-screen bg-white">
      <button
        className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {isLoading && (
            <p className="text-center text-gray-500">Loading brides...</p>
          )}

          {isError && (
            <p className="text-center text-red-500">
              Failed to load brides.
            </p>
          )}

          {!isLoading && users.length === 0 && (
            <p className="text-center text-gray-600">No brides found.</p>
          )}

          {/* ✅ PASS COMPLETE PROFILE OBJECT */}
          {users.map((profile) => (
            <ProfileCard
              key={profile.userProfileId}
              profile={profile}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Brides;
