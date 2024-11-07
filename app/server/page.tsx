// server/page.tsx
import Link from 'next/link';
import { getGuitars } from './_actions/guitarActions';

export default async function GuitarPage() {
    const guitars = await getGuitars();

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-black">Guitar List</h1>

            <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-6">
                <ul>
                    {guitars.map((guitar) => (
                        <li key={guitar.id} className="border-b last:border-none p-4">
                            <div className="text-xl font-semibold text-black">{guitar.name}</div>
                            <div className="text-gray-600">Brand: {guitar.brand}</div>
                            <div className="text-gray-600">Price: ${guitar.price}</div>
                        </li>
                    ))}
                </ul>
            </div>

            <Link href="/guitar">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Add New Guitar
                </button>
            </Link>
            testing
        </div>
    );
}
