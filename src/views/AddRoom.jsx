import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRoomPage({ addRoom }) {
  const [roomName, setRoomName] = useState("");
  const [roomColor, setRoomColor] = useState("");
  const [roomType, setRoomType] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (roomName && roomType && roomColor) {
      addRoom({
        name: roomName,
        color: roomColor,
        type: roomType,
        devices: [],
      });
      navigate("/homepage");
    } else {
      alert("Error: You must provide name, color and type !");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Smart House</h1>
      <div className="mb-4 w-full max-w-md">
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        >
          <option value="">Select Room Type</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Kitchen">Kitchen</option>
        </select>
      </div>
      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
          maxLength={9}
          className="border p-2 mb-2 w-full rounded"
        />
      </div>
      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          value={roomColor}
          onChange={(e) => setRoomColor(e.target.value)}
          placeholder="Room color"
          className="border p-2 mb-2 w-full rounded"
        />
      </div>
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Create
      </button>
    </div>
  );
}
