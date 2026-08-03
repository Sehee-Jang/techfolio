import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Project } from "@/types/project";

const PROJECT_SELECT = `
  *,
  project_tech (
    tech_stacks (
      id,
      name,
      color
    )
  )
`;

export async function getProjectsByUser(userId: string): Promise<Project[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
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
    .select(PROJECT_SELECT)
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProjectTitleById(id: string): Promise<string | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.title ?? null;
}
