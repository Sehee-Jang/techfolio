import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className='group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md'>
      <Link href={`/dashboard/projects/${project.id}`}>
        <Image
          src={project.image_url ?? "/placeholder.png"}
          alt={project.title}
          width={600}
          height={300}
          className='h-48 w-full object-cover transition group-hover:scale-105'
        />

        <div className='space-y-4 p-6'>
          <h2 className='text-xl font-semibold'>{project.title}</h2>

          <p className='line-clamp-3 text-sm text-slate-600'>
            {project.description ?? "No description available."}
          </p>
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
