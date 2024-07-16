'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast"
import { signup } from '@/utils/authService';

const validatePassword = (password: string): boolean => {
  const minLength = /.{8,}/;
  const uppercase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
  return minLength.test(password) && uppercase.test(password) && lowercase.test(password) && number.test(password) && specialChar.test(password);
};

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'password') {
      setIsPasswordValid(validatePassword(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPasswordValid) {
      router.push('/auth/signup');
      toast({
        description: 'Please ensure the password meets all requirements.',
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      await signup(formData.username, formData.password); 
      toast({
        description: 'Welcome aboard! Please login.',
      });
    } catch (error: any) {
      toast({
        description: 'Signup failed - '+ error.message,
        variant: "destructive"
      });
      router.push('/auth/signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 font-mono">
        <div className='h-[500px] w-full max-w-[400px] flex items-center justify-center mx-auto border rounded-lg'>
          <form onSubmit={handleSubmit} className="lg:w-2/3 p-8 space-y-8">
                <h2 className="text-center text-3xl text-lime-500">Signup</h2>
                <div className="space-y-6">
                {(['username', 'password'] as const).map(field => (
                    <div key={field}>
                    <input
                        id={field}
                        type={field === 'password' ? 'password' : 'text'}
                        autoComplete={field}
                        required
                        className="w-full py-1.5 px-2 border rounded-lg "
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={field.split(/(?=[A-Z])/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')}
                    />
                    </div>
                ))}
                {!isPasswordValid && (
                    <p className="text-red-500 text-xs font-light">
                    Password must be at least 8 characters long and contain uppercase, lowercase, digit, and symbol.
                    </p>
                )}
                </div>
                <button type="submit" disabled={loading} className="w-full p-2 rounded-lg bg-lime-500 text-white hover:bg-lime-600 transform duration-200 ease-in-out">
                {loading ? 'Signing up...' : 'Sign up'}
                </button>
                <p className="text-center">
                <Link href="/auth/login">
                    <span className="hover:text-lime-600 text-lime-500 transform duration-200 ease-in-out">Login</span>
                </Link>
                </p>
            </form>
        </div>
    </div>
  );
};

export default Signup;
