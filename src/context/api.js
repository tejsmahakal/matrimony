
// // import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // export const apiSlice = createApi({
// //   reducerPath: "api",
// //   baseQuery: fetchBaseQuery({
// //     baseUrl: "http://localhost:8080",
// //     prepareHeaders: (headers) => {
// //       const token = localStorage.getItem("token");

// //       if (token) {
// //         headers.set("Authorization", `Bearer ${token}`);
// //       }

// //       headers.set("Content-Type", "application/json");
// //       return headers;
// //     },
// //   }),
// //   tagTypes: ["Profile", "User", "Admin"],
// //   endpoints: () => ({}),
// // });





// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//     prepareHeaders: (headers, { getState }) => {
//       // DEBUG: Log what's in localStorage
//       console.log("=== API DEBUG ===");
//       console.log("LocalStorage token:", localStorage.getItem("token"));
//       console.log("LocalStorage accessToken:", localStorage.getItem("accessToken"));
      
//       // Try both possible token keys
//       let token = localStorage.getItem("token");
//       if (!token) {
//         token = localStorage.getItem("accessToken");
//       }
      
//       console.log("Token being used for API:", token);

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//         console.log("Authorization header set");
//       } else {
//         console.warn("No token found for API request!");
//       }

//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),
//   tagTypes: ["Profile", "User", "Admin"],
//   endpoints: () => ({}),
// });














// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }

//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),
//   tagTypes: ["Profile", "User", "Admin"],
//   endpoints: () => ({}),
// });





// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//     prepareHeaders: (headers, { getState }) => {
//       // DEBUG: Log what's in localStorage
//       console.log("=== API DEBUG ===");
//       console.log("LocalStorage token:", localStorage.getItem("token"));
//       console.log("LocalStorage accessToken:", localStorage.getItem("accessToken"));
      
//       // Try both possible token keys
//       let token = localStorage.getItem("token");
//       if (!token) {
//         token = localStorage.getItem("accessToken");
//       }
      
//       console.log("Token being used for API:", token);

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//         console.log("Authorization header set");
//       } else {
//         console.warn("No token found for API request!");
//       }

//       headers.set("Content-Type", "application/json");
//       return headers;
//     },
//   }),
//   tagTypes: ["Profile", "User", "Admin"],
//   endpoints: () => ({}),
// });



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers; // let the browser set multipart boundary
//     },
//   }),
//   tagTypes: ["Profile", "User", "Admin"],
//   endpoints: () => ({}),
// });




// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8080",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers; // let the browser set multipart boundary
//     },
//   }),
//   tagTypes: ["Profile", "User", "Admin"],
//   endpoints: () => ({}),
// });



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mttlprv1-production.up.railway.app",

    prepareHeaders: (headers, { getState }) => {
      // Try Redux auth state first
      const tokenFromState = getState()?.auth?.token;

      // Fallback to localStorage
      const token = tokenFromState || localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: [
    "Profile",
    "OwnProfile",
    "ProfilePhoto",
    "BrowseProfiles",
    "SentInterests",
    "ReceivedInterests",
  ],

  endpoints: () => ({}),
});
