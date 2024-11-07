// server/_actions/guitarActions.ts
import prisma from "@/app/utils/db";

export async function getGuitars() {
    return await prisma.guitar.findMany();
}

export async function addGuitar(name: string, brand: string, price: number) {
    return await prisma.guitar.create({
        data: {
            name,
            brand,
            price,
        },
    });
}
