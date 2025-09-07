import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NewHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-xl font-semibold text-gray-800">Impulso</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="flex items-center space-x-4">
              <Link href="/catalog" className="text-gray-600 hover:text-primary transition">Cursos</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-primary transition">Precios</Link>
              <Link href="/about" className="text-gray-600 hover:text-primary transition">Sobre Nosotros</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary transition">Contacto</Link>
            </nav>
          </div>
          <div className="hidden md:block">
            <Link href="/login" className="bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg shadow transition">Comienza ahora</Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/catalog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Cursos</Link>
            <Link href="/pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Precios</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Sobre Nosotros</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Contacto</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <Link href="/login" className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2 rounded-lg shadow transition">Comienza ahora</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NewHeader;
