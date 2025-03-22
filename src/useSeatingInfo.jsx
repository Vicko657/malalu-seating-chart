import { useState } from "react";
import { supabase } from "./utils/supabase";

export function useSeatingInfo() {
  const [seatInfo, setSeatInfo] = useState([]);
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchSeatingInfo(fullName) {
    const trimmedFullName = fullName.trim();
    if (!trimmedFullName) {
      setErrorMessage("Please enter your full name to see your table number.");
      return;
    }
    setErrorMessage("");
    setLoading(true);

    const { data: userData, error: userError } = await supabase
      .from("Wedding_Guest")
      .select("*")
      .ilike("full_name", `%${trimmedFullName}%`)
      .limit(1);

    if (userError) {
      console.error("Error fetching data:", userError);
      setErrorMessage("An error occurred while searching. Please try again.");
      setLoading(false);
      return;
    }

    if (!userData || userData.length === 0) {
      setErrorMessage(
        "Sorry, there is no seating info found for this name. Please check the full name you rsvp'd with."
      );
      setSeatInfo([]);
      setLoading(false);
      return;
    }
    const user = userData[0];
    const tableNo = user.table_no;

    const { data: guestsData, error: guestsError } = await supabase
      .from("Wedding_Guest")
      .select("*")
      .eq("table_no", tableNo);

    setLoading(false);

    if (guestsError) {
      console.error("Error fetching guests:", guestsError);
      setErrorMessage("An error occurred while fetching table details.");
      return;
    }

    const finalSeatInfo = [
      user,
      ...guestsData.filter((guest) => guest.id !== user.id),
    ];
    setSeatInfo(finalSeatInfo);
  }
  return { seatInfo, loading, errorMessage, fetchSeatingInfo };
}
