import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./views/AuthPage";
import HomePage from "./views/HomePage";
import AddRoom from "./views/AddRoom";
import RoomPage from "./views/RoomPage";
import SearchRoom from "./views/SearchRoom";
import { useState } from "react";

function App() {
  const [rooms, setRooms] = useState(() => {
    // Safe retrieval of rooms from localStorage with error handling
    const storedRooms = localStorage.getItem("rooms");
    try {
      return storedRooms ? JSON.parse(storedRooms) : [];
    } catch (error) {
      console.error("Failed to parse rooms from localStorage:", error);
      return []; // Fallback to an empty array if JSON parsing fails
    }
  });

  // Function to add a new room
  const addRoom = (newRoom) => {
    // Ensure newRoom has an id and an empty devices array if not provided
    const roomWithIdAndDevices = {
      ...newRoom,
      id: `${Date.now()}-${Math.random()}`, // Ensure unique ID
      devices: newRoom.devices || [], // Initialize devices if not present
    };
    const updatedRooms = [...rooms, roomWithIdAndDevices];
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms)); // Save to localStorage
  };

  // Function to update rooms
  const updateRooms = (newRooms) => {
    setRooms(newRooms);
    localStorage.setItem("rooms", JSON.stringify(newRooms));
  };

  // Function to add a device to a room
  const addDevice = (roomName, deviceName) => {
    const updatedRooms = rooms.map((room) =>
      room.name === roomName
        ? {
            ...room,
            devices: [...room.devices, { name: deviceName, on: false }],
          }
        : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms)); // Save to localStorage
  };

  // Function to toggle device state in a room
  const toggleDeviceState = (roomName, deviceIndex) => {
    const updatedRooms = rooms.map((room) =>
      room.name === roomName
        ? {
            ...room,
            devices: room.devices.map((device, index) =>
              index === deviceIndex ? { ...device, on: !device.on } : device
            ),
          }
        : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms)); // Save to localStorage
  };

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/homepage"
        element={<HomePage rooms={rooms} updateRooms={updateRooms} />}
      />
      <Route path="/add-room" element={<AddRoom addRoom={addRoom} />} />
      <Route
        path="/room/:roomName"
        element={
          <RoomPage
            rooms={rooms}
            addDevice={addDevice}
            toggleDeviceState={toggleDeviceState}
          />
        }
      />
      <Route path="/search-room" element={<SearchRoom rooms={rooms} />} />
    </Routes>
  );
}

export default App;
