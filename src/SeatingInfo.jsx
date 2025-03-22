import React from "react";
import "./SeatingInfo.css";
import TableGuests from "./TableGuests";

export default function SeatingInfo({ item, guests }) {
  return (
    <>
      <div className="table-info  mt-2 mb-sm-2">
        <div className="row guest">
          <div className="col-7">
            <li key={item.id} className="">
              <p className="mini-title">Name:</p>
              <h3>{item.full_name}</h3>
            </li>
          </div>

          <div className="col-5">
            <li key={item.id} className="">
              <p className="mini-title">Table Number:</p>
              <h3>{item.table_no}</h3>
            </li>
          </div>
        </div>
        <hr></hr>
        <TableGuests guests={guests} />
      </div>
    </>
  );
}
