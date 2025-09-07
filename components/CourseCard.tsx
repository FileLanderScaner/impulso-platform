import React from "react";

type Props = {
  title: string;
  description?: string;
  category?: string;
  level?: string;
};

export default function CourseCard({ title, description, category, level }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-indigo-700">{title}</h3>
      {description && <p className="text-gray-600 text-sm">{description}</p>}
      <div className="flex gap-2 mt-2">
        {category && <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">{category}</span>}
        {level && <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{level}</span>}
      </div>
    </div>
  );
}
