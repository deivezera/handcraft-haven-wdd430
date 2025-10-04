import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const categoryData = [
    { name: 'Ceramics', image: '/api/placeholder/200/150' },
    { name: 'Textiles', image: '/api/placeholder/200/150' },
    { name: 'Woodwork', image: '/api/placeholder/200/150' },
    { name: 'Jewelry', image: '/api/placeholder/200/150' },
    { name: 'Paintings', image: '/api/placeholder/200/150' },
  ]

  for (const c of categoryData) {
    await prisma.category.upsert({
      where: { name: c.name },
      update: { image: c.image },
      create: { 
        name: c.name, 
        image: c.image,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    })
  }

  const artisanData = [
    { name: 'Sarah Chen', email: 'sarah@example.com', password: 'password123' },
    { name: 'Maria Rodriguez', email: 'maria@example.com', password: 'password123' },
    { name: 'James Wilson', email: 'james@example.com', password: 'password123' },
  ]

  for (const a of artisanData) {
    const hashedPassword = await bcrypt.hash(a.password, 12)
    await prisma.artisan.upsert({
      where: { email: a.email },
      update: { name: a.name, password: hashedPassword },
      create: { 
        name: a.name, 
        email: a.email, 
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    })
  }

  const productData = [
    {
      name: 'Ceramic Vase',
      description: 'A stunning piece perfect for any room.',
      price: 89.99,
      image: '/api/placeholder/300/300',
      featured: true,
      artisanEmail: 'sarah@example.com',
      categoryName: 'Ceramics',
    },
    {
      name: 'Handwoven Rug',
      description: 'Adds warmth and color to your space.',
      price: 245.0,
      image: '/api/placeholder/300/300',
      featured: true,
      artisanEmail: 'maria@example.com',
      categoryName: 'Textiles',
    },
    {
      name: 'Wooden Sculpture',
      description: 'Hand-carved with precision and care.',
      price: 156.5,
      image: '/api/placeholder/300/300',
      featured: true,
      artisanEmail: 'james@example.com',
      categoryName: 'Woodwork',
    },
  ] as const

  for (const p of productData) {
    const artisan = await prisma.artisan.findUnique({ where: { email: p.artisanEmail } })
    const category = await prisma.category.findUnique({ where: { name: p.categoryName } })
    if (!artisan || !category) continue

    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        featured: p.featured,
        artisan: { connect: { id: artisan.id } },
        category: { connect: { id: category.id } },
      },
    })
  }

  const now = new Date()
  const nextYear = now.getFullYear() + 1
  const eventData = [
    {
      title: 'Annual Craft Fair',
      description: 'Join us for a weekend of creativity and community.',
      date: new Date(`${nextYear}-03-15`),
      location: 'Central Park, New York',
      image: '/api/placeholder/400/250',
      featured: true,
      artisanEmail: 'sarah@example.com',
    },
    {
      title: 'Pottery Workshop',
      description: 'Learn the art of pottery from skilled artisans.',
      date: new Date(`${nextYear}-03-22`),
      location: 'Art Studio Downtown',
      image: '/api/placeholder/400/250',
      featured: true,
      artisanEmail: 'sarah@example.com',
    },
  ] as const

  for (const e of eventData) {
    const artisan = await prisma.artisan.findUnique({ where: { email: e.artisanEmail } })
    if (!artisan) continue
    await prisma.event.create({
      data: {
        title: e.title,
        description: e.description,
        date: e.date,
        location: e.location,
        image: e.image,
        featured: e.featured,
        artisan: { connect: { id: artisan.id } },
      },
    })
  }

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
