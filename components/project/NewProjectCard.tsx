import Link from "next/link";
import { Plus } from "lucide-react";

export default function NewProjectCard() {
  return (
    <Link
      href='/dashboard/projects/new'
      className='group flex h-full min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed bg-white text-center transition hover:border-primary hover:shadow-md'
    >
      <div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary/10'>
        <Plus className='h-7 w-7 text-primary' />
      </div>

      <h2 className='mt-4 text-xl font-semibold'>New Project</h2>

      <p className='mt-2 text-sm text-muted-foreground'>
        Add a new project to your portfolio.
      </p>
    </Link>
  );
}
