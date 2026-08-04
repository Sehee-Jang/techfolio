import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function getProfile(userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
