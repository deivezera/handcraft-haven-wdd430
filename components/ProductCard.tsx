interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  artisan: string;
}

export function ProductCard({ name, description, price, artisan }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Product Image</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${price}</span>
          <span className="text-sm text-gray-500">by {artisan}</span>
        </div>
      </div>
    </div>
  );
}
