import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12">
        <RegisterForm />
      </div>
      
      <Footer />
    </div>
  );
}
