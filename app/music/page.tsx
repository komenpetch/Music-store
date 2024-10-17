'use client';
import { useState } from "react";
import Instrument from "../components/instrument";
export default function Music() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [like, setLike] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [instruments, setInstruments] = useState([
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
  ]);

  const handleAddInstrument = () => {
    if (!name || !price || !imageUrl || !like) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const newInstrument = {
      id: (instruments.length + 1).toString(),
      name,
      price: Number(price),
      imageUrl,
      like: Number(like),
      isNew,
    };

    setInstruments([...instruments, newInstrument]);
    setName("");
    setPrice("");
    setImageUrl("");
    setLike("");
    setIsNew(false);
  };

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingInstrument, setEditingInstrument] = useState({
    id: "",
    name: "",
    price: "",
    imageUrl: "",
    like: "",
    isNew: false,
  });

  const handleDeleteInstrument = (id: string) => {
    setInstruments(instruments.filter(instrument => instrument.id !== id));
  };

  const handleEditInstrument = (id: string) => {
    const index = instruments.findIndex(instrument => instrument.id === id);
    setEditingIndex(index);
    setEditingInstrument({ 
      ...instruments[index], 
      price: instruments[index].price.toString(), 
      like: instruments[index].like.toString() 
    });
  };

  const handleSaveEdit = () => {
    const updatedInstruments = instruments.map((instrument) =>
      instrument.id === editingInstrument.id
        ? {
            ...editingInstrument,
            price: Number(editingInstrument.price),
            like: Number(editingInstrument.like),
          }
        : instrument
    );
    setInstruments(updatedInstruments);
    setEditingIndex(null);
    setEditingInstrument({ id: "", name: "", price: "", imageUrl: "", like: "", isNew: false });
  };

  return (
    <div className="p-8 mt-24 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {instruments.map((instrument) => (
          <Instrument
            key={instrument.id}
            id={instrument.id}
            name={instrument.name}
            price={instrument.price}
            imageUrl={instrument.imageUrl}
            like={instrument.like}
            isNew={instrument.isNew}
            onDelete={() => handleDeleteInstrument(instrument.id)}
            onEdit={() => handleEditInstrument(instrument.id)}
          />
        ))}
      </div>
      {/* The Add/Edit Instrument form */}
      <div className="flex justify-center items-center mt-16">
        <div className="w-72 max-w-md p-8 bg-gray-100 rounded shadow-lg">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-black">Name:</label>
              <input
                type="text"
                value={editingIndex !== null ? editingInstrument.name : name}
                onChange={(e) =>
                  editingIndex !== null
                    ? setEditingInstrument({ ...editingInstrument, name: e.target.value })
                    : setName(e.target.value)
                }
                className="border border-gray-300 rounded p-2 w-full text-black"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Price:</label>
              <input
                type="number"
                value={editingIndex !== null ? editingInstrument.price : price}
                onChange={(e) =>
                  editingIndex !== null
                    ? setEditingInstrument({ ...editingInstrument, price: e.target.value })
                    : setPrice(e.target.value)
                }
                className="border border-gray-300 rounded p-2 w-full text-black"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Image URL:</label>
              <input
                type="text"
                value={editingIndex !== null ? editingInstrument.imageUrl : imageUrl}
                onChange={(e) =>
                  editingIndex !== null
                    ? setEditingInstrument({ ...editingInstrument, imageUrl: e.target.value })
                    : setImageUrl(e.target.value)
                }
                className="border border-gray-300 rounded p-2 w-full text-black"
                placeholder="Enter URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">Likes:</label>
              <input
                type="number"
                value={editingIndex !== null ? editingInstrument.like : like}
                onChange={(e) =>
                  editingIndex !== null
                    ? setEditingInstrument({ ...editingInstrument, like: e.target.value })
                    : setLike(e.target.value)
                }
                className="border border-gray-300 rounded p-2 w-full text-black"
                placeholder="Enter likes"
              />
            </div>
            <div className="flex items-center">
              <label className="text-sm font-medium text-black">Is this Instrument Newest?:</label>
              <input
                type="checkbox"
                checked={editingIndex !== null ? editingInstrument.isNew : isNew}
                onChange={(e) =>
                  editingIndex !== null
                    ? setEditingInstrument({ ...editingInstrument, isNew: e.target.checked })
                    : setIsNew(e.target.checked)
                }
                className="ml-2"
              />
            </div>
            <button
              type="button"
              onClick={editingIndex !== null ? handleSaveEdit : handleAddInstrument}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              {editingIndex !== null ? "Save Changes" : "Add New Instrument"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}