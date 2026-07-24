"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase-browser";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/login");
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-center text-2xl'>Create Account</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            type='text'
            placeholder='Name'
            autoComplete='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type='email'
            placeholder='Email'
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type='password'
            placeholder='Password'
            autoComplete='new-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-sm text-red-500'>{error}</p>}

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className='text-center text-sm text-muted-foreground'>
            Already have an account?{" "}
            <Link href='/login' className='font-medium underline'>
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
