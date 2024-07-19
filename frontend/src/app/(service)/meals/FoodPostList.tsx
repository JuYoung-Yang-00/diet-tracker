'use client'

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { useToast } from "@/components/ui/use-toast"

const FoodPostList = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await api.get('http://3.86.178.234:8000/api/user');
                setUser(result.data.id); 
                console.log("Result:", result);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } 
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user) {
            const fetchMeals = async () => {
                try {
                    const result = await api.get(`http://3.86.178.234:8000/api/meals/user/${user}`);
                    setData(result.data);
                } catch (error) {
                    console.error('Error fetching meals data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchMeals();
        }
    }, [user]); 


    const handleDelete = async (id: number) => {
        try {
            await api.delete(`http://3.86.178.234:8000/api/meals/${id}`);
            setData(data.filter((meal: { id: number }) => meal.id !== id));
            toast({
                description: 'Meal deleted successfully',
              });
        } catch (error) {
            console.error('Error deleting meal:', error);
            toast({
                title: "Uh oh!",
                description: 'Failed to delete post',
                variant: "destructive",
              });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full p-4 max-w-[1480px] max-h-[600px] lg:max-h-[1000px] mx-auto flex flex-col gap-4 border border-lime-300 rounded-lg">
            <h1 className="font-bold pb-4 text-xl">Your Past Meals</h1>
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-lime-500">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b border-lime-500">
                            <th className="py-2 px-4 text-left text-sm font-bold">Title</th>
                            <th className="py-2 px-4 text-left text-sm font-bold">Date</th>
                            <th className="py-2 px-4 text-left text-sm font-bold">Meal</th>
                            <th className="py-2 px-4 text-left text-sm font-bold">Content</th>
                            {/* <th className="py-2 px-4 text-left text-sm font-bold">Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((meal: { id: string; title: string; date: string; meal: string; content: string }) => (
                            <tr key={meal.id}>
                                <td className="py-3 px-4 text-sm text-gray-800">{meal.title}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{meal.date}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{meal.meal}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{meal.content}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">
                                    <button onClick={() => handleDelete(Number(meal.id))}> 🗑️                                      
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    

};

export default FoodPostList;
