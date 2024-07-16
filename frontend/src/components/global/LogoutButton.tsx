'use client'
import { logout } from '@/utils/authService';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';

const SignOutButton = () => {
    const { toast } = useToast()
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await logout();
            console.log("Logout response", response);
            toast({
            description: 'Logout successful.',
            });
            router.push('/auth/login');
            } catch (error) {
                console.error('Logout failed:', error);
                throw new Error('Failed to Logout');
            } 
        };
    return (
        <button onClick={handleSubmit} className="bg-lime-500 hover:bg-lime-600 text-white py-1.5 px-2 rounded text-sm transform duration-300 ease-in-out font-mono">
        Sign Out
        </button>
    );
}

export default SignOutButton;