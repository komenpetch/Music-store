import React from 'react';
import InputField from './InputField';

export default function GuitarList({
    guitars,
    editGuitar,
    setEditGuitar,
    handleEditChange,
    handleSave,
    handleDelete,
    editErrors,
}: {
    guitars: { id: string; name: string; brand: string; price: number }[];
    editGuitar: { id: string; name: string; brand: string; price: number } | null;
    setEditGuitar: React.Dispatch<React.SetStateAction<{ id: string; name: string; brand: string; price: number } | null>>;
    handleEditChange: (field: keyof { id: string; name: string; brand: string; price: number }, value: string | number) => void;
    handleSave: (guitar?: { id: string; name: string; brand: string; price: number }) => void;
    handleDelete: (id: string) => void;
    editErrors: { name?: string; brand?: string; price?: string };
}) {
    return (
        <ul className="space-y-4 ">
            {guitars.map((guitar) => (
                <li
                    key={guitar.id}
                    className="bg-white shadow rounded-lg p-6 flex justify-between items-center"
                >
                    {editGuitar?.id === guitar.id ? (
                        <div className="w-full">
                            <InputField
                                label="Name"
                                value={editGuitar.name}
                                onChange={(val) => handleEditChange('name', val)}
                                placeholder="Enter guitar name"
                                error={editErrors.name}
                            />
                            <InputField
                                label="Brand"
                                value={editGuitar.brand}
                                onChange={(val) => handleEditChange('brand', val)}
                                placeholder="Enter guitar brand"
                                error={editErrors.brand}
                            />
                            <InputField
                                label="Price"
                                type="number"
                                value={editGuitar.price}
                                onChange={(val) => handleEditChange('price', val)}
                                placeholder="Enter guitar price"
                                error={editErrors.price}
                            />
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={() => handleSave(editGuitar)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditGuitar(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <p className="text-black">
                                    <strong>Name:</strong> {guitar.name}
                                </p>
                                <p className="text-black">
                                    <strong>Brand:</strong> {guitar.brand}
                                </p>
                                <p className="text-black">
                                    <strong>Price:</strong> ${guitar.price}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleDelete(guitar.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setEditGuitar(guitar)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}
