import ProjectCard from "./ProjectCard";
import { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className='grid gap-8 sm:grid-cols-2 xl:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
