import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductForm } from '@/components/ProductForm';
import { getCurrentArtisan } from '@/app/actions';
import { redirect } from 'next/navigation';

export default async function NewProductPage() {
  const artisan = await getCurrentArtisan();

  if (!artisan) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12">
        <ProductForm />
      </div>
      
      <Footer />
    </div>
  );
}
