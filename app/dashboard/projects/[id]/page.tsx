import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProjectById } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import TechStackBadge from "@/components/project/TechStackBadge";
import DeleteButton from "@/components/project/DeleteButton";

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
    <main className='min-h-screen bg-slate-50 py-10'>
      <div className='container mx-auto max-w-4xl space-y-8 rounded-xl bg-white p-8 shadow-sm'>
        <div className='flex items-center justify-between'>
          <Link
            href='/dashboard'
            className='text-sm text-muted-foreground hover:text-primary'
          >
            ← Back to Dashboard
          </Link>

          <div className='flex gap-2'>
            <Link href={`/dashboard/projects/${project.id}/edit`}>
              <Button variant='outline'>Edit</Button>
            </Link>

            <DeleteButton id={project.id} />
          </div>
        </div>

        {project.image_url && (
          <Image
            src={project.image_url}
            alt={project.title}
            width={900}
            height={450}
            className='rounded-lg object-cover'
          />
        )}

        <div>
          <h1 className='text-4xl font-bold'>{project.title}</h1>

          {project.description && (
            <p className='mt-4 text-lg text-muted-foreground'>
              {project.description}
            </p>
          )}
        </div>

        {project.project_tech && project.project_tech.length > 0 && (
          <section>
            <h2 className='mb-3 text-xl font-semibold'>Tech Stack</h2>

            <div className='flex flex-wrap gap-2'>
              {project.project_tech.map((item) => (
                <TechStackBadge
                  key={item.tech_stacks.id}
                  name={item.tech_stacks.name}
                  color={item.tech_stacks.color}
                />
              ))}
            </div>
          </section>
        )}

        <div className='flex gap-4'>
          {project.github_url && (
            <Link
              href={project.github_url}
              target='_blank'
              className='underline'
            >
              GitHub
            </Link>
          )}

          {project.demo_url && (
            <Link href={project.demo_url} target='_blank' className='underline'>
              Demo
            </Link>
          )}
        </div>

        {project.readme && (
          <section>
            <h2 className='mb-3 text-xl font-semibold'>README</h2>

            <pre className='whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm'>
              {project.readme}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
