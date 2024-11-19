import React from 'react';

export default function InputField({
    label,
    value,
    onChange,
    placeholder,
    error,
    type = 'text',
}: {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    placeholder: string;
    error?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block font-medium mb-1 text-black">{label}:</label>
            <input
                type={type}
                value={value}
                onChange={(e) =>
                    onChange(type === 'number' ? Number(e.target.value) : e.target.value)
                }
                className={`w-full border rounded-md p-2 text-black ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={placeholder}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
