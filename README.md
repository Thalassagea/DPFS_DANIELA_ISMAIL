# E-commerce de cursos sobre salud mental
# Descripción del sitio

MindCare es un e-commerce dedicado a ofrecer cursos online sobre salud mental, dictados por psicólogos y profesionales especializados en distintas áreas del bienestar emocional. Los usuarios podrán acceder a contenidos enfocados en temáticas como el manejo de la ansiedad, autoestima, habilidades sociales, estrés laboral, mindfulness, y más.

Todos los cursos estarán disponibles en modalidad asincrónica (grabados) o sincrónica (en vivo), con acceso desde cualquier dispositivo.

# Público objetivo

Este sitio está orientado a personas mayores de 18 años, estudiantes, trabajadores y profesionales que buscan mejorar su salud mental y emocional. También apunta a instituciones o empresas interesadas en ofrecer este beneficio a sus empleados.

# Sobre mí

Mi nombre es Daniela Ismail. Soy estudiante de desarrollo web con una fuerte vocación por el diseño centrado en el usuario (UX/UI) y un interés especial en crear soluciones tecnológicas con impacto positivo.

Me entusiasma especialmente este proyecto porque combina dos áreas que me apasionan: la tecnología y el bienestar emocional. Mi objetivo es construir una plataforma accesible, funcional y estéticamente atractiva que facilite el acceso a herramientas de salud mental.

## Sitios de referencia

- **DailyOM** : Cursos introspectivos con enfoque holístico y modelo de precios "paga lo que puedas".
- **Coursera – The Science of Well‑Being** : Curso académico con respaldo científico, impartido por la Universidad de Yale, disponible de forma gratuita (con opción de certificado).
- **Mindvalley** : Plataforma de bienestar con diseño moderno, contenido interactivo y enfoque en el desarrollo personal integral.
- **Insight Timer** : App con variedad de formatos (cursos, meditaciones, eventos), muy accesible y versátil.
- **Unmind** : Plataforma corporativa enfocada en mental-health training para empresas; utiliza coaching conversacional con IA, recursos científicos y acceso a terapeutas, ideal para inspirarse en un enfoque B2B (Business to Business). 

## Retrospectiva Sprints
Para ver el análisis de la retrospectiva de los sprints, consultar el archivo [retro.md](./retro.md).

## Cómo ejecutar el proyecto

### Backend (API + EJS)
1. Abrir una terminal (Símbolo del sistema).
2. Ejecutar:

```
cd C:\Users\thala\Desktop\PROYECTO_FINAL\DPFS_DANIELA_ISMAIL
npm install
node app.js
```

El servidor quedará disponible en `http://localhost:3000`.

### Dashboard (React)
1. Abrir otra terminal.
2. Ejecutar:

```
cd C:\Users\thala\Desktop\PROYECTO_FINAL\dashboard
npm install
npm run dev
```

El dashboard quedará disponible en `http://localhost:5173`.

## Endpoints API

### Usuarios
- `GET /api/users`
  - Devuelve `count`, `next`, `previous`, `users[]` con `id`, `name`, `email`, `detail`.
- `GET /api/users/:id`
  - Devuelve todos los campos del usuario + `imageURL` sin datos sensibles.

### Productos/Cursos
- `GET /api/products` (alias requerido por consigna)
  - Devuelve `count`, `countByCategory`, `products[]`, `next`, `previous`.
- `GET /api/products/:id`
  - Devuelve todos los campos + relaciones y `imageURL`.

### Paginado
- `GET /api/products?page=1&limit=10`
- `GET /api/users?page=1&limit=10`

## Tablero de trabajo

El seguimiento del sprint  se puede visualizar a través del siguiente tablero en Trello:

https://trello.com/invite/b/68d5062f6ecd480dbcaff708/ATTI858a6b83c4c6f85ae69529b06b83162047773EB9/mindcare-sprints
