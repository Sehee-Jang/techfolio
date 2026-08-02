import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProjectGrid from "@/components/project/ProjectGrid";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

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
