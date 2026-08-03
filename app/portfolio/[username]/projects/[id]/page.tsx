import { notFound } from "next/navigation";
import { getPublicProjectById } from "@/lib/portfolio";
import ProjectDetail from "@/components/project/ProjectDetail";

interface Props {
  params: Promise<{
    id: string;
    username: string;
  }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id, username } = await params;

  const project = await getPublicProjectById(username, id).catch(() => null);

  if (!project) notFound();

  return (
    <ProjectDetail
      project={project}
      backHref={`/portfolio/${username}`}
      backLabel='← Back to Portfolio'
    />
  );
}
