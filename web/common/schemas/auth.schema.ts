import z from 'zod'

const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')

export const AuthLoginSchema = z.object({
  login: z.string().min(1, 'Login is required'),
  password: strongPassword,
})

export type AuthLogin = z.infer<typeof AuthLoginSchema>

export const AuthCreateSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    password: strongPassword,
    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  })

export type AuthCreate = z.infer<typeof AuthCreateSchema>
