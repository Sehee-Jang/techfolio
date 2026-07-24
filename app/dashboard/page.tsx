import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className='container mx-auto max-w-7xl p-6'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>

      <p className='mt-2 text-muted-foreground'>Welcome, {user.email}</p>
    </main>
  );
}
