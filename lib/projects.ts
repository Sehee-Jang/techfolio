import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function getProjectsByUser(userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
