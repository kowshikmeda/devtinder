import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  if (import.meta.env.MODE !== "production") {
    return io(BASE_URL, { withCredentials: true });
  } else {
    return io("https://devtinder-oelc.onrender.com", { 
      path: "/socket.io",
      transports: ["websocket"], // Ensures WebSockets are used
      withCredentials: true
    });
  }
};
