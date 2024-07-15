'use client'

import { logout } from '@/utils/authService';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';


function Protected() {
  const { toast } = useToast()
  const router = useRouter();


  const handleSubmit = async () => {
    try {
      const response = await logout();
      console.log("Logout response", response);
      toast({
        description: 'Logout successful.',
      });
      router.push('/');
     } catch (error) {
          console.error('Logout failed:', error);
          throw new Error('Failed to Logout');
      } 
  };

  const SignOutButton = () => {
    return (
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Out
      </button>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1> Protected </h1>
        <SignOutButton />
        
      </div>

    </main>
  );
}  
  
  export default Protected;