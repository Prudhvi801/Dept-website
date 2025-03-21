'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const token = Cookies.get('admin-token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('admin-token');
    router.push('/login');
  };

  const navItems = [
    { name: 'Alerts', path: '/admin/alerts' },
    // Add more admin sections as needed
    // { name: 'Events', path: '/admin/events' },
    // { name: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-primary-blue text-white">
      {/* Header */}
      <header className="bg-secondary-blue shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-accent-blue font-bold text-xl flex items-center gap-2">
                <span>ASCESS Admin</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path}
                  className={`hover:text-accent-blue transition-colors ${
                    pathname === item.path ? 'text-accent-blue font-medium' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-white hover:text-accent-blue"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary-blue border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-md ${
                  pathname === item.path
                    ? 'bg-gray-700 text-accent-blue'
                    : 'hover:bg-gray-700 hover:text-accent-blue'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}