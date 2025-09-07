import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/hero-illustration.svg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white p-4">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold mb-4" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          Impulsa tu carrera con <span className="text-primary">cursos certificados</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Aprende habilidades demandadas, obtén certificaciones y accede a una comunidad global de aprendizaje.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/login" className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-lg">Comienza ahora</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
