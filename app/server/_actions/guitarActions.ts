// server/_actions/guitarActions.ts
// import prisma from '@/utils/db';
import prisma from '@/app/utils/db';
import { z } from 'zod';

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
    try {
        const validatedData = guitarSchema.parse(data); // Validate input
        return await prisma.guitar.create({
            data: validatedData, // Use validated data
        });
    } catch (error: unknown) {
        console.error('Error adding guitar:', (error as Error).message);
        throw new Error((error as Error).message); // Rethrow for API to handle
    }
}


// Update a guitar
export async function updateGuitar(id: string, data: { name: string; brand: string; price: number }) {
    try {
        const validatedData = guitarSchema.parse(data); // Validate input
        return await prisma.guitar.update({
            where: { id },
            data: validatedData,
        });
    } catch (error: unknown) {
        console.error('Validation or database error:', (error as Error).message);
        throw new Error((error as Error).message); // Re-throw the error with proper type
    }
}

// Delete a guitar
export async function deleteGuitar(id: string) {
    try {
        return await prisma.guitar.delete({
            where: { id },
        });
    } catch (error: unknown) {
        console.error('Database error:', (error as Error).message);
        throw new Error((error as Error).message); // Re-throw the error with proper type
    }
}


