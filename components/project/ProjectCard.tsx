import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import TechStackBadge from "./TechStackBadge";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md'>
      <Link href={`/dashboard/projects/${project.id}`}>
        <Image
          src={project.image_url ?? "/placeholder.png"}
          alt={project.title}
          width={600}
          height={300}
          className='h-48 w-full object-cover transition group-hover:scale-105'
        />

        <div className='flex-1 space-y-4 p-6'>
          <h2 className='text-xl font-semibold'>{project.title}</h2>

          <p className='line-clamp-3 text-sm text-slate-600'>
            {project.description ?? "No description available."}
          </p>

          {project.project_tech && project.project_tech.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {project.project_tech.map((item) => (
                <TechStackBadge
                  key={item.tech_stacks.id}
                  name={item.tech_stacks.name}
                  color={item.tech_stacks.color}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className='flex gap-2 border-t px-6 py-4'>
        <Link href={`/dashboard/projects/${project.id}/edit`}>
          <Button size='sm' variant='outline'>
            Edit
          </Button>
        </Link>

        <DeleteButton id={project.id} />
      </div>
    </article>
  );
}
