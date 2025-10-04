import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductForm } from '@/components/ProductForm';
import { getCurrentArtisan, getProductById } from '@/app/actions';
import { redirect } from 'next/navigation';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const artisan = await getCurrentArtisan();

  if (!artisan) {
    redirect('/login');
  }

  const product = await getProductById(params.id);

  if (!product) {
    redirect('/dashboard/products');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12">
        <ProductForm product={product} />
      </div>
      
      <Footer />
    </div>
  );
}
