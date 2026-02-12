import { supabase } from "./supabase";

export async function addGuestbook(nickname: string, message: string) {
  const { error } = await supabase
    .from("guestbook")
    .insert([{ nickname, message }]);

  if (error) throw error;
}

export async function getGuestbook() {
  const { data, error } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}
