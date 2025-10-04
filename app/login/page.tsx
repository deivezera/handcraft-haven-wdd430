import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12">
        <LoginForm />
      </div>
      
      <Footer />
    </div>
  );
}
