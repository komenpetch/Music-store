'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

async function addNewGuitar(name: string, brand: string, price: number) {
    await fetch('/api/add-guitar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, brand, price }),
    });
}

export default function AddGuitarPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState<number | ''>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && brand && price) {
            await addNewGuitar(name, brand, Number(price));
            setName('');
            setBrand('');
            setPrice('');
            alert('Guitar added successfully!');
            // router.push('/server');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-black">Add New Guitar</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Guitar name"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Brand:</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Guitar brand"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md p-2 text-black"
                        placeholder="Guitar price"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white px-4 py-2 rounded-md bg-gradient-to-r from-violet-200 to-pink-200"
                >
                    Add Guitar
                </button>
            </form>

            <Link href="/server">
                <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                    Back to Guitar List
                </button>
            </Link>
            testing
        </div>
    );
}
