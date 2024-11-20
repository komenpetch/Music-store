import { z } from 'zod';

// Zod schema for guitar validation
export const guitarSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    brand: z.string().min(1, { message: 'Brand is required' }),
    price: z
        .number({ invalid_type_error: 'Price must be a number' })
        .min(1, { message: 'Price must be at least 1' }),
});

// Helper to validate input data
export const validateGuitar = (data: { name: string; brand: string; price: number }) => {
    const result = guitarSchema.safeParse(data);
    if (!result.success) {
        const errors: Record<string, string> = {};
        result.error.errors.forEach((error) => {
            errors[error.path[0] as string] = error.message;
        });
        return errors;
    }
    return null; // No errors
};
