// import React, { useState } from "react";
// import ProfileCard from "../components/Brides/GroomCard";
// import { Menu, X } from "lucide-react";
// import { useGetGroomsQuery } from "../context/profileApi";

// /* --------------------------------
//    MAP GROOM BACKEND → CARD DATA
// --------------------------------- */
// const mapGroomToCard = (groom) => {
//   const convertHeight = (value) => {
//     if (value === null || value === undefined) return "";
//     const feet = Math.floor(value);
//     const inches = Math.round((value - feet) * 12);
//     return `${feet}'${String(inches).padStart(2, "0")}"`;
//   };

//   const formatBirthDate = (dob) => {
//     if (!dob) return "";
//     const [y, m, d] = dob.split("T")[0].split("-");
//     return `${d}-${m}-${y}`;
//   };

//   return {
//     id: groom.userId,

//     // SAME STRUCTURE AS BRIDES
//     firstName: groom.firstName || "",
//     lastName: groom.lastName || "",

//     birthDate: formatBirthDate(groom.dateOfBirth),
//     height: convertHeight(groom.height),
//     education: groom.education ?? "Not Available",
//     occupation: groom.occupation ?? "Not Available",
//     city: groom.city ?? "Not Available",
//     caste: groom.caste ?? "Not Available",
//     image: groom.profilePhoto?.[0] || "/default-avatar.jpg",
//   };
// };

// const Groom = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { data, isLoading, isError } = useGetGroomsQuery({
//     page: 0,
//     size: 10,
//   });

//   // FIXED (same as Brides.jsx)
//   const grooms = data?.list || [];
//   const profiles = grooms.map(mapGroomToCard);

//   return (
//     <div className="flex min-h-screen bg-white">

//       {/* MOBILE MENU BUTTON */}
//       <button
//         className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
//         <div className="max-w-4xl mx-auto space-y-6">

//           {/* LOADING */}
//           {isLoading && (
//             <p className="text-center text-gray-500">
//               Loading groom profiles...
//             </p>
//           )}

//           {/* ERROR */}
//           {isError && (
//             <p className="text-center text-red-500">
//               Failed to load groom profiles.
//             </p>
//           )}

//           {/* EMPTY */}
//           {!isLoading && profiles.length === 0 && (
//             <p className="text-center text-gray-600">
//               No groom profiles found.
//             </p>
//           )}

//           {/* PROFILE CARDS */}
//           {profiles.map((profile) => (
//             <ProfileCard key={profile.id} profile={profile} />
//           ))}

//         </div>
//       </section>
//     </div>
//   );
// };

// export default Groom;









// import React, { useState } from "react";
// import ProfileCard from "../components/Brides/GroomCard";
// import { Menu, X } from "lucide-react";
// import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

// const Groom = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { data, isLoading, isError } = useBrowseProfilesByGenderQuery({
//     gender: "MALE",
//     page: 0,
//     size: 10,
//   });

//   // CORRECT RESPONSE PATH
//   const users = data?.data?.content || [];

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* MOBILE MENU BUTTON */}
//       <button
//         className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
//         <div className="max-w-4xl mx-auto space-y-6">
//           {isLoading && (
//             <p className="text-center text-gray-500">
//               Loading grooms...
//             </p>
//           )}

//           {isError && (
//             <p className="text-center text-red-500">
//               Failed to load grooms.
//             </p>
//           )}

//           {!isLoading && users.length === 0 && (
//             <p className="text-center text-gray-600">
//               No grooms found.
//             </p>
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

// export default Groom;







import React, { useState } from "react";
import ProfileCard from "../components/Brides/GroomCard";
import { Menu, X } from "lucide-react";
import { useBrowseProfilesByGenderQuery } from "../context/profileApi";

const Groom = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔹 Browse male profiles
  const { data, isLoading, isError } = useBrowseProfilesByGenderQuery({
    gender: "MALE",
    page: 0,
    size: 10,
  });

  // ✅ CORRECT RESPONSE PATH
  const users = data?.data?.content || [];

  return (
    <div className="flex min-h-screen bg-white">
      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-20 left-4 z-[41] bg-white p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <section className="flex-1 p-4 md:p-6 mt-5 overflow-y-auto h-[calc(100vh-80px)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {isLoading && (
            <p className="text-center text-gray-500">
              Loading grooms...
            </p>
          )}

          {isError && (
            <p className="text-center text-red-500">
              Failed to load grooms.
            </p>
          )}

          {!isLoading && users.length === 0 && (
            <p className="text-center text-gray-600">
              No grooms found.
            </p>
          )}

          {/* ✅ PASS PROFILE OBJECT */}
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

export default Groom;
