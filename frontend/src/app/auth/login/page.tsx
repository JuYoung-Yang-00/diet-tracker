// login/page.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { login } from '@/utils/authService';
import Image from 'next/image';

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
      const response = await login(username.toLowerCase(), password);
      console.log("Login response", response);
      if (response && response.status === 200) {
        toast({
          description: 'Login successful.',
        });
        router.push('/');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Uh oh!",
        description: 'Please check your username and password.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 font-mono">
        <div className='h-[500px] w-full max-w-[400px] flex flex-col items-center justify-center mx-auto border border-lime-300 rounded-lg'>
            <form onSubmit={handleSubmit} className=" lg:w-2/3 p-8 space-y-8">
              <Image src="/diettracker.png" alt="logo" width={100} height={100}  className="mx-auto flex" />
              <h2 className="text-center text-3xl text-lime-500">Login</h2>
                <div className=''>
                <input
                    type="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full py-1.5 px-2 border rounded-lg "
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
                    className="w-full py-1.5 px-2 border rounded-lg "
                    placeholder='Password'
                    required
                />
                </div>
                <button type="submit" disabled={loading} className="w-full p-2 rounded-lg bg-lime-500 text-white hover:bg-lime-600 transform duration-200 ease-in-out">
                {loading ? 'Logging in...' : 'Log in'}
                </button>
                <p className="text-center">
                <Link href="/auth/signup">
                    <span className=" hover:text-lime-600 text-lime-500 transform duration-200 ease-in-out">Signup</span>
                </Link>
                </p>
            </form>
        </div>
    </div>
  );
};

export default Login;
