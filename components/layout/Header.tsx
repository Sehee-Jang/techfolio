import Link from "next/link";

import { createServerSupabaseClient } from "@/lib/supabase-server";

import LogoutButton from "@/components/auth/LogoutButton";

export default async function Header() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='border-b'>
      <div className='mx-auto flex max-w-7xl items-center justify-between p-6'>
        <Link href='/' className='text-xl font-bold'>
          Techfolio
        </Link>

        <nav className='flex items-center gap-4'>
          {user ? (
            <>
              <Link href='/dashboard' className='text-sm hover:underline'>
                Dashboard
              </Link>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link href='/login' className='text-sm hover:underline'>
                Login
              </Link>

              <Link href='/register' className='text-sm hover:underline'>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
