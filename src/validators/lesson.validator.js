import { z } from 'zod';

export const lessonSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters.').max(100),
    videoUrl: z.string().url('Invalid video URL.'),
    order: z.number().int().min(0).optional().default(0),
    courseId: z.string().min(1, 'Course ID is required.'),
});

export const updateLessonSchema = lessonSchema.partial();
