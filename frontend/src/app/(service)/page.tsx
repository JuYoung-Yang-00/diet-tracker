'use client'

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import PostNewMeal from '@/app/(service)/meals/PostMeal';
import FoodPostList from '@/app/(service)/meals/FoodPostList';

function Home() {
  const [data, setData] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.get('http://127.0.0.1:8000/api/user');
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
    <main className="flex min-h-screen sm:max-h-screen flex-col items-center justify-between sm:mt-8 sm:p-12 p-2 font-mono">
      <div className="w-full max-w-[1450px] items-center justify-between text-sm flex flex-col">
        <h1 className='m-8'> Welcome back, {data?.username ? capitalizeFirst(data.username) : ''}!! </h1>

        <div className='w-full grid lg:grid-cols-12 gap-4 grid-cols-1'>
          <div className='w-full lg:col-span-6 bg-red-200'>
            <FoodPostList />
          </div>

          <div className='w-full lg:col-span-6 bg-blue-200 h-[400px]'>
            <PostNewMeal />
          </div>


        </div>



      </div>
    </main>
  );
}  
  export default Home;