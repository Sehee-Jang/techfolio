import Link from "next/link";

import { createServerSupabaseClient } from "@/lib/supabase-server";

import LogoutButton from "@/components/auth/LogoutButton";
import Image from "next/image";

export default async function Header() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='border-b bg-background'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/logo-v2.jpg'
            alt='Techfolio'
            width={60}
            height={60}
            className='rounded-lg'
          />
        </Link>

        <nav className='flex items-center gap-6'>
          {user ? (
            <>
              <Link
                href='/dashboard'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Dashboard
              </Link>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Login
              </Link>

              <Link
                href='/register'
                className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90'
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
