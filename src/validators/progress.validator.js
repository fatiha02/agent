import { z } from 'zod';

export const progressUpdateSchema = z.object({
    completed: z.boolean().optional(),
    lastWatchedTime: z.number().min(0).optional(),
});

export function validateProgressUpdate(data) {
    return progressUpdateSchema.safeParse(data);
}
