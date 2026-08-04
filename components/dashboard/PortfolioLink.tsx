"use client";

import { Copy, ExternalLink, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  username: string;
}

export default function PortfolioLink({ username }: Props) {
  async function copy() {
    const url = `${window.location.origin}/portfolio/${username}`;

    await navigator.clipboard.writeText(url);
    toast.success("Portfolio link copied.");
  }

  return (
    <div className='mt-6 flex items-center justify-between rounded-lg border bg-slate-50 px-4 py-3'>
      <div className='flex items-center gap-3'>
        <LinkIcon className='h-4 w-4 text-muted-foreground' />
        <code className='text-sm'>/portfolio/{username}</code>
        <Button variant='ghost' size='icon' onClick={copy}>
          <Copy className='h-4 w-4' />
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <Link href={`/portfolio/${username}`} target='_blank'>
          <Button variant='outline'>
            View Portfolio
            <ExternalLink className='ml-2 h-4 w-4' />
          </Button>
        </Link>
      </div>
    </div>
  );
}
