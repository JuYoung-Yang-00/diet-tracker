// login/page.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { login } from '@/utils/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await login(username, password);
      console.log("Login response", response);
      toast({
        description: 'Login successful.',
      });
      router.push('/service');
     } catch (error) {
          console.error('Login failed:', error);
          throw new Error('Failed to login');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4">
        <div className='h-[600px] w-full max-w-[1200px] mx-auto border rounded '>
            <div className='w-full items-center justify-center flex'>
                <form onSubmit={handleSubmit} className="w-full max-w-xs lg:w-2/3 p-8 space-y-8">
                  <h2 className="text-center font-extralight text-3xl">Login</h2>
                    <div className=''>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full py-1.5 px-2 border rounded font-extralight "
                        placeholder='Username'
                        required
                    />
                    </div>
                    <div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-1.5 px-2 border rounded font-extralight "
                        placeholder='Password'
                        required
                    />
                    </div>
                    <button type="submit" disabled={loading} className="w-full p-2 rounded border font-extralight hover:font-light">
                    {loading ? 'Logging in...' : 'Log in'}
                    </button>
                    <p className="text-center">
                    <Link href="/auth/signup">
                        <span className="font-extralight hover:font-light">Sign up</span>
                    </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
