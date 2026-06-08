'use server';

import { registerSchema } from '@/validators/auth.validator';
import { createUser } from '@/services/auth.service';

export async function registerAction(formData) {
    try {
        const validatedData = registerSchema.parse(formData);
        const user = await createUser(validatedData);

        return { success: true, user };
    } catch (error) {
        console.error('Registration Error:', error);
        if (error.name === 'ZodError') {
            return { success: false, error: error.errors[0].message };
        }
        return { success: false, error: error.message || 'Something went wrong.' };
    }
}
