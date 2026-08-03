import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProjectsByUser } from "@/lib/projects";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FolderKanban } from "lucide-react";
import ProjectGrid from "@/components/project/ProjectGrid";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await getProjectsByUser(user.id);

  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='container mx-auto max-w-7xl space-y-8 p-6'>
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
            <div>
              <div className='mb-3 flex items-center gap-3'>
                <FolderKanban className='h-8 w-8 text-primary' />

                <h1 className='text-3xl font-bold'>My Portfolio</h1>
              </div>

              <p className='text-muted-foreground'>
                Manage your projects and showcase your development skills.
              </p>

              <p className='mt-2 text-sm text-muted-foreground'>
                Signed in as {user.email}
              </p>
            </div>

            <Link href='/dashboard/projects/new'>
              <Button size='lg'>New Project</Button>
            </Link>
          </div>
        </section>

        {projects.length > 0 ? (
          <section>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-semibold'>Your Projects</h2>

              <span className='text-sm text-muted-foreground'>
                {projects.length}{" "}
                {projects.length === 1 ? "project" : "projects"}
              </span>
            </div>

            <ProjectGrid projects={projects} />
          </section>
        ) : (
          <section className='rounded-xl border border-dashed bg-white p-12 text-center'>
            <FolderKanban className='mx-auto h-12 w-12 text-muted-foreground' />

            <h2 className='mt-4 text-xl font-semibold'>No projects yet</h2>

            <p className='mt-2 text-muted-foreground'>
              Create your first portfolio project and showcase your work.
            </p>

            <Link href='/dashboard/projects/new'>
              <Button className='mt-6'>Create Project</Button>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
