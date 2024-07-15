// 'use client'
// import { useState } from "react";
// import {login} from "@/utils/authService";

// function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const response = await login(username, password);
//     if (response.status === 200) {
//       setIsLoggedIn(true);
//     }
//   };

//   return (
//     <>
//       {isLoggedIn ? (
//         <div>Hello {username}</div>
//       ) : (
//         <form
//           style={{ display: "flex", flexDirection: "column" }}
//           onSubmit={handleFormSubmit}
//         >
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             id="username"
//             value={username}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setUsername(e.target.value);
//             }}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={password}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//               setPassword(e.target.value);
//             }}
//             required
//           />

//           <button type="submit" style={{ marginTop: "10px" }}>
//             Login
//           </button>
//         </form>
//       )}
//     </>
//   );
// }

// export default Home;