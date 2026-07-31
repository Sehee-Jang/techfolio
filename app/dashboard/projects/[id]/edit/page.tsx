import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/project/ProjectForm";
import { updateProject } from "@/lib/actions/project";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();

  const { data: project } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .single();

  return {
    title: project ? `Edit ${project.title}` : "Edit Project",
  };
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Project</h1>

      <ProjectForm
        project={project}
        action={updateProject.bind(null, id)}
      />
    </main>
  );
}