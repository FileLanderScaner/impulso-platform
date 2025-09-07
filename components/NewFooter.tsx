import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const NewFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-xl font-semibold">Impulso</span>
            </Link>
            <p className="mt-4 text-gray-400">Aprende habilidades demandadas y crece profesionalmente.</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Cursos</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/catalog?category=desarrollo" className="text-gray-400 hover:text-white">Desarrollo Web</Link></li>
              <li><Link href="/catalog?category=marketing" className="text-gray-400 hover:text-white">Marketing Digital</Link></li>
              <li><Link href="/catalog?category=diseno" className="text-gray-400 hover:text-white">Diseño UX/UI</Link></li>
              <li><Link href="/catalog?category=negocios" className="text-gray-400 hover:text-white">Negocios</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Nosotros</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contacto</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white">Trabaja con nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Términos y Condiciones</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Impulso. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
