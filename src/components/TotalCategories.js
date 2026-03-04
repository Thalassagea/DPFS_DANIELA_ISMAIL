import { useState, useEffect } from "react";

export default function TotalCategories() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses")
      .then(res => res.json())
      .then(data => setTotal(Object.keys(data.countByCategory).length));
  }, []);

  return <div className="card">Categorías: {total}</div>;
}
