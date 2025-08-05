import React from "react";

export default function TableGuests({ guests }) {
  if (!guests || guests.length === 0) return null;
  return (
    <div>
      <div className="guest-list p-0 m-0 row ">
        <div className="col-7 p-0">
          <h4>Following guests on your table:</h4>
        </div>
      </div>
      <div className="row">
        {guests.map((guest) => (
          <div key={guest.id} className="col-4">
            <p className="mb-1">{guest.full_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
