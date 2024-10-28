'use client'
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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/vercel');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                    <p className="mt-2 text-gray-600">Loading posts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-500">
                    <p className="text-xl font-semibold">Error</p>
                    <p className="mt-2">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20 mb-14">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Posts</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our collection of carefully curated articles and insights
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                        {post.category}
                                    </span>
                                    <time className="text-sm text-gray-500">{post.date}</time>
                                </div>
                                
                                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                    {post.title}
                                </h2>
                                
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.content}
                                </p>
                                
                                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-gray-600 font-medium">
                                                {post.author[0].toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}