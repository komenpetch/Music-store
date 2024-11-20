import { addGuitar, deleteGuitar, getGuitars, updateGuitar } from '@/app/server/_actions/guitarActions';
import { NextResponse } from 'next/server';
// import { getGuitars, addGuitar, deleteGuitar, updateGuitar } from '../../../server/_actions/guitarActions';

// GET all guitars
export async function GET() {
    try {
        const guitars = await getGuitars();
        return NextResponse.json(guitars);
    } catch (error) {
        console.error('GET error:', error);
        return NextResponse.json({ error: 'Failed to fetch guitars' }, { status: 500 });
    }
}

// POST a new guitar
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Parse request body
        const newGuitar = await addGuitar(body); // Call addGuitar function
        return NextResponse.json(newGuitar);
    } catch (error: unknown) {
        console.error('POST error:', (error as Error).message); // Log error
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}


// PUT update a guitar by ID
export async function PUT(request: Request) {
    try {
        const { id, ...data } = await request.json();
        const updatedGuitar = await updateGuitar(id, data);
        return NextResponse.json(updatedGuitar);
    } catch (error: unknown) {
        console.error('PUT error:', (error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

// DELETE a guitar by ID
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await deleteGuitar(id);
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('DELETE error:', (error as Error).message);
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

