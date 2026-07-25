import ProjectCard from "./ProjectCard";
import { Project } from "@/app/types/project";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({
  projects
}: ProjectGridProps) {
  return (
    <section className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </section>
  );
}
