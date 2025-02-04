import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./MainBody.css";
import SeatingInfo from "./SeatingInfo";

const supabaseUrl = "https://asexjmxxlaivvgbcsqvu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZXhqbXh4bGFpdnZnYmNzcXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MzU1OTAsImV4cCI6MjA1MzUxMTU5MH0.7HOhI7b5V6C1Bbva7NIk82Z7KIyGgMXfsAXCApfdTls";
const supabase = createClient(supabaseUrl, supabaseKey);

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
      <form onSubmit={handleSearch} className="search-form d-flex columns">
        <input
          type="text"
          value={fullName}
          onChange={handleFullName}
          placeholder="Enter your full name..."
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
