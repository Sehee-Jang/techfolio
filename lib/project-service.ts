import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function uploadProjectImage(userId: string, image: File) {
  if (!image || image.size === 0) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  const extension = image.name.split(".").pop();

  const fileName = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("project-images")
    .upload(fileName, image);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("project-images")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function saveProjectTechStacks(
  projectId: string,
  techIds: string[],
) {
  const supabase = await createServerSupabaseClient();

  await supabase.from("project_tech").delete().eq("project_id", projectId);

  if (techIds.length === 0) return;

  const rows = techIds.map((techId) => ({
    project_id: projectId,
    tech_id: techId,
  }));

  const { error } = await supabase.from("project_tech").insert(rows);

  if (error) {
    throw new Error(error.message);
  }
}
