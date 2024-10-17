import Link from 'next/link';

interface InstrumentProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  like: number;
  isNew: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export default function Instrument({ id, name, price, imageUrl, like, isNew, onDelete, onEdit }: InstrumentProps) {
  return (
    <div className="relative border p-4 rounded shadow-md flex flex-col items-center w-64">
      {isNew && (
        <div className="absolute -top-2 -left-2 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[64px] border-r-[64px] border-t-yellow-400 border-r-transparent"></div>
          <span className="absolute top-3 left-1 text-xs font-bold text-black transform -rotate-45">
            NEW!
          </span>
        </div>
      )}

      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full hover:bg-blue-700"
          onClick={onEdit}
          aria-label="Edit"
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-700"
          onClick={onDelete}
          aria-label="Delete"
        >
          X
        </button>
      </div>

      <Link href={`/instrument/${id}`}>
        <div className="cursor-pointer text-center">
          <img src={imageUrl} alt={name} className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-black text-xl font-bold mb-2">{name}</h2>
          <p className="text-gray-600 text-lg mb-1">${price}</p>
          <p className="text-gray-500 text-sm">❤️ {like} likes</p>
        </div>
      </Link>
    </div>
  );
}