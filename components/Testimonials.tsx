import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Ana García',
    role: 'Desarrolladora Frontend',
    comment: 'Los cursos de Impulso me ayudaron a conseguir el trabajo de mis sueños. La calidad del contenido es increíble.',
    avatar: '/avatars/ana.jpg'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Manager de Producto',
    comment: 'Gracias a la formación en gestión de proyectos, he podido liderar equipos más eficientes y conseguir mejores resultados.',
    avatar: '/avatars/carlos.jpg'
  },
  {
    name: 'Laura Martínez',
    role: 'Diseñadora UX/UI',
    comment: 'La comunidad y los mentores son lo mejor de Impulso. Siempre hay alguien dispuesto a ayudarte a crecer.',
    avatar: '/avatars/laura.jpg'
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Lo que dicen nuestros estudiantes</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Miles de estudiantes han confiado en nosotros para impulsar su carrera.</p>
        </div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <motion.div 
                className="bg-gray-50 rounded-2xl shadow-lg p-8 text-center h-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary" />
                <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
                <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.role}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
