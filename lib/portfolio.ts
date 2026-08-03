import { createServerSupabaseClient } from "@/lib/supabase-server";
import { PROJECT_SELECT } from "./projects";
import { Portfolio, Project } from "@/types/project";

export async function getPublicPortfolio(username: string): Promise<Portfolio> {
  const supabase = await createServerSupabaseClient();

  // Get profile by username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      `
      id,
      username,
      bio,
      avatar_url
      `,
    )
    .eq("username", username)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Get public projects
  const { data: projects, error: projectError } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (projectError) {
    throw new Error(projectError.message);
  }

  return {
    ...profile,
    projects,
  };
}

export async function getPublicProjectById(
  username: string,
  projectId: string,
): Promise<Project> {
  const supabase = await createServerSupabaseClient();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("id", projectId)
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .single();

  if (projectError) {
    throw new Error(projectError.message);
  }

  return project;
}
