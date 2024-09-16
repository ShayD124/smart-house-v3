import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage({ rooms, addDevice, toggleDeviceState }) {
  const { roomName } = useParams();
  const room = rooms.find((r) => r.name === roomName);
  const [device, setDevice] = useState("");

  // If room is not found
  if (!room) {
    return <div>Room not found</div>;
  }

  const handleAddDevice = () => {
    if (!device) {
      alert("No device selected");
      return;
    }
    if (room.devices.length >= 5) {
      alert("Error: Maximum devices is 5!");
      return;
    }

    let stereoSystemExists = room.devices.some(
      (d) => d.name === "Stereo System"
    );
    if (device === "Stereo System" && stereoSystemExists) {
      alert("Error");
      return;
    }
    if (device === "Boiler" && room.type !== "Bathroom") {
      alert("Error: Only can be added to Bathroom");
      return;
    }
    addDevice(roomName, device);
    setDevice("");
  };

  const handleToggleDevice = (index) => {
    toggleDeviceState(roomName, index);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Smart House</h1>
      <h2 className="text-2xl font-bold mb-4">Room Name: {room.name}</h2>
      <h3 className="text-xl mb-6">Room Type: {room.type}</h3>
      <div className="mb-4 w-full max-w-md">
        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        >
          <option value="">Select Device</option>
          <option value="Air Conditioner">Air Conditioner</option>
          <option value="Light">Light</option>
          <option value="Stereo System">Stereo System</option>
          <option value="Boiler">Boiler</option>
        </select>
        <div>
          <button
            onClick={handleAddDevice}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Add device
          </button>
          <div className="flex flex-wrap justify-center mt-6">
            {room.devices.map((device, index) => (
              <div
                key={index}
                className={`w-24 h-24 m-4 flex items-center justify-center text-white font-bold rounded shadow-lg cursor-pointer ${
                  device.on ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() => handleToggleDevice(index)}
              >
                {device.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
