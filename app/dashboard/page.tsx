import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCurrentArtisan, logoutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const artisan = await getCurrentArtisan();

  if (!artisan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md mx-auto py-12">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access the dashboard.
            </p>
            <a 
              href="/login" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Sign In
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {artisan.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your artisan profile and products
              </p>
            </div>
            <form action={logoutAction}>
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

             <div className="bg-green-50 p-6 rounded-lg">
               <h3 className="text-lg font-semibold text-green-900 mb-2">
                 Products
               </h3>
               <p className="text-green-700 text-sm mb-4">
                 Manage your handcrafted products
               </p>
               <a href="/dashboard/products">
                 <Button variant="outline" size="sm">
                   Manage Products
                 </Button>
               </a>
             </div>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <p className="text-gray-900">{artisan.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="text-gray-900">{artisan.email}</p>
              </div>
              {artisan.location && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <p className="text-gray-900">{artisan.location}</p>
                </div>
              )}
              {artisan.website && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <a 
                    href={artisan.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    {artisan.website}
                  </a>
                </div>
              )}
              {artisan.bio && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <p className="text-gray-900">{artisan.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
