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
                  description: 'Successfully posted your meal 🎉',
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
        <div className="w-full max-w-[1480px] mx-auto flex flex-col gap-4 max-h-[600px] lg:max-h-[1000px] border border-lime-300 rounded-lg lg:p-6 p-4 ">
            <h1 className='font-bold pb-4 text-xl'> Post a New Meal</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name your meal!"
                    className="w-full py-1.5 px-2 border rounded-lg text-sm"
                    required
                />
                <input
                    type="date"
                    value={date.toISOString().substring(0, 10)}
                    onChange={e => setDate(new Date(e.target.value))}
                    className="form-input block w-full border rounded-lg text-sm py-1.5 px-2"
                    placeholder='Date'
                />
                <label className="block text-sm">
                    <p className='ml-1'>Which meal was it?</p>
                    <select
                        value={meal}
                        onChange={e => setMeal(e.target.value)}
                        className="form-select mt-1 block w-full border rounded-lg text-sm py-1.5 px-2"
                    >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What did you eat today?"
                    className="py-1.5 px-2 border rounded-lg text-sm min-h-[200px]"
                    rows={5}
                    required
                />
                <button type="submit" className="self-center max-w-xl bg-lime-500 hover:bg-lime-600 text-white py-1.5 px-2 rounded transform duration-300 ease-in-out">
                    Post
                </button>
            </form>
        </div>
    );
    
};

export default PostNewMeal;
