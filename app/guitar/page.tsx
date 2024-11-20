'use client';

import { useState, useEffect } from 'react';
// import GuitarForm from './components/GuitarForm';
// import GuitarList from './components/GuitarList';
import { Guitar } from '@prisma/client';
import GuitarForm from '../components/GuitarForm';
import GuitarList from '../components/GuitarList';

export default function GuitarsPage() {
    const [guitars, setGuitars] = useState<Guitar[]>([]);
    const [editGuitar, setEditGuitar] = useState<Guitar | null>(null);

    // Fetch guitars from the server
    const fetchGuitars = async () => {
        const response = await fetch('/api/guitars');
        const data = await response.json();
        setGuitars(data);
    };

    useEffect(() => {
        fetchGuitars();
    }, []);

    const handleAdd = async (data: { name: string; brand: string; price: number }) => {
        await fetch('/api/guitars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        fetchGuitars();
    };

    const handleEdit = async (data: Guitar) => {
        await fetch('/api/guitars', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        fetchGuitars();
        setEditGuitar(null); // Reset edit mode
    };

    const handleDelete = async (id: string) => {
        await fetch('/api/guitars', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        fetchGuitars();
    };

    return (
        <div className="min-h-screen p-6">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <h1 className="text-3xl font-bold mb-6 text-black">Manage Guitars</h1>
            <GuitarForm
                onSubmit={editGuitar ? handleEdit : handleAdd} // Dynamically decide whether to add or edit
                editGuitar={editGuitar}
                setEditGuitar={setEditGuitar} // Pass state setter to reset edit mode
            />
            <GuitarList guitars={guitars} onEdit={setEditGuitar} onDelete={handleDelete} />
        </div>
    );
}
