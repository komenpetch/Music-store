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
      {isNew && <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">New</span>}
      <img src={imageUrl} alt={name} className="w-32 h-32 object-cover mt-2" />
      <h2 className="text-black text-xl font-bold mt-4">{name}</h2>
      <p className="text-gray-600">${price}</p>
      <p className="text-gray-500 mt-2">❤️ {like} likes</p>
    </div>
  );
}
