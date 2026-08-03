import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
  showActions?: boolean;
  hrefBuilder?: (project: Project) => string;
}

export default function ProjectGrid({
  projects,
  showActions,
  hrefBuilder,
}: ProjectGridProps) {
  return (
    <section className='grid gap-8 sm:grid-cols-2 xl:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          showActions={showActions}
          href={
            hrefBuilder
              ? hrefBuilder(project)
              : `/dashboard/projects/${project.id}`
          }
        />
      ))}
    </section>
  );
}
