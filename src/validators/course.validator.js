import { z } from 'zod';
import { COURSE_STATUS } from '@/utils/constants';

export const courseSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters.').max(100),
    description: z.string().min(20, 'Description must be at least 20 characters.'),
    category: z.string().min(1, 'Category is required.'),
    thumbnail: z.string().url('Invalid thumbnail URL.').optional().or(z.literal('')),
    price: z.number().min(0, 'Price cannot be negative.').optional(),
    isFree: z.boolean().default(false),
    status: z.enum([COURSE_STATUS.DRAFT, COURSE_STATUS.PENDING, COURSE_STATUS.PUBLISHED]).default(COURSE_STATUS.DRAFT),
});

export const updateCourseSchema = courseSchema.partial();
