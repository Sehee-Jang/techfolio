import { deleteProject } from "@/lib/actions/project";
import { Button } from "@/components/ui/button";

interface DeleteButtonProps {
  id: string;
}

export default function DeleteButton({
  id,
}: DeleteButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await deleteProject(id);
      }}
    >
      <Button
        type="submit"
        variant="destructive"
      >
        Delete
      </Button>
    </form>
  );
}