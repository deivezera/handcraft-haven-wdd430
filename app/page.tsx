import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { EventCard } from "@/components/EventCard";
import { getFeaturedProducts, getCategories, getUpcomingEvents } from "@/app/actions";
import type { FeaturedProduct, CategoryItem, EventItem } from "@/types/actions";

export default async function Home() {
  const [featuredProducts, categories, upcomingEvents] = await Promise.all([
    getFeaturedProducts(3),
    getCategories(),
    getUpcomingEvents(2),
  ]);
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Unique Handcrafted Treasures
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Explore our curated collection of artisan goods, perfect for any space
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Handcrafted Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Handcrafted Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts && featuredProducts.map((product: FeaturedProduct) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                artisan={product.artisan}
                category={product.category}
                featured={product.featured}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category: CategoryItem, index: number) => (
              <Link
                key={index}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event: EventItem) => (
              <EventCard
                key={event.id}
                title={event.title}
                description={event.description}
                date={typeof event.date === 'string' ? event.date : event.date?.toISOString?.()}
                location={event.location}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}