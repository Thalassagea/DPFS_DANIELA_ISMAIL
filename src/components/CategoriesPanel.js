import { useEffect, useState } from "react";

export default function CategoriesPanel() {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then(res => res.json())
      .then(data => setCategories(data.countByCategory));
  }, []);

  return (
    <div className="card">
      <h3>Categorías</h3>
      <ul>
        {Object.entries(categories).map(([cat, qty]) => (
          <li key={cat}>{cat}: {qty}</li>
        ))}
      </ul>
    </div>
  );
}
