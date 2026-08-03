import { notFound } from "next/navigation";
import { getPublicPortfolio } from "@/lib/portfolio";
import ProjectGrid from "@/components/project/ProjectGrid";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;

  try {
    const portfolio = await getPublicPortfolio(username);

    return {
      title: `${portfolio.username}'s Portfolio`,
    };
  } catch {
    return {
      title: "Portfolio",
    };
  }
}

export default async function PublicPortfolioPage({ params }: Props) {
  const { username } = await params;

  const portfolio = await getPublicPortfolio(username).catch(() => null);
  console.log("portfolio", portfolio);
  if (!portfolio) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-slate-50'>
      <div className='container mx-auto max-w-7xl space-y-10 p-6'>
        <section className='rounded-xl bg-white p-8 text-center shadow-sm'>
          <h1 className='text-4xl font-bold'>
            {portfolio.username}'s Portfolio
          </h1>

          {portfolio.bio && (
            <p className='mt-4 text-muted-foreground'>{portfolio.bio}</p>
          )}
        </section>

        <section>
          <h2 className='mb-6 text-2xl font-bold'>Projects</h2>

          {portfolio.projects.length > 0 ? (
            <ProjectGrid projects={portfolio.projects} showActions={false} />
          ) : (
            <div className='rounded-xl border border-dashed bg-white p-12 text-center'>
              <h3 className='text-lg font-semibold'>No projects available</h3>

              <p className='mt-2 text-muted-foreground'>
                This user has not published any projects yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
