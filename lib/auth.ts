import bcrypt from 'bcryptjs';
import prisma from './prisma';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export async function registerArtisan(data: RegisterInput) {
  try {
    // Validate input
    const validatedData = registerSchema.parse(data);

    // Check if artisan already exists
    const existingArtisan = await prisma.artisan.findUnique({
      where: { email: validatedData.email },
    });

    if (existingArtisan) {
      return {
        success: false,
        error: 'An artisan with this email already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create artisan
    const artisan = await prisma.artisan.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        bio: validatedData.bio,
        location: validatedData.location,
        website: validatedData.website,
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        location: true,
        website: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      artisan,
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Registration failed. Please try again.',
    };
  }
}

export async function loginArtisan(data: LoginInput) {
  try {
    // Validate input
    const validatedData = loginSchema.parse(data);

    // Find artisan
    const artisan = await prisma.artisan.findUnique({
      where: { email: validatedData.email },
    });

    if (!artisan) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    // Check password
    const isValidPassword = await bcrypt.compare(validatedData.password, artisan.password);

    if (!isValidPassword) {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }

    // Return artisan data (excluding password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...artisanData } = artisan;

    return {
      success: true,
      artisan: artisanData,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Login failed. Please try again.',
    };
  }
}

export async function getArtisanById(id: string) {
  try {
    const artisan = await prisma.artisan.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        location: true,
        website: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return artisan;
  } catch (error) {
    console.error('Get artisan error:', error);
    return null;
  }
}
