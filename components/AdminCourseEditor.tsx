import React, { useState, useEffect } from 'react';

interface Course {
  id?: string;
  title: string;
  category?: string;
  level?: string;
  description?: string;
  published?: boolean;
  cover_image_url?: string;
}

interface CourseFormProps {
  course?: Course;
  onSave: (course: Course) => void;
  onCancel?: () => void;
}

export default function CourseForm({ course, onSave, onCancel }: CourseFormProps) {
  const [title, setTitle] = useState(course?.title || '');
  const [category, setCategory] = useState(course?.category || '');
  const [level, setLevel] = useState(course?.level || '');
  const [description, setDescription] = useState(course?.description || '');
  const [published, setPublished] = useState(course?.published || false);
  const [coverImageUrl, setCoverImageUrl] = useState(course?.cover_image_url || '');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setCategory(course.category || '');
      setLevel(course.level || '');
      setDescription(course.description || '');
      setPublished(course.published || false);
      setCoverImageUrl(course.cover_image_url || '');
    }
  }, [course]);

  function handleSave() {
    onSave({
      id: course?.id,
      title,
      category,
      level,
      description,
      cover_image_url: coverImageUrl,
      published,
    });
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    const file = e.target.files[0];
    // Aquí iría la lógica de subida a tu storage
    setTimeout(() => {
      setCoverImageUrl(URL.createObjectURL(file)); // Demo: URL temporal
      setIsUploading(false);
    }, 1000);
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="Categoría" value={category} onChange={e => setCategory(e.target.value)} />
        <input type="text" placeholder="Nivel" value={level} onChange={e => setLevel(e.target.value)} />
        <textarea placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
          style={{ marginTop: 8 }}
        />
        {isUploading && <p>Subiendo imagen...</p>}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem' }}>
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
          />
          <label htmlFor="published">Publicar curso</label>
        </div>

        <button onClick={handleSave} disabled={isUploading} style={{ marginTop: '1rem' }}>
          Guardar
        </button>
        {onCancel && (
          <button onClick={onCancel} style={{ marginTop: 8 }}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
