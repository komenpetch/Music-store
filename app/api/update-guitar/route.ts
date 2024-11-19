// app/api/update-guitar/route.ts
import { updateGuitar } from '@/app/server/_actions/guitarActions';
import { NextResponse } from 'next/server';
// import { updateGuitar } from '@/server/_actions/guitarActions';

export async function POST(req: Request) {
    const { id, name, brand, price } = await req.json();
    if (!id || !name || !brand || !price) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        const updatedGuitar = await updateGuitar(id, { name, brand, price: Number(price) });
        return NextResponse.json(updatedGuitar);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update guitar' }, { status: 500 });
    }
}
