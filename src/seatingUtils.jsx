import { supabase } from "./utils/supabase";

export async function getSeatingInfo(fullName) {
  const { data, error } = await supabase
    .from("Wedding_Guest")
    .select("*")
    .ilike("full_name", `%${fullName.trim()}%`);

  if (error) throw new Error(error.message);

  return data;
}
