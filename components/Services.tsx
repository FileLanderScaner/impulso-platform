import React from 'react';
import { Award, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Award size={40} className="text-primary" />,
    title: 'Certificados Oficiales',
    desc: 'Obtén certificados reconocidos por empresas y universidades.'
  },
  {
    icon: <Users size={40} className="text-primary" />,
    title: 'Comunidad Activa',
    desc: 'Aprende junto a miles de estudiantes y expertos.'
  },
  {
    icon: <MessageSquare size={40} className="text-primary" />,
    title: 'Mentores y Soporte',
    desc: 'Accede a mentores y soporte personalizado en tu aprendizaje.'
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Por qué elegir Impulso</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Te ofrecemos todo lo que necesitas para tener éxito en tu carrera profesional.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-500">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
