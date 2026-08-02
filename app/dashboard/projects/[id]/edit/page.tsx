import { notFound, redirect } from "next/navigation";
import ProjectForm from "@/components/project/ProjectForm";
import { updateProject } from "@/lib/actions/project";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getTechStacks } from "@/lib/tech-stacks";
import { getProjectById } from "@/lib/projects";
import { getCurrentUser } from "@/lib/auth";

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

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const project = await getProjectById(id, user.id).catch(() => null);

  if (!project) {
    notFound();
  }

  const techStacks = await getTechStacks();

  return (
    <main className='container mx-auto max-w-3xl p-6'>
      <h1 className='mb-6 text-3xl font-bold'>Edit Project</h1>

      <ProjectForm
        project={project}
        action={updateProject.bind(null, id)}
        techStacks={techStacks}
      />
    </main>
  );
}
