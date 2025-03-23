import React from "react";

export default function TableGuests({ guests }) {
  if (!guests || guests.length === 0) return null;
  return (
    <div className="guest-list p-0 m-0 row ">
      <div className="col-7 p-0">
        <h4>Following guests on your table:</h4>
      </div>
      <div className="col-5">
        <ul>
          {guests.map((guest) => (
            <li key={guest.id}>
              <p className="mb-1">{guest.full_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
