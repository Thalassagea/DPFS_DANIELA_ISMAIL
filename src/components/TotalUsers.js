import { useEffect, useState } from "react";

export default function TotalUsers() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(data => setCount(data.count));
  }, []);

  return <div className="card">Total de Usuarios: {count}</div>;
}
