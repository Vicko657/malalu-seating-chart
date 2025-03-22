import React, { useState, useEffect } from "react";
import "./MainBody.css";
import { useForm } from "react-hook-form";
import SeatingInfo from "./SeatingInfo";
import { useSeatingInfo } from "./useSeatingInfo";

export default function MainBody() {
  const [fullName, setFullName] = useState("");
  const { seatInfo, loading, errorMessage, fetchSeatingInfo } =
    useSeatingInfo();
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  async function onSubmit(data) {
    fetchSeatingInfo(fullName);
    setFullName("");
  }

  function handleFullName(event) {
    setFullName(event.target.value);
  }

  return (
    <div className="seating p-lg-2 p-0">
      <h1>Please find your seat</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="search-form d-flex mb-1"
      >
        <input
          type="text"
          value={fullName}
          onChange={handleFullName}
          placeholder="Enter your full name..."
          required
          className="search-form-input"
        />
        <button type="submit" className="search-form-button d-flex">
          Search
        </button>
      </form>
      {loading && (
        <small className="mt-2 text-danger">
          Searching for your table number...
        </small>
      )}
      {errorMessage && (
        <small className="text-danger mt-2">{errorMessage}</small>
      )}
      {seatInfo.length > 0 && (
        <SeatingInfo item={seatInfo[0]} guests={seatInfo.slice(1)} />
      )}
    </div>
  );
}
