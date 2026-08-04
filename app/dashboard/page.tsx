import { getProfile } from "@/lib/profile";
import { getProjectsByUser } from "@/lib/projects";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FolderKanban } from "lucide-react";
import ProjectGrid from "@/components/project/ProjectGrid";
import PortfolioLink from "@/components/dashboard/PortfolioLink";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await getProjectsByUser(user.id);
  const profile = await getProfile(user.id);

  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='container mx-auto max-w-7xl space-y-8 p-6'>
        <section className='rounded-xl bg-white p-8 shadow-sm'>
          <div className='items-start justify-between gap-6'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <FolderKanban className='h-8 w-8 text-primary' />
                <h1 className='text-3xl font-bold'>My Portfolio</h1>
              </div>

              <p className='text-muted-foreground'>
                Manage your projects and showcase your development skills.
              </p>

              <PortfolioLink username={profile.username} />
            </div>
          </div>
        </section>

        <section>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>Your Projects</h2>

            <span className='text-sm text-muted-foreground'>
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          <ProjectGrid projects={projects} showNewCard />
        </section>
      </div>
    </main>
  );
}
