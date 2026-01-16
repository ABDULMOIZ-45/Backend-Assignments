import z, { email } from "zod";

export const userSchema = z.object({
    userName : z.string().min(3),
    email : z.email(),
    skills : z.array(z.string()),
    experience : z.number().min(0),
    password : z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be strong, Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character")
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be strong, Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character")
})
