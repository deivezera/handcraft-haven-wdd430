import { Search, User, LogOut } from "lucide-react";
import { getCurrentArtisan, logoutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Header() {
  const artisan = await getCurrentArtisan();
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Handcrafted Haven</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">Product Listings</Link>
          </nav>

          {/* Authentication Section */}
          <div className="flex items-center space-x-4">
            {artisan ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {artisan.name}
                  </span>
                </div>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Dashboard
                </Link>
                <form action={logoutAction} className="inline">
                  <Button variant="ghost" size="sm" type="submit">
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="text-sm text-gray-700 hover:text-blue-600 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Join as Artisan
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
