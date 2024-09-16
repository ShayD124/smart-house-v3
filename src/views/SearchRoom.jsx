import React, { useState } from "react";

export default function SearchRoom({ rooms }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Smart House</h1>
      <input
        className="p-2 border rounded mb-4 w-full"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        type="text"
        placeholder="Search room..."
      />

      <div>
        {searchQuery &&
          (filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => (
              <div key={index} className="p-2 border-b">
                <h2 className="text-xl">{room.name}</h2>
                <p>Type: {room.type}</p>
              </div>
            ))
          ) : (
            <p>No rooms found</p>
          ))}
      </div>
    </div>
  );
}
