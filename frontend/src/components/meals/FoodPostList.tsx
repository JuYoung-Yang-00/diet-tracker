// // components/FoodPostList.tsx

// import React, { useEffect, useState } from 'react';
// import { getFoodPosts, deleteFoodPost } from '@/utils/postRoutes';

// const FoodPostList = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             const { data } = await getFoodPosts();
//             setPosts(data);
//         };

//         fetchPosts();
//     }, []);

//     return (
//         <div>
//             {posts.map((post: any) => (
//                 <div key={post.id}>
//                     <h3>{post.title}</h3>
//                     <p>{post.content}</p>
//                     <button onClick={() => deleteFoodPost(post.id)}>
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FoodPostList;
