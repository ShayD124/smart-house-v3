import React from "react";
import { Link } from "react-router-dom";

export default function Rooms({ rooms, removeRoom }) {
  return (
    <div className="flex flex-wrap">
      {rooms.map((room) => (
        <div
          key={room.id || room.name} // Use a unique identifier for the key
          className="relative m-4 p-4 border rounded w-full"
          style={{ backgroundColor: room.color }}
        >
          <Link to={`/room/${room.name}`} className="block h-full">
            <h3 className="text-lg font-bold">{room.name}</h3>
            <p>Type: {room.type}</p>
          </Link>
          {/* Remove Room Button */}
          <button
            onClick={() => removeRoom(room.id)}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-0.5"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
