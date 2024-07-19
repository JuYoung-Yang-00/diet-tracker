'use client'

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import PostNewMeal from '@/app/(service)/meals/PostMeal';
import FoodPostList from '@/app/(service)/meals/FoodPostList';

function Home() {
  const [data, setData] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get('http://3.86.178.234:8000/api/user');
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <main className='z-100 min-h-screen w-full max-w-[1400px] mx-auto px-2 mt-16 font-mono'>
        <h1 className='mt-20 font-bold text-2xl'> Welcome back, {data?.username ? capitalizeFirst(data.username) : ''} </h1>
        <div className= 'flex flex-col lg:flex-row gap-4 lg:mt-20 mt-10'>
          <FoodPostList />
          <PostNewMeal />
        </div>
    </main>
  );
}  
  export default Home;