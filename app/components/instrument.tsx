interface InstrumentProps {
  name: string;
  price: number;
  imageUrl: string;
  like: number;
  isNew: boolean;
}

export default function Instrument({ name, price, imageUrl, like, isNew }: InstrumentProps) {
  return (
    <div className="border p-4 rounded shadow-md flex flex-col items-center">
      <span
        className={`${
          isNew ? "bg-green-200 text-green-800" : "invisible"
        } text-xs px-2 py-1 rounded-full mb-2`}
      >
        New
      </span>
      <img src={imageUrl} alt={name} className="w-32 h-32 object-cover" />
      <h2 className="text-black text-xl font-bold mt-4">{name}</h2>
      <p className="text-gray-600">${price}</p>
      <p className="text-gray-500 mt-2">❤️ {like} likes</p>
      {/* texting */}
            {/* texting */}

      {/* texting */}

    </div>
  );
}

