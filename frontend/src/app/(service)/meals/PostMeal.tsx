'use client'
import { useState } from 'react';
import api from '@/utils/api';
import { useToast } from '@/components/ui/use-toast';

const PostNewMeal = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());
    const [meal, setMeal] = useState("breakfast");
    const [description, setDescription] = useState("");
    const {toast} = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { 
            title: title,
            date: date.toISOString().substring(0, 10),
            meal: meal,
            content: description };
        
        try {
            console.log(data);
            const res = await api.post('/api/meals/', data);
            if (res && res.status === 201) {
                toast({
                  title: "Yum!",
                  description: 'Successfully posted meal.',
                });
                setTitle("");
                setDate(new Date());
                setMeal("breakfast");
                setDescription("");
            }
        } catch (err) {
            console.error('Error posting meal:', err);
            alert('Failed to post meal');
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1>Post New Meal</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <label className="block mt-3">
                    Your Meal Title:
                    <textarea
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-textarea mt-1 block w-full"
                        rows={3}
                    ></textarea>
                </label>
                <label className="block">
                    Select a date:
                    <input
                        type="date"
                        value={date.toISOString().substring(0, 10)}
                        onChange={e => setDate(new Date(e.target.value))}
                        className="form-input mt-1 block w-full"
                    />
                </label>
                <label className="block mt-3">
                    Select a meal:
                    <select
                        value={meal}
                        onChange={e => setMeal(e.target.value)}
                        className="form-select mt-1 block w-full"
                    >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                </label>
                <label className="block mt-3">
                    Your Meal Description:
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="form-textarea mt-1 block w-full"
                        rows={3}
                    ></textarea>
                </label>
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Post Meal
                </button>
            </form>
        </div>
    );
};

export default PostNewMeal;
