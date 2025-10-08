'use server';

import prisma from "@/lib/prisma";
import type { FeaturedProduct, CategoryItem, EventItem } from "@/types/actions";
import { registerArtisan, loginArtisan, getArtisanById } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getArtisans() {
  try {
    const artisans = await prisma.artisan.findMany({
      include: {
        products: true,
        _count: {
          select: { events: true, products: true }
        }
      },
      orderBy: {
        createdAt: 'desc',
      }
    })
    return artisans;
  } catch(err) {
    console.log('error fetching artisans: ', err)
    throw new Error('Failed to fetch artisans')
  }
}

export async function getFeaturedProducts(limit: number = 3): Promise<FeaturedProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      include: {
        artisan: { select: { name: true } },
        category: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return products;
  } catch (err) {
    console.log('error fetching featured products: ', err)
    throw new Error('Failed to fetch featured products')
  }
}

export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { name: true, image: true }
    });
    return categories as CategoryItem[];
  } catch (err) {
    console.log('error fetching categories: ', err)
    throw new Error('Failed to fetch categories')
  }
}

export async function getUpcomingEvents(limit: number = 2): Promise<EventItem[]> {
  try {
    const now = new Date();
    const events = await prisma.event.findMany({
      where: { date: { gte: now } },
      orderBy: { date: 'asc' },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        image: true,
      }
    });
    return events as unknown as EventItem[];
  } catch (err) {
    console.log('error fetching upcoming events: ', err)
    throw new Error('Failed to fetch upcoming events')
  }
}

// Authentication actions
export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const website = formData.get("website") as string;

  const result = await registerArtisan({
    name,
    email,
    password,
    bio: bio || undefined,
    location: location || undefined,
    website: website || undefined,
  });

  if (result.success) {
    // Set session cookie (simplified - in production, use proper session management)
    const cookieStore = await cookies();
    cookieStore.set("artisan-id", result.artisan!.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    redirect("/dashboard");
  }

  return result;
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await loginArtisan({ email, password });

  if (result.success) {
    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set("artisan-id", result.artisan!.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    redirect("/dashboard");
  }

  return result;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("artisan-id");
  redirect("/");
}

export async function getCurrentArtisan() {
  try {
    const cookieStore = await cookies();
    const artisanId = cookieStore.get("artisan-id")?.value;

    if (!artisanId) {
      return null;
    }

    const artisan = await getArtisanById(artisanId);
    return artisan;
  } catch (error) {
    console.error("Error getting current artisan:", error);
    return null;
  }
}

// Product management actions
export async function getArtisanProducts() {
  try {
    const cookieStore = await cookies();
    const artisanId = cookieStore.get("artisan-id")?.value;

    if (!artisanId) {
      return [];
    }

    const products = await prisma.product.findMany({
      where: { artisanId },
      include: {
        category: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return products;
  } catch (error) {
    console.error("Error fetching artisan products:", error);
    return [];
  }
}

export async function getProductById(productId: string) {
  try {
    const cookieStore = await cookies();
    const artisanId = cookieStore.get("artisan-id")?.value;

    if (!artisanId) {
      return null;
    }

    const product = await prisma.product.findFirst({
      where: { 
        id: productId,
        artisanId // Ensure the product belongs to the current artisan
      },
      include: {
        category: {
          select: { name: true }
        }
      }
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function createProductAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const artisanId = cookieStore.get("artisan-id")?.value;

    if (!artisanId) {
      return {
        success: false,
        error: "You must be logged in to create products"
      };
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const image = formData.get("image") as string;
    const categoryName = formData.get("categoryName") as string;
    const featured = formData.get("featured") === "on";

    // Validate required fields
    if (!name || !description || !price || !image || !categoryName) {
      return {
        success: false,
        error: "All fields are required"
      };
    }

    // Find the category
    const category = await prisma.category.findUnique({
      where: { name: categoryName }
    });

    if (!category) {
      return {
        success: false,
        error: "Invalid category selected"
      };
    }

    // Create the product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        featured,
        artisanId,
        categoryId: category.id
      }
    });

    return {
      success: true,
      product
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: "Failed to create product. Please try again."
    };
  }
}

export async function updateProductAction(productId: string, formData: FormData) {
  try {
    const cookieStore = await cookies();
    const artisanId = cookieStore.get("artisan-id")?.value;

    if (!artisanId) {
      return {
        success: false,
        error: "You must be logged in to update products"
      };
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const image = formData.get("image") as string;
    const categoryName = formData.get("categoryName") as string;
    const featured = formData.get("featured") === "on";

    // Validate required fields
    if (!name || !description || !price || !image || !categoryName) {
      return {
        success: false,
        error: "All fields are required"
      };
    }

    // Find the category
    const category = await prisma.category.findUnique({
      where: { name: categoryName }
    });

    if (!category) {
      return {
        success: false,
        error: "Invalid category selected"
      };
    }

    // Update the product (ensuring it belongs to the current artisan)
    const product = await prisma.product.updateMany({
      where: { 
        id: productId,
        artisanId // Ensure the product belongs to the current artisan
      },
      data: {
        name,
        description,
        price,
        image,
        featured,
        categoryId: category.id
      }
    });

    if (product.count === 0) {
      return {
        success: false,
        error: "Product not found or you don't have permission to update it"
      };
    }

    return {
      success: true
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: "Failed to update product. Please try again."
    };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const cookieStore = await cookies();
    const artisanId = cookieStore.get("artisan-id")?.value;

    if (!artisanId) {
      return {
        success: false,
        error: "You must be logged in to delete products"
      };
    }

    // Delete the product (ensuring it belongs to the current artisan)
    const result = await prisma.product.deleteMany({
      where: { 
        id: productId,
        artisanId // Ensure the product belongs to the current artisan
      }
    });

    if (result.count === 0) {
      return {
        success: false,
        error: "Product not found or you don't have permission to delete it"
      };
    }

    return {
      success: true
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: "Failed to delete product. Please try again."
    };
  }
}