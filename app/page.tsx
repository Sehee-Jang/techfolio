import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderKanban, Code2, Rocket } from "lucide-react";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className='bg-slate-50'>
      <section className='container mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center'>
        <h1 className='text-5xl font-extrabold tracking-tight'>
          Build Your
          <span className='block text-primary'>Tech Portfolio</span>
        </h1>

        <p className='mt-6 max-w-2xl text-lg text-muted-foreground'>
          Organize your development projects, showcase the technologies you use,
          and create a professional portfolio with GitHub, live demos, images,
          and detailed project documentation.
        </p>

        <div className='mt-10 flex flex-wrap justify-center gap-4'>
          <Link href='/dashboard'>
            <Button size='lg'>Go to Dashboard</Button>
          </Link>

          <Link href='/register'>
            <Button variant='outline' size='lg'>
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className='container mx-auto max-w-7xl px-6 pb-20'>
        <div className='grid gap-6 md:grid-cols-3'>
          <div className='rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg'>
            <FolderKanban className='mb-4 h-10 w-10 text-primary' />

            <h2 className='text-lg font-semibold'>Project Management</h2>

            <p className='mt-3 text-sm text-muted-foreground'>
              Create, edit, and organize your software projects in one place.
            </p>
          </div>

          <div className='rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg'>
            <Code2 className='mb-4 h-10 w-10 text-primary' />

            <h2 className='text-lg font-semibold'>Tech Stack Tracking</h2>

            <p className='mt-3 text-sm text-muted-foreground'>
              Highlight the technologies used in each project with reusable tech
              stack badges.
            </p>
          </div>
          <div className='rounded-xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg'>
            <Rocket className='mb-4 h-10 w-10 text-primary' />

            <h2 className='text-lg font-semibold'>Portfolio Ready</h2>

            <p className='mt-3 text-sm text-muted-foreground'>
              Share GitHub repositories, live demos, images, and README
              documentation in a clean portfolio layout.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
