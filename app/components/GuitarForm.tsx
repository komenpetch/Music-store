import React from 'react';
import InputField from './InputField';

export default function GuitarForm({
    handleSubmit,
    name,
    setName,
    brand,
    setBrand,
    price,
    setPrice,
    errors,
}: {
    handleSubmit: (e: React.FormEvent) => void;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    brand: string;
    setBrand: React.Dispatch<React.SetStateAction<string>>;
    price: number | '';
    setPrice: React.Dispatch<React.SetStateAction<number | ''>>;
    errors: { name?: string; brand?: string; price?: string };
}) {
    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 mb-8 space-y-2">
            <h2 className="text-2xl font-bold mb-4 text-black">Add New Guitar</h2>
            <InputField
                label="Name"
                value={name}
                onChange={(val) => setName(val as string)}
                placeholder="Enter guitar name"
                error={errors.name}
            />
            <InputField
                label="Brand"
                value={brand}
                onChange={(val) => setBrand(val as string)}
                placeholder="Enter guitar brand"
                error={errors.brand}
            />
            <InputField
                label="Price"
                type="number"
                value={price}
                onChange={(val) => setPrice(val as number)}
                placeholder="Enter guitar price"
                error={errors.price}
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
                Add Guitar
            </button>
        </form>
    );
}
