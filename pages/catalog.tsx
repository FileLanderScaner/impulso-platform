import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MainLayout from '../layouts/MainLayout';
import CourseCard from '../components/CourseCard';

export default function CatalogPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allLevels, setAllLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<{category?:string;level?:string;q?:string}>({});

  useEffect(() => { fetchCourses(); }, []);

  async function fetchCourses() {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('id, title, description, category, level, published')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    const list = (data || []);
    setCourses(list);
    setAllCategories(Array.from(new Set(list.map((c:any) => c.category).filter(Boolean))));
    setAllLevels(Array.from(new Set(list.map((c:any) => c.level).filter(Boolean))));
    setLoading(false);
  }

  return (
    <MainLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Catálogo de cursos</h1>
        <p className="text-gray-600 mb-6">Explora cursos certificados de empresas líderes y universidades.</p>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar curso..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
            value={filters.q || ''}
            onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
            value={filters.category || ''}
            onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
          >
            <option value="">Todas las categorías</option>
            {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
            value={filters.level || ''}
            onChange={e => setFilters(f => ({ ...f, level: e.target.value }))}
          >
            <option value="">Todos los niveles</option>
            {allLevels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-12">Cargando cursos...</div>
        ) : courses.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No se encontraron cursos.</div>
        ) : (
          courses
            .filter(c =>
              (!filters.q || c.title.toLowerCase().includes(filters.q.toLowerCase())) &&
              (!filters.category || c.category === filters.category) &&
              (!filters.level || c.level === filters.level)
            )
            .map((c: any) => <CourseCard key={c.id} {...c} />)
        )}
      </div>
    </MainLayout>
  );
}
