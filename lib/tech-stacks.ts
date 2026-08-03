import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function getTechStacks() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("tech_stacks")
    .select("*")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
