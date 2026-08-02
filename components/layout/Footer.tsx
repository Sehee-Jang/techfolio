export default function Footer() {
  return (
    <footer className='border-t bg-muted/30'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-center px-6 text-sm text-muted-foreground'>
        © {new Date().getFullYear()} Techfolio. Built with Next.js & Supabase.
      </div>
    </footer>
  );
}
