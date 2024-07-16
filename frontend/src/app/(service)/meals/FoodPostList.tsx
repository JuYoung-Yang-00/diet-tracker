'use client'

import { useState, useEffect } from 'react';
import api from '@/utils/api';

const FoodPostList = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await api.get('http://127.0.0.1:8000/api/user');
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
                    const result = await api.get(`http://127.0.0.1:8000/api/meals/user/${user}`);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1>Your past meals</h1>
            {data.map((meal: { id: string; title: string; date: string, meal: string, content: string }) => (
                <div key={meal.id}>
                    {meal.title} - {meal.date}
                    {meal.content}
                    {meal.meal}
                </div>
            ))}
        </div>
    );
};

export default FoodPostList;
