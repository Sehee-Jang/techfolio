import ProjectForm from "@/components/project/ProjectForm";
import { createProject } from "@/lib/actions/project";

export const metadata = {
  title: "New Project",
};

export default function NewProjectPage() {
  return (
    <main className="container mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">New Project</h1>

      <ProjectForm action={createProject} />
    </main>
  );
}