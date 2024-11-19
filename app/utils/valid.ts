import { z } from 'zod';

export const guitarSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
});

export function validateInputs(data: { name: string; brand: string; price: number }) {
    const validation = guitarSchema.safeParse(data);
    if (!validation.success) {
        return validation.error.errors.reduce(
            (acc, error) => ({
                ...acc,
                [error.path[0]]: error.message,
            }),
            {}
        );
    }
    return {};
}
