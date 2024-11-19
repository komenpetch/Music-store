import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { name, brand, price } = await req.json();

    if (!name || !brand || !price) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        const newGuitar = await prisma.guitar.create({
            data: { name, brand, price },
        });
        return NextResponse.json(newGuitar);
    } catch (error) {
        console.error('Error creating guitar:', error);
        return NextResponse.json({ error: 'Failed to add guitar' }, { status: 500 });
    }
}
