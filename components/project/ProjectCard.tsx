import { Project } from "@/types/project";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='overflow-hidden rounded-xl border bg-white shadow-sm'>
      <Image
        src={project.image_url ?? "/placeholder.png"}
        alt={project.title}
        width={600}
        height={300}
        className='h-48 w-full object-cover'
      />

      <div className='space-y-4 p-6'>
        <h2 className='text-xl font-semibold'>{project.title}</h2>

        <p className='text-sm text-slate-600'>
          {project.description ?? "No description available."}
        </p>
      </div>
    </article>
  );
}
