// import React, { useState } from "react";
// import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
// import RequestCard from "../components/PendingRequest/RequestCard";
// import BasicDetails from "../components/ProfileCardUser/BasicDetails";

// import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";

// const RequestsPage = () => {
//   const [activeTab, setActiveTab] = useState("pending");

//   const data = [
//     {
//       id: 1,
//       name: "Kedar",
//       profileId: "GR25086",
//       birthDate: "31-10-2003 (22 Yrs)",
//       height: "5'03",
//       education: "ENGINEER",
//       occupation: "NOT WORKING",
//       city: "SANGLI",
//       caste: "96 KULI MARATHA",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       name: "Kedar",
//       profileId: "GR25086",
//       birthDate: "31-10-2003 (22 Yrs)",
//       height: "5'03",
//       education: "ENGINEER",
//       occupation: "NOT WORKING",
//       city: "SANGLI",
//       caste: "96 KULI MARATHA",
//       status: "Approved",
//     },
//     {
//       id: 3,
//       name: "Kedar",
//       profileId: "GR25086",
//       birthDate: "31-10-2003 (22 Yrs)",
//       height: "5'03",
//       education: "ENGINEER",
//       occupation: "NOT WORKING",
//       city: "SANGLI",
//       caste: "96 KULI MARATHA",
//       status: "Rejected",
//     },
//   ];

//   return (
//     <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">

//       {/* ---------------- LEFT SIDE ---------------- */}
//       <div className="w-1/4 space-y-6">
//         <ProfileCardUser />

//         {/* Basic Details Filter Section */}
//         <BasicDetails />
//         <MyAccountSidebar />
//       </div>

//       {/* ---------------- RIGHT SIDE ---------------- */}
//       <div className="flex-1 space-y-6">

//         {/* Tabs */}
//         <div className="flex gap-4">
//           <button
//             onClick={() => setActiveTab("pending")}
//             className={`px-4 py-2 rounded-full border ${
//               activeTab === "pending"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100"
//             }`}
//           >
//             Pending Request
//           </button>

//           <button
//             onClick={() => setActiveTab("rejected")}
//             className={`px-4 py-2 rounded-full border ${
//               activeTab === "rejected"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100"
//             }`}
//           >
//             Rejected
//           </button>

//           <button
//             onClick={() => setActiveTab("approved")}
//             className={`px-4 py-2 rounded-full border ${
//               activeTab === "approved"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100"
//             }`}
//           >
//             Favourite
//           </button>
//         </div>

//         {/* CARD LIST */}
//         {data
//           .filter((item) =>
//             activeTab === "pending"
//               ? item.status === "Pending"
//               : activeTab === "approved"
//               ? item.status === "Approved"
//               : item.status === "Rejected"
//           )
//           .map((item) => (
//             <RequestCard key={item.id} item={item} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default RequestsPage;

import React, { useEffect, useState } from "react";
import ProfileCardUser from "../components/ProfileCardUser/ProfileCardUser";
import RequestCard from "../components/PendingRequest/RequestCard";
import BasicDetails from "../components/ProfileCardUser/BasicDetails";
import MyAccountSidebar from "../components/MyAccountSidebar/MyAccountSidebar";

import { useGetSentInterestsQuery } from "../context/profileApi";

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingProfiles, setPendingProfiles] = useState([]);

  /*GET SENT INTERESTS */
  const { data: sentResponse, isLoading } = useGetSentInterestsQuery();
  const sentInterests = sentResponse?.data?.content || [];

  /*FETCH PUBLIC PROFILES USING interestId */
  useEffect(() => {
    const fetchProfiles = async () => {
      const cards = [];

      for (const interest of sentInterests) {
        // ✅ USE THIS FIELD
        const profileId = interest.toUserCompleteProfileId;

        if (!profileId) continue;

        try {
          const res = await fetch(
            `https://mttlprv1-production.up.railway.app/api/v1/profiles/${profileId}/public`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const json = await res.json();

          if (json?.data) {
            cards.push({
              id: interest.interestId, // unique key
              profileId: profileId, // shown on UI
              status: "Pending",

              /* PUBLIC PROFILE DATA */
              name: json.data.firstName,
              age: json.data.age,
              gender: json.data.gender,
              religion: json.data.religion,
              caste: json.data.caste,
              height: json.data.height,
              city: json.data.currentCity,
              maritalStatus: json.data.maritalStatus,
            });
          }
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      }

      setPendingProfiles(cards);
    };

    if (sentInterests.length > 0) {
      fetchProfiles();
    }
  }, [sentInterests]);

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* LEFT SIDE */}
      <div className="w-1/4 space-y-6">
        <ProfileCardUser />
        <BasicDetails />
        <MyAccountSidebar />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 space-y-6">
        {/* TABS */}
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-full border ${
              activeTab === "pending"
                ? "bg-orange-500 text-white"
                : "bg-gray-100"
            }`}
          >
            Pending Request
          </button>

          <button className="px-4 py-2 rounded-full border bg-gray-100">
            Rejected
          </button>

          <button className="px-4 py-2 rounded-full border bg-gray-100">
            Favourite
          </button>
        </div>

        {/* PENDING REQUEST CARDS */}
        {activeTab === "pending" && (
          <>
            {isLoading && (
              <p className="text-center text-gray-500">
                Loading pending requests...
              </p>
            )}

            {!isLoading && pendingProfiles.length === 0 && (
              <p className="text-center text-gray-600">
                No pending requests found.
              </p>
            )}

            {pendingProfiles.map((item) => (
              <RequestCard key={item.id} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
