// InstrumentContext.tsx
//not using this one yet
'use client';

import { createContext, useState, ReactNode } from 'react';

type Instrument = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  like: number;
  isNew: boolean;
};

type InstrumentContextType = {
  instruments: Instrument[];
  addInstrument: (instrument: Omit<Instrument, 'id'>) => void;
  deleteInstrument: (id: string) => void;
  editInstrument: (instrument: Instrument) => void;
};

export const InstrumentContext = createContext<InstrumentContextType>({
  instruments: [],
  addInstrument: () => {},
  deleteInstrument: () => {},
  editInstrument: () => {},
});

export const InstrumentProvider = ({ children }: { children: ReactNode }) => {
  const [instruments, setInstruments] = useState<Instrument[]>([
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

  const addInstrument = (instrument: Omit<Instrument, 'id'>) => {
    const newInstrument = {
      ...instrument,
      id: (instruments.length + 1).toString(),
    };
    setInstruments([...instruments, newInstrument]);
  };

  const deleteInstrument = (id: string) => {
    setInstruments(instruments.filter((instrument) => instrument.id !== id));
  };

  const editInstrument = (updatedInstrument: Instrument) => {
    setInstruments(
      instruments.map((instrument) =>
        instrument.id === updatedInstrument.id ? updatedInstrument : instrument
      )
    );
  };

  return (
    <InstrumentContext.Provider
      value={{ instruments, addInstrument, deleteInstrument, editInstrument }}
    >
      {children}
    </InstrumentContext.Provider>
  );
};
