// app/api/add-guitar/route.ts
import { addGuitar } from '@/app/server/_actions/guitarActions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { name, brand, price } = await request.json();
    const newGuitar = await addGuitar(name, brand, price);
    return NextResponse.json(newGuitar);
}
