import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Índice Nueve',
  description: 'Preguntas frecuentes sobre el Índice Nueve de artistas costarricenses de cómics.',
};

const faqs = [
  {
    q: '¿Dónde comprar cómics costarricenses?',
    a: (
      <>
        Dependiendo del artista, podés encontrar sus obras en varios lugares:
        <ul className="mt-3 space-y-2">
          {[
            'Amazon y librerías internacionales para artistas con publicaciones en editoriales globales (DC, BOOM! Studios, etc.).',
            'Librerías especializadas en San José como Librería International o Lehmann.',
            <>En páginas en línea como Avenida Cómic: <a href="https://avenidacomic.com/">https://avenidacomic.com/</a></>,
            'Convenciones y ferias que se realizan periódicamente en el país.',
            'Directamente con los artistas a través de sus perfiles en Instagram, Behance o sus sitios web — muchos venden prints y originales.',
            'Tiendas en línea propias de cada artista o colectivo.',
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-outline-variant shrink-0 mt-1" aria-hidden="true">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: '¿Qué significan los niveles "nacional" e "internacional"?',
    a: (
      <ul className="space-y-3">
        {[
          { level: 'Nacional', desc: 'Reconocidos a nivel costarricense: publicaciones distribuidas en el país, participación en festivales nacionales o cobertura en medios locales.' },
          { level: 'Internacional', desc: 'Con publicaciones o reconocimiento en editoriales y plataformas globales — DC Comics, Marvel, BOOM! Studios, New York Times, entre otras.' },
        ].map(({ level, desc }) => (
          <li key={level} className="flex gap-3">
            <span className="text-[0.6875rem] uppercase tracking-widest text-outline font-extrabold font-label shrink-0 mt-0.5 min-w-[5.5rem]">{level}</span>
            <span>{desc}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    q: '¿Por qué no aparece un artista que conozco?',
    a: 'El índice es mantenido por la comunidad y puede no estar completo. Si conocés a alguien que debería estar, el proceso es simple: abrí un issue en el repositorio de GitHub o enviá un pull request con la información del artista. Puede ser que a la hora de la búsqueda aparezcan artistas listados, dado a que están presentes en el dataset, no obstante se agregan una vez se incluya una imagen de referencia de su trabajo.',
  },
  {
    q: '¿Cómo funciona la búsqueda?',
    a: 'La búsqueda es local — corre en tu dispositivo y no requiere conexión al servidor una vez que la página cargó. Usa Lunr.js para buscar en nombre, biografía, ubicación, roles y géneros. Se activa a partir de 2 caracteres y usa búsqueda por prefijo (escribir "dan" encuentra "Dan Mora"). Los filtros de rol, nivel y género se pueden combinar con la búsqueda de texto.',
  },
  {
    q: '¿Con qué frecuencia se actualiza el índice?',
    a: 'No hay un calendario fijo. El proyecto es de código abierto y se actualiza mediante pull requests de la comunidad. Si encontrás información desactualizada o incorrecta, podés reportarla abriendo un issue en GitHub.',
  },
  {
    q: '¿Qué criterios se usan para incluir artistas?',
    a: 'El índice se enfoca en artistas costarricenses de cómics, incluyendo dibujantes, guionistas, coloristas, entintadores e ilustradores relacionados. Se prioriza la inclusión de artistas con publicaciones sea a nivel nacional o internacional, pero el proyecto es abierto a contribuciones que cumplan con el enfoque temático.',
  },
  {
    q: '¿Puedo usar los datos del índice en mi proyecto?',
    a: 'El proyecto es de código abierto. Revisá el repositorio en GitHub para consultar la licencia vigente antes de reutilizar los datos.',
  },
  {
    q: 'No quiero aparecer en el índice, ¿cómo puedo solicitar la eliminación de mis datos?',
    a: 'Creemos en el derecho a la autodeterminación informativa. Si sos un artista listado y preferís no aparecer, podés solicitar la eliminación de tus datos abriendo un issue en el repositorio de GitHub.',
  },
  {
    q: '¿Cómo puedo contribuir o reportar un error?',
    a: 'Abrí un issue en el repositorio de GitHub del proyecto. Para correcciones de datos, podés enviar un pull request con los cambios directamente en public/data/comic_artist_index.json.',
  },
  {
    q: '¿Puedo sugerir mejoras o nuevas funcionalidades para el sitio?',
    a: '¡Claro! El proyecto es comunitario y siempre estamos abiertos a sugerencias. Abrí un issue en GitHub con tu idea o mejora propuesta.',
  },
  {
    q: '¿Cómo puedo contactar a los artistas listados?',
    a: 'El índice no incluye información de contacto directo para respetar la privacidad de los artistas. Sin embargo, muchos artistas tienen perfiles públicos en redes sociales como Instagram, Twitter o LinkedIn donde comparten su trabajo y pueden ser contactados de manera profesional.',
  },
  {
    q: "Soy artista, quiero cambiar la imagen de referencia que aparece en el índice, ¿cómo lo hago?",
    a: 'La imagen de referencia se actualiza a través de contribuciones en el repositorio de GitHub. Si sos un artista listado y querés cambiar tu imagen, podés abrir un issue o enviar un pull request con la nueva imagen siguiendo la estructura del dataset, ojalá con una imagen de buena calidad que represente tu trabajo.',
  },
  {
    q: 'Cuando sea grande quiero ser como ellos, ¿qué consejos me dan?',
    a: (
      <ul className="space-y-3">
        {[
          'Estudiá y practicá constantemente: el cómic es un arte que requiere dedicación y mejora continua.',
          'Construí tu portafolio: tené ejemplos de tu trabajo que puedas mostrar a editoriales o clientes potenciales.',
          'Participá en la comunidad: asistí a eventos, ferias y convenciones para conectar con otros artistas y profesionales del medio.',
          'Buscá oportunidades de publicación, incluso en plataformas digitales o auto-publicación.',
          'No te desanimes por el rechazo: es parte del proceso. Aprendé de cada experiencia y seguí adelante.',
          'No te compares, sino que encontrá tu voz y estilo únicos. El arte es inspiración y aspiración, no competencia.',
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-outline-variant shrink-0 mt-1" aria-hidden="true">—</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  }
];

export default function FaqPage() {
  return (
    <div className="pt-16 min-h-screen bg-surface">
      <main className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20">

        {/* Header */}
        <header className="mb-10 md:mb-16">
          <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mb-4">
            Preguntas frecuentes
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface leading-tight mb-6">
            FAQ
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed font-body">
            Respuestas a preguntas comunes que puede que tengas...
          </p>
        </header>

        {/* FAQ list */}
        <div className="divide-y divide-outline-variant/20">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-sm font-semibold text-on-surface leading-snug">
                  {q}
                </span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="shrink-0 text-outline transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="pb-6 text-sm text-on-surface-variant leading-relaxed font-body">
                {a}
              </div>
            </details>
          ))}
        </div>

        {/* Footer CTA */}
        <p className="mt-8 md:mt-16 text-sm text-on-surface-variant leading-relaxed font-body border-t border-outline-variant/20 pt-8 md:pt-10">
          ¿Tenés una pregunta que no está aquí?{' '}
          <a
            href="https://github.com/Euquimides/indicenueve/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-comic-red hover:text-on-surface transition-colors underline underline-offset-2"
          >
            Abrí un issue en GitHub →
          </a>
        </p>

      </main>
    </div>
  );
}
