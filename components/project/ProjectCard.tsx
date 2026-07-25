import TechStackBadge from "./TechStackBadge";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  technologies?: string[];
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  technologies = [],
}: ProjectCardProps) {
  return (
    <article className='overflow-hidden rounded-xl border bg-white shadow-sm'>
      {imageUrl && (
        <img src={imageUrl} alt={title} className='h-48 w-full object-cover' />
      )}

      <div className='space-y-4 p-6'>
        <h2 className='text-xl font-semibold'>{title}</h2>

        <p className='text-sm text-slate-600'>{description}</p>

        <div className='flex flex-wrap gap-2'>
          {technologies.map((technology) => (
            <TechStackBadge key={technology} name={technology} />
          ))}
        </div>
      </div>
    </article>
  );
}
