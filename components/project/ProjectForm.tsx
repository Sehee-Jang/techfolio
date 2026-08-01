"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Project } from "@/types/project";

interface ProjectFormProps {
  action: (formData: FormData) => void | Promise<void>;
  project?: Project;
}

export default function ProjectForm({ action, project }: ProjectFormProps) {
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
          className='w-full rounded-md border p-3'
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
        <label htmlFor='readme' className='text-sm font-medium'>
          README
        </label>

        <textarea
          id='readme'
          name='readme'
          rows={10}
          defaultValue={project?.readme ?? ""}
          className='w-full rounded-md border p-3 font-mono text-sm'
          placeholder='Write your project README...'
        />
      </div>

      <Button type='submit'>
        {project ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
