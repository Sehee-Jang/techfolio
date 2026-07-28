import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProjectGrid from "@/components/project/ProjectGrid";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata = {
  title: "Dashboard",
};

const projects = [
  {
    id: "1",
    title: "Techfolio",
    description: "Developer portfolio management application",
    readme: "Project README content",
    github_url: "https://github.com/example/techfolio",
    demo_url: "https://example.com",
    image_url: "/placeholder.png",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "temp-user",
  },
  {
    id: "2",
    title: "Wedding Invitation",
    description: "A mobile wedding invitation project.",
    readme: "Project README content",
    github_url: "https://github.com/example/techfolio",
    demo_url: "https://example.com",
    image_url: "/placeholder.png",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: "temp-user",
  },
];

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
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="container mx-auto max-w-7xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <p className="text-muted-foreground">
            Welcome, {user.email}
          </p>
        </div>

        <Link href="/dashboard/projects/new">
          <Button>
              New Project
          </Button>
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <ProjectGrid projects={projects} />
        ) : (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">No projects yet</h2>
          <p className="mt-2 text-muted-foreground">
            Create your first portfolio project.
          </p>
        </div>
      )}

      <section className='mt-8'>
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}