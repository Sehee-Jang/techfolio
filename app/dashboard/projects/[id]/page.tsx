import { notFound } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase-server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({
  params,
}: Props) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) notFound();

  return (
    <main className="container mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>

      <p className="mt-4">
        {project.description}
      </p>
    </main>
  );
}