export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="text-lg font-bold">Handcrafted Haven</span>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">About Us</a>
            <a href="#" className="text-gray-300 hover:text-white">Contact</a>
            <a href="#" className="text-gray-300 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
