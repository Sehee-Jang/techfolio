import ProjectGrid from "@/components/project/ProjectGrid";

export const metadata = {
  title: "Home",
};


export default function Home() {
  return (
    <main className='mx-auto max-w-7xl space-y-12 p-6'>
      <section>
        <h1 className='text-4xl font-bold'>Tech Stack Portfolio</h1>

        <p className='mt-4 text-slate-600'>
          Showcase your development projects.
        </p>

      </section>
    </main>
  );
}
