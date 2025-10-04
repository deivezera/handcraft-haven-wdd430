
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCurrentArtisan, getArtisanProducts, deleteProductAction } from '@/app/actions';

async function handleDelete(productId: string) {
  'use server';
  await deleteProductAction(productId);
}
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Trash2, Plus } from 'lucide-react';

export default async function ProductsPage() {
  const artisan = await getCurrentArtisan();

  if (!artisan) {
    redirect('/login');
  }

  const products = await getArtisanProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
            <p className="text-gray-600 mt-2">
              Add, edit, and manage your handcrafted products
            </p>
          </div>
          <Link href="/dashboard/products/new">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first handcrafted product to showcase your work.
            </p>
            <Link href="/dashboard/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-contain"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.category.name}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/products/edit/${product.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    
                    <form action={handleDelete.bind(null, product.id)} className="flex-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        type="submit"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
