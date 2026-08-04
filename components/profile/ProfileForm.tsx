"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfile } from "@/lib/actions/profile";
import { Profile } from "@/types/profile";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Props {
  profile: Profile;
}

export default function ProfileForm({ profile }: Props) {
  const router = useRouter();

  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio ?? "");

  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await updateProfile(formData);

    if (result.success) {
      setOpen(true);
    }
  }

  return (
    <>
      <form
        action={handleSubmit}
        className='space-y-6 rounded-xl bg-white p-8 shadow'
      >
        <div>
          <label className='mb-2 block text-sm font-medium'>Username</label>

          <Input
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-medium'>Bio</label>

          <textarea
            name='bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className='w-full rounded-md border p-3'
          />
        </div>

        <Button type='submit'>Save Profile</Button>
      </form>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Profile Updated</AlertDialogTitle>

            <AlertDialogDescription>
              Your profile has been updated successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/dashboard")}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
