import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) notFound();

  return (
    <main className='container mx-auto max-w-4xl space-y-8 p-6'>
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
        <h1 className='text-3xl font-bold'>{project.title}</h1>

        <p className='mt-4 text-muted-foreground'>{project.description}</p>
      </div>

      <div className='flex gap-4'>
        {project.github_url && (
          <Link href={project.github_url} target='_blank' className='underline'>
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
    </main>
  );
}
