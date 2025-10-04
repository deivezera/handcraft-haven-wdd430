import { Search, ShoppingCart, User, LogOut } from "lucide-react";
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Handcrafted Haven</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for handcrafted items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">Product Listings</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">Artisan Profiles</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium flex items-center space-x-1">
              <ShoppingCart className="w-4 h-4" />
              <span>Shopping Cart</span>
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">Checkout</Link>
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
