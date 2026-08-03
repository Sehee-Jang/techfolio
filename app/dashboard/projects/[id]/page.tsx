import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/lib/projects";
import ProjectDetail from "@/components/project/ProjectDetail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const project = await getProjectById(id, user.id).catch(() => null);

  if (!project) notFound();

  return (
    <ProjectDetail
      project={project}
      backHref='/dashboard'
      backLabel='← Back to Dashboard'
      showActions
    />
  );
}
