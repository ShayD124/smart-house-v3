import React from "react";
import Sidebar from "../components/Sidebar";
import Rooms from "../components/Rooms";

export default function HomePage({ rooms = [], updateRooms }) {
  const removeRoom = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    updateRooms(updatedRooms); // Update rooms and localStorage via the parent
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <h2 className="text-4xl font-bold mb-8">Smart House</h2>

        {rooms.length > 0 ? (
          <Rooms rooms={rooms} removeRoom={removeRoom} />
        ) : (
          <p>No rooms. Please add a room.</p>
        )}
      </div>
    </div>
  );
}
