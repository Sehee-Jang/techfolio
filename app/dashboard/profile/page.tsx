import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const profile = await getProfile(user.id);

  return (
    <main className='min-h-screen bg-slate-50 py-10'>
      <div className='container mx-auto max-w-3xl space-y-8'>
        <section className='rounded-xl bg-white p-8 shadow'>
          <div className='flex items-start justify-between'>
            <div>
              <h1 className='text-3xl font-bold'>Profile Settings</h1>

              <p className='mt-2 text-muted-foreground'>
                Customize how your public portfolio appears.
              </p>
            </div>
          </div>
        </section>

        <ProfileForm profile={profile} />
      </div>
    </main>
  );
}
