import React, { useState } from "react";
import { supabase } from "./utils/supabase";
import "./MainBody.css";
import SeatingInfo from "./SeatingInfo";

export default function MainBody() {
  const [fullName, setFullName] = useState("");
  const [seatInfo, setSeatInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSearch(event) {
    event.preventDefault();
    await handleSeatingInfo();
  }

  function handleFullName(event) {
    setFullName(event.target.value);
  }

  async function handleSeatingInfo() {
    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) {
      setErrorMessage(
        "* Please enter your full name to see your table number."
      );
      return;
    }
    setErrorMessage("");
    setLoading(true);

    const { data, error } = await supabase
      .from("Wedding_Guest")
      .select("*")
      .ilike("full_name", `%${trimmedFullName}%`);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setSeatInfo(data);
      setFullName("");
    }
    setLoading(false);
  }

  return (
    <div className="Seating p-lg-2 p-0">
      <h1>Please find your seat</h1>
      <form onSubmit={handleSearch} className="search-form d-flex ">
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
      {loading && <p className="mt-2">Searching for your table number...</p>}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {seatInfo.map((item) => (
        <SeatingInfo item={item} />
      ))}
    </div>
  );
}
