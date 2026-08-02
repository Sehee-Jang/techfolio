import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function getProjectsByUser(userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_tech (
        tech_stacks (
          id,
          name,
          color
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProjectById(id: string, userId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      project_tech (
        tech_stacks (
          id,
          name,
          color
        )
      )
    `,
    )
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
