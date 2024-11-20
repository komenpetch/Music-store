import { Guitar } from '@prisma/client';

export default function GuitarList({
    guitars,
    onEdit,
    onDelete,
}: {
    guitars: Guitar[];
    onEdit: (guitar: Guitar) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <ul className="space-y-4">
            {guitars.map((guitar) => (
                <li
                    key={guitar.id}
                    className="bg-white shadow-md rounded-md p-4 mb-4 space-y-3 text-sm max-w-sm mx-auto text-black"
                >
                    <div>
                        <p>
                            <strong>Name:</strong> {guitar.name}
                        </p>
                        <p>
                            <strong>Brand:</strong> {guitar.brand}
                        </p>
                        <p>
                            <strong>Price:</strong> ${guitar.price}
                        </p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => onEdit(guitar)} // Correctly call the onEdit function
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(guitar.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
