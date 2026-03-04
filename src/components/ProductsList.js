import { useEffect, useState } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then(res => res.json())
      .then(data => setProducts(data.courses));
  }, []);

  return (
    <div className="card">
      <h3>Listado de Cursos</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
