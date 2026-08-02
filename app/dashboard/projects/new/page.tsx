import ProjectForm from "@/components/project/ProjectForm";
import { createProject } from "@/lib/actions/project";
import { getTechStacks } from "@/lib/tech-stacks";

export const metadata = {
  title: "New Project",
};

export default async function NewProjectPage() {
  const techStacks = await getTechStacks();

  return (
    <main className='container mx-auto max-w-3xl p-6'>
      <h1 className='mb-6 text-3xl font-bold'>New Project</h1>

      <ProjectForm action={createProject} techStacks={techStacks} />
    </main>
  );
}
