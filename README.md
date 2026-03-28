# Índice Nueve — Directorio de Artistas de Cómic Costarricense

Un directorio abierto y comunitario de artistas costarricenses de cómics, ilustración y narrativa gráfica. El proyecto busca centralizar información dispersa en redes sociales, portafolios y medios, y ponerla a disposición de cualquier persona interesada en la escena del cómic tico.

---

## El proyecto

Costa Rica cuenta con una escena sorprendente: artistas como Dan Mora (DC Comics, BOOM! Studios), John Timms (Harley Quinn, DC), Leo Trinidad (bestseller del New York Times) y Kath Lobo trabajan para las editoriales más grandes del mundo. A nivel nacional existe una comunidad activa de fanzines, webcomics y novela gráfica que rara vez reciben visibilidad.

**ÍNDICE NUEVE** nace para llenar ese vacío documental.

---

## Características

- Búsqueda full-text local con [Lunr.js](https://lunrjs.com/) — sin servidor, funciona sin conexión una vez cargada la página
- Filtros por rol, nivel de experiencia y género
- Modo claro y oscuro
- Estadísticas del índice con Chart.js
- Dataset abierto en JSON, pensado para ser reutilizado
- Despliegue estático en GitHub Pages (Next.js `output: 'export'`)

---

## Estructura de datos

El dataset vive en `public/data/comic_artist_index.json`. Cada artista sigue este esquema mínimo:

```json
{
  "id": "artist_001",
  "name": "Nombre del Artista",
  "location": "Costa Rica",
  "bio": "Descripción breve.",
  "roles": ["dibujante", "ilustrador"],
  "genres": ["fantasía", "webcomic"],
  "experience_level": "nacional",
  "social_media": {
    "instagram": "@handle"
  },
  "images": {
    "featured": {
      "url": "/images/archivo.jpg",
      "alt": "Descripción de la imagen",
      "format": "jpg"
    }
  },
  "last_updated": "2026-03-26"
}
```

**Campos requeridos:** `id`, `name`, `location`, `bio`, `roles`, `genres`, `experience_level`

**`roles`:** `dibujante` | `ilustrador` | `escritor` | `animador`

**`experience_level`:** `nacional` | `internacional`

El esquema completo está en `public/data/schema.json`.

---

## Contribuir

¿Conoces un artista costarricense de cómics que deba estar en el índice?

1. Abre un [issue en GitHub](https://github.com/Euquimides/indicenueve/issues) con la información del artista
2. O envía directamente un pull request editando `public/data/comic_artist_index.json`

Para agregar una imagen de perfil, incluye el archivo en `public/images/` y referencialo en el campo `images.featured.url` como `/images/nombre_archivo.jpg`. Los artistas sin imagen no se muestran en la grilla principal hasta que se agregue una.

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build estático (genera out/)
npm run build

# Previsualizar el build estático
npm run serve

# Verificar tipos
npm run type-check

# Lint
npm run lint
```

El build corre primero `scripts/build-search-index.js` (genera el índice Lunr en `public/data/`) y luego `next build`. La exportación estática queda en `out/`.

---

## Tecnologías

| Herramienta | Uso |
|---|---|
| [Next.js 14](https://nextjs.org/) | Framework, App Router, exportación estática |
| [TypeScript](https://www.typescriptlang.org/) | Tipado |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos |
| [Lunr.js](https://lunrjs.com/) | Búsqueda full-text en el cliente |
| [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) | Estadísticas |
| [GitHub Pages](https://pages.github.com/) | Hosting |

---

## Licencia

Este proyecto está disponible bajo la licencia **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

Puedes compartir y adaptar el contenido libremente, incluso con fines comerciales, siempre que des crédito adecuado al proyecto.

Más información: [creativecommons.org/licenses/by/4.0](https://creativecommons.org/licenses/by/4.0/)
