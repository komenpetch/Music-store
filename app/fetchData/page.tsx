// app/fetchData/page.tsx
'use client';

import { useEffect, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    category: string;
}

export default function FetchDataPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/vercel');
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 mt-24 mb-24">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Data</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}</p>
                            <div className="flex items-center justify-between text-gray-500 text-sm mb-2">
                                <span>{post.author}</span>
                                <span>{post.date}</span>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                {post.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
