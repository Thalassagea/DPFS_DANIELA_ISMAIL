import { useEffect, useState } from "react";

export default function TotalProducts() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return <div className="card">Total de Cursos: {count}</div>;
}
