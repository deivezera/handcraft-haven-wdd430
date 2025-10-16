import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artisan: {name: string; location?: string | null};
  category: {name: string};
  featured?: boolean;
}

export function ProductCard({ id, name, description, price, image, artisan, category, featured }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <div className="relative aspect-square bg-gray-200 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          {featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
              Featured
            </div>
          )}
          {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" /> */}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {name}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {category.name}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">by {artisan.name}</span>
            {artisan.location && (
              <span className="text-xs text-gray-400">{artisan.location}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
