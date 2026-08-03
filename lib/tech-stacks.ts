import { createServerSupabaseClient } from "@/lib/supabase-server";
import { TechStack } from "@/types/project";

export async function getTechStacks(): Promise<TechStack[]> {
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
