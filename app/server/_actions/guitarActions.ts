// server/_actions/guitarActions.ts
// import prisma from '@/utils/db';
import prisma from '@/app/utils/db';
import { z } from 'zod';

// Zod schema for guitar validation
export const guitarSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string().min(1, 'Brand is required'),
    price: z.number().min(0, 'Price must be a positive number'),
});

// Fetch all guitars
export async function getGuitars() {
    return await prisma.guitar.findMany();
}

// Add a new guitar
export async function addGuitar(data: { name: string; brand: string; price: number }) {
    const validatedData = guitarSchema.parse(data); // Validate input
    return await prisma.guitar.create({
        data: validatedData,
    });
}

// Delete a guitar by ID
export async function deleteGuitar(id: string) {
    return await prisma.guitar.delete({
        where: { id },
    });
}

// Update a guitar by ID
export async function updateGuitar(id: string, data: { name: string; brand: string; price: number }) {
    const validatedData = guitarSchema.parse(data); // Validate input
    return await prisma.guitar.update({
        where: { id },
        data: validatedData,
    });
}
