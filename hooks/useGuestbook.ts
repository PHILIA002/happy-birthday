"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type GuestbookMessage = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function useGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);

  useEffect(() => {
    load();

    const channel = supabase
      .channel("guestbook-chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "guestbook",
        },
        (payload) => {
          setMessages((prev) => [
            payload.new as GuestbookMessage,
            ...prev,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function load() {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setMessages(data || []);
  }

  return messages;
}