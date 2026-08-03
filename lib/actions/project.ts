"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  saveProjectTechStacks,
  uploadProjectImage,
} from "@/lib/project-service";
import { getCurrentUser } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function createProject(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const demo_url = formData.get("demo_url") as string;
  const image = formData.get("image") as File;
  const readme = formData.get("readme") as string;
  const is_public = formData.get("is_public") === "on";
  const image_url = await uploadProjectImage(user.id, image);

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      title,
      description: description || null,
      github_url: github_url || null,
      demo_url: demo_url || null,
      image_url,
      readme: readme || null,
      user_id: user.id,
      is_public,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const techIds = formData.getAll("tech_ids") as string[];

  await saveProjectTechStacks(project.id, techIds);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const demo_url = formData.get("demo_url") as string;
  const readme = formData.get("readme") as string;
  const is_public = formData.get("is_public") === "on";

  /**
   * Get existing image_url
   */
  const { data: existingProject, error: fetchError } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  let image_url = existingProject.image_url;

  /**
   * Upload new image
   */
  const image = formData.get("image") as File;

  if (image && image.size > 0) {
    image_url = await uploadProjectImage(user.id, image);
  }

  /**
   * Update the project
   */
  const { error } = await supabase
    .from("projects")
    .update({
      title,
      description: description || null,
      github_url: github_url || null,
      demo_url: demo_url || null,
      image_url,
      readme: readme || null,
      is_public,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  const techIds = formData.getAll("tech_ids") as string[];

  await saveProjectTechStacks(id, techIds);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteProject(id: string) {
  const supabase = await createServerSupabaseClient();

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
