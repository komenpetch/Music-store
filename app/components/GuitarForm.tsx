import { useState, useEffect } from 'react';
import { Guitar } from '@prisma/client';
import { validateGuitar } from '../utils/valid';
// import { validateGuitar } from '@/utils/valid';

export default function GuitarForm({
    onSubmit,
    editGuitar,
    setEditGuitar,
}: {
    onSubmit: (data: Guitar) => void;
    editGuitar: Guitar | null;
    setEditGuitar: (guitar: Guitar | null) => void;
}) {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [errors, setErrors] = useState<{ name?: string; brand?: string; price?: string }>({});

    // Populate form fields when editing
    useEffect(() => {
        if (editGuitar) {
            setName(editGuitar.name);
            setBrand(editGuitar.brand);
            setPrice(editGuitar.price);
        } else {
            setName('');
            setBrand('');
            setPrice('');
        }
    }, [editGuitar]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate inputs using Zod
        const validationErrors = validateGuitar({
            name,
            brand,
            price: typeof price === 'number' ? price : parseFloat(price),
        });

        if (validationErrors) {
            setErrors(validationErrors); // Display errors
            return;
        }

        // If valid, submit data
        onSubmit({ id: editGuitar?.id || '', name, brand, price: Number(price) });
        setEditGuitar(null); // Reset edit mode
        setName('');
        setBrand('');
        setPrice('');
        setErrors({}); // Clear errors
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mb-4 space-y-3 text-sm max-w-sm mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4 text-black">
                {editGuitar ? 'Edit Guitar' : 'Add New Guitar'}
            </h2>
            <div>
                <label className="block font-medium mb-2 text-black">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full border rounded-md p-2 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Guitar Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
                <label className="block font-medium mb-2 text-black">Brand:</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className={`w-full border rounded-md p-2 ${
                        errors.brand ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Guitar Brand"
                />
                {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
            </div>
            <div>
                <label className="block font-medium mb-2 text-black">Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className={`w-full border rounded-md p-2 ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Guitar Price"
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {editGuitar ? 'Update Guitar' : 'Add Guitar'}
            </button>
            {editGuitar && (
                <button
                    type="button"
                    onClick={() => setEditGuitar(null)}
                    className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}
