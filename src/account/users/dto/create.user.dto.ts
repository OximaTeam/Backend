import {z} from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().min(3, 'Too short username!').max(20, 'Too long username'),
  email: z.email('Invalid email format!'),
  password: z.string().min(5, 'Too short password!').max(20, 'Too long password'),
});