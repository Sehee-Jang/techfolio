"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function createProject(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const demo_url = formData.get("demo_url") as string;
  const image = formData.get("image") as File;
  const readme = formData.get("readme") as string;

  let image_url = null;

  if (image && image.size > 0) {
    const fileName = `${user.id}/${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, image);

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);

    image_url = data.publicUrl;
  }

  const { error } = await supabase.from("projects").insert({
    title,
    description: description || null,
    github_url: github_url || null,
    demo_url: demo_url || null,
    image_url: image_url || null,
    readme: readme || null,
    user_id: user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const github_url = formData.get("github_url") as string;
  const demo_url = formData.get("demo_url") as string;
  const image_url = formData.get("image_url") as string;
  const readme = formData.get("readme") as string;

  const { error } = await supabase
    .from("projects")
    .update({
      title,
      description: description || null,
      github_url: github_url || null,
      demo_url: demo_url || null,
      image_url: image_url || null,
      readme: readme || null,
    })
    .eq("id", id)
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteProject(id: string) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
