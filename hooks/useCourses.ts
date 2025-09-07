import { useEffect, useState } from "react";

export function useCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/courses")
      .then(res => res.json())
      .then(setCourses);
  }, []);
  return courses;
}
