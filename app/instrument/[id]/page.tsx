'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define the Instrument type
type Instrument = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  like: number;
  isNew: boolean;
};

export default function InstrumentPage({ params }: { params: { id: string } }) {
  const [instrument, setInstrument] = useState<Instrument | null>(null);

  useEffect(() => {
    const mockInstruments: Instrument[] = [
        {
            id: "1",
            name: "Fender Guitar",
            price: 300,
            imageUrl: "https://www.bigtone.in.th/wp-content/uploads/2017/12/Stratv-EJ-BLK-MN.jpg",
            like: 20,
            isNew: true,
          },
          {
            id: "2",
            name: "Yamaha Piano",
            price: 1500,
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg0xiilJ5qFL4EE0bBihLw4V4Y9SGMqsAxJwBca61w-Ohfz-QKfwF6Z9j977tASd9xMZA&usqp=CAU",
            like: 15,
            isNew: false,
          },
          {
            id: "3",
            name: "Roland Drum Set",
            price: 800,
            imageUrl: "https://www.theeramusic.com/wp-content/uploads/2021/10/td-17kv2_angle_gal.png",
            like: 25,
            isNew: false,
          },
          {
            id: "4",
            name: "Gibson Les Paul",
            price: 1200,
            imageUrl: "https://media.ctmusicshop.com/wp-content/uploads/2023/01/26054409/Gibson-Les-Paul-Standard-60s-Faded-1.jpg",
            like: 45,
            isNew: true,
          },
          {
            id: "5",
            name: "Korg Synthesizer",
            price: 600,
            imageUrl: "https://www.behngiepseng.com/cdn/shop/products/f53493a90930d18850a6d3f1c32fa6ed_pc_1024x.jpg?v=1621828362",
            like: 18,
            isNew: false,
          },
          {
            id: "6",
            name: "Pearl Snare Drum",
            price: 200,
            imageUrl: "https://img.lazcdn.com/g/p/426d56e8533a8026ab60fdf6f9945d2b.jpg_720x720q80.jpg",
            like: 10,
            isNew: false,
          },
          {
            id: "7",
            name: "Ibanez Bass Guitar",
            price: 500,
            imageUrl: "https://iguitarmusic.co.th/wp-content/uploads/2022/07/p_region_GSR180_BEM_4H_03.jpg",
            like: 30,
            isNew: true,
          },
          {
            id: "8",
            name: "Martin Acoustic Guitar",
            price: 700,
            imageUrl: "https://sc1.musik-produktiv.com/pic-010116129xxl/martin-guitars-d-10e-01.jpg",
            like: 22,
            isNew: false,
          },
          {
            id: "9",
            name: "Casio Digital Keyboard",
            price: 400,
            imageUrl: "https://tmw.com.sg/wp-content/uploads/2020/05/casio-ct-x3000-side-view.webp",
            like: 12,
            isNew: true,
          },
          {
            id: "10",
            name: "Selmer Saxophone",
            price: 1100,
            imageUrl: "https://m.media-amazon.com/images/I/71x0NZWO53L.jpg",
            like: 27,
            isNew: false,
          },
    ];

    const foundInstrument = mockInstruments.find(instr => instr.id === params.id);
    setInstrument(foundInstrument || null);
  }, [params.id]);

  if (!instrument) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 mt-24 mb-24">
      <Link
        href="/music"
        className="text-blue-500 hover:underline mb-8 inline-block text-lg font-medium"
      >
        ← Back to all instruments
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={instrument.imageUrl}
            alt={instrument.name}
            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{instrument.name}</h1>
          <p className="text-2xl text-gray-700 mb-3">${instrument.price}</p>

          <div className="flex items-center mb-4">
            <span className="text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.9l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.682-1.682a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {instrument.like} likes
            </span>

            {instrument.isNew && (
              <span className="ml-4 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                NEW!
              </span>
            )}
          </div>

          {/* Add to Cart or other actions here */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
