import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Project, TechStack } from "@/types/project";

interface ProjectFormProps {
  action: (formData: FormData) => void | Promise<void>;
  project?: Project;
  techStacks: TechStack[];
}

export default async function ProjectForm({
  action,
  project,
  techStacks,
}: ProjectFormProps) {
  const selectedTechIds =
    project?.project_tech?.map((item) => item.tech_stacks.id) ?? [];

  return (
    <form action={action} className='space-y-6'>
      <div className='space-y-2'>
        <label htmlFor='title' className='text-sm font-medium'>
          Title
        </label>

        <Input
          id='title'
          name='title'
          required
          defaultValue={project?.title ?? ""}
          placeholder='My Portfolio Project'
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='description' className='text-sm font-medium'>
          Description
        </label>

        <textarea
          id='description'
          name='description'
          rows={4}
          defaultValue={project?.description ?? ""}
          className='w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary'
          placeholder='Brief description of your project...'
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='github_url' className='text-sm font-medium'>
          GitHub URL
        </label>

        <Input
          id='github_url'
          name='github_url'
          type='url'
          defaultValue={project?.github_url ?? ""}
          placeholder='https://github.com/...'
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='demo_url' className='text-sm font-medium'>
          Demo URL
        </label>

        <Input
          id='demo_url'
          name='demo_url'
          type='url'
          defaultValue={project?.demo_url ?? ""}
          placeholder='https://...'
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='image' className='text-sm font-medium'>
          Project Image
        </label>

        <Input id='image' name='image' type='file' accept='image/*' />
      </div>

      <div className='space-y-2'>
        <label className='text-sm font-medium'>Tech Stacks</label>

        <div className='grid grid-cols-2 gap-2'>
          {techStacks.map((tech) => (
            <label key={tech.id} className='flex items-center gap-2'>
              <input
                type='checkbox'
                name='tech_ids'
                value={tech.id}
                defaultChecked={selectedTechIds.includes(tech.id)}
              />
              {tech.name}
            </label>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <label htmlFor='readme' className='text-sm font-medium'>
          README
        </label>

        <textarea
          id='readme'
          name='readme'
          rows={10}
          defaultValue={project?.readme ?? ""}
          className='min-h-[250px] w-full rounded-md border p-4 font-mono text-sm'
          placeholder='Write your project README...'
        />
      </div>

      <div className='space-y-2'>
        <label className='flex items-center gap-2 text-sm font-medium'>
          <input
            type='checkbox'
            name='is_public'
            defaultChecked={project?.is_public ?? false}
          />
          Show on public portfolio
        </label>

        <p className='text-sm text-muted-foreground'>
          Public projects will appear on your portfolio page.
        </p>
      </div>

      <Button type='submit'>
        {project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
