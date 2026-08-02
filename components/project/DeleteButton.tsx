import { deleteProject } from "@/lib/actions/project";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <form action={deleteProjectWithId}>
      <Button size='sm' variant='destructive'>
        Delete
      </Button>
    </form>
  );
}
