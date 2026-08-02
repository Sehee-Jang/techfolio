import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Project } from "@/types/project";

export async function getProjectsByUser(userId: string): Promise<Project[]> {
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

export async function getProjectById(
  id: string,
  userId: string,
): Promise<Project> {
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
