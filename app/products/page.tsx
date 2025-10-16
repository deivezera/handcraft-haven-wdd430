import { Suspense } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { getAllProducts, getCategories } from '@/app/actions';
import { Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    sortOrder?: string;
  };
}

async function ProductFiltersWrapper() {
  const categories = await getCategories();
  return <ProductFilters categories={categories} />;
}

async function ProductCount({ searchParams }: ProductsPageProps) {
  const filters = {
    category: searchParams.category,
    search: searchParams.search,
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy as 'name' | 'price' | 'createdAt' | undefined,
    sortOrder: searchParams.sortOrder as 'asc' | 'desc' | undefined,
  };

  const products = await getAllProducts(filters);
  
  return (
    <span className="text-sm text-gray-600">
      {products.length} {products.length === 1 ? 'product' : 'products'} found
    </span>
  );
}

async function ProductGrid({ searchParams }: ProductsPageProps) {
  const filters = {
    category: searchParams.category,
    search: searchParams.search,
    minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
    sortBy: searchParams?.sortBy as 'name' | 'price' | 'createdAt' | undefined,
    sortOrder: searchParams?.sortOrder as 'asc' | 'desc' | undefined,
  };

  const products = await getAllProducts(filters);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Search className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
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
  );
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Handcrafted Products
          </h1>
          <p className="text-gray-600">
            Discover unique, handcrafted items from talented artisans around the world
          </p>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Suspense fallback={<span className="text-sm text-gray-600">Loading products...</span>}>
              <ProductCount searchParams={searchParams} />
            </Suspense>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="bg-white rounded-lg shadow-md p-6">Loading filters...</div>}>
              <ProductFiltersWrapper />
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded mb-3" />
                      <div className="h-3 bg-gray-200 rounded mb-2" />
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-16" />
                        <div className="h-3 bg-gray-200 rounded w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <ProductGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
