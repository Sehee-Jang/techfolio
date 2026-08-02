import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProjectGrid from "@/components/project/ProjectGrid";
import { getProjectsByUser } from "@/lib/projects";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

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
        <div className='flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Dashboard</h1>

            <p className='text-muted-foreground'>Welcome, {user.email}</p>
          </div>

          <Link href='/dashboard/projects/new'>
            <Button>New Project</Button>
          </Link>
        </div>

        {projects && projects.length > 0 ? (
          <ProjectGrid projects={projects} />
        ) : (
          <div className='rounded-lg border border-dashed p-12 text-center'>
            <h2 className='text-xl font-semibold'>No projects yet</h2>
            <p className='mt-2 text-muted-foreground'>
              Create your first portfolio project.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
