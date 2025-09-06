import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import CourseCard from '../components/CourseCard';
import CourseFilters from '../components/CourseFilters';

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

  const filtered = courses.filter((c:any) => {
    if (filters.category && c.category !== filters.category) return false;
    if (filters.level && c.level !== filters.level) return false;
    if (filters.q) {
      const q = filters.q.toLowerCase();
      if (!((c.title || '').toLowerCase().includes(q) || (c.description||'').toLowerCase().includes(q))) return false;
    }
    return true;
  });

  return (
    <div style={{padding:24}}>
      <h1>Catálogo de cursos</h1>
      <CourseFilters categories={allCategories} levels={allLevels} onChange={(f) => setFilters(prev => ({...prev,...f}))} />
      {loading ? <div>Cargando...</div> : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16}}>
          {filtered.map((c:any) => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </div>
  );
}
