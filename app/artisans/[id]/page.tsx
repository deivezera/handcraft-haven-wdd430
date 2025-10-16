import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getArtisanWithProducts } from "@/app/actions";

interface ArtisanPageProps {
  params: { id: string };
}

export default async function ArtisanGalleryPage({ params }: ArtisanPageProps) {
  const artisan = await getArtisanWithProducts(params.id);

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-2xl font-semibold text-gray-900">Artisan not found</h1>
          <p className="text-gray-600 mt-2">We couldn't find this artisan or they have no public products.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{artisan.name}</h1>
          {artisan.location && (
            <p className="text-gray-600 mt-1">{artisan.location}</p>
          )}
          {artisan.bio && (
            <p className="text-gray-700 mt-4 max-w-3xl">{artisan.bio}</p>
          )}
        </div>

        {artisan.products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h2>
            <p className="text-gray-600">This artisan hasn't listed any products in stock.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artisan.products.map((product) => (
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
        )}
      </div>
      <Footer />
    </div>
  );
}


