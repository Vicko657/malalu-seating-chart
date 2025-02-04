import React from "react";
import "./SeatingInfo.css";

export default function SeatingInfo(props) {
  return (
    <div className="table-info row">
      <div className="col-8">
        <li key={props.item.id} className="">
          <p className="mini-title">FULL NAME:</p>
          <h3>{props.item.full_name}</h3>
        </li>
      </div>
      <div className="col-4">
        <li key={props.item.id} className="">
          <p className="mini-title">TABLE NUMBER:</p>
          <h4>{props.item.table_no}</h4>
        </li>
      </div>
    </div>
  );
}
