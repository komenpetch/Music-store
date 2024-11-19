'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GuitarForm from '../components/GuitarForm';
import GuitarList from '../components/GuitarList';
import { validateInputs } from '../utils/valid';

type Guitar = {
    id: string;
    name: string;
    brand: string;
    price: number;
};

export default function AddGuitarPage() {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [errors, setErrors] = useState<{ name?: string; brand?: string; price?: string }>({});
    const [editErrors, setEditErrors] = useState<{ name?: string; brand?: string; price?: string }>({});
    const [guitars, setGuitars] = useState<Guitar[]>([]);
    const [editGuitar, setEditGuitar] = useState<Guitar | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch all guitars
    useEffect(() => {
        async function fetchGuitars() {
            const response = await fetch('/api/get-guitar');
            const data = await response.json();
            setGuitars(data);
        }
        fetchGuitars();
    }, []);

    const handleSave = async (guitar?: Guitar) => {
        const validationErrors = validateInputs(
            guitar || { name, brand, price: Number(price) }
        );

        if (Object.keys(validationErrors).length > 0) {
            guitar ? setEditErrors(validationErrors) : setErrors(validationErrors);
            return;
        }

        if (guitar) {
            // Update logic
            await fetch('/api/update-guitar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(guitar),
            });
            setGuitars((prev) =>
                prev.map((g) => (g.id === guitar.id ? guitar : g))
            );
            setEditGuitar(null);
            setEditErrors({});
            showSuccessMessage('Guitar updated successfully!');
        } else {
            // Add logic
            await fetch('/api/add-guitar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, brand, price: Number(price) }),
            });
            const response = await fetch('/api/get-guitar');
            setGuitars(await response.json());
            setName('');
            setBrand('');
            setPrice('');
            setErrors({});
            showSuccessMessage('Guitar added successfully!');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch('/api/delete-guitar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            setGuitars((prev) => prev.filter((g) => g.id !== id));
            showSuccessMessage('Guitar deleted successfully!');
        } catch (error) {
            alert('Failed to delete guitar');
        }
    };

    const handleEditChange = (field: keyof Guitar, value: string | number) => {
        if (editGuitar) {
            setEditGuitar({ ...editGuitar, [field]: value });
        }
    };

    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000); // Remove message after 3 seconds
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[length:6rem_4rem]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div> */}

            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-2 text-center text-black">Guitar Management</h1>

                {/* Success Message */}
                {successMessage && (
                    <div
                        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300 opacity-100 scale-100"
                    >
                        {successMessage}
                    </div>
                )}

                <GuitarForm
                    handleSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    name={name}
                    setName={setName}
                    brand={brand}
                    setBrand={setBrand}
                    price={price}
                    setPrice={setPrice}
                    errors={errors}
                />

                <GuitarList
                    guitars={guitars}
                    editGuitar={editGuitar}
                    setEditGuitar={setEditGuitar}
                    handleEditChange={handleEditChange}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    editErrors={editErrors}
                />

                {/* Back to Main Page Button */}
                <Link
                    href="/server"
                    className="mt-8 block text-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                    Back to Main Page
                </Link>
            </div>
        </div>
    );
}
