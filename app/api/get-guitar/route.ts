import prisma from '@/app/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const guitars = await prisma.guitar.findMany();
        return NextResponse.json(guitars);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch guitars' }, { status: 500 });
    }
}
