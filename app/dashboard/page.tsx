import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import ProjectGrid from "@/components/project/ProjectGrid";

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

  return (
    <main className='container mx-auto max-w-7xl p-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      <p className='mt-2 text-muted-foreground'>Welcome, {user.email}</p>

      <section className='mt-8'>
        <ProjectGrid projects={projects} />
      </section>
    </main>
  );
}
