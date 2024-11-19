// app/api/delete-guitar/route.ts
import { deleteGuitar } from '@/app/server/_actions/guitarActions';
import { NextResponse } from 'next/server';
// import { deleteGuitar } from '@/server/_actions/guitarActions';

export async function POST(req: Request) {
    const { id } = await req.json();
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const deletedGuitar = await deleteGuitar(id);
        return NextResponse.json(deletedGuitar);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete guitar' }, { status: 500 });
    }
}
