import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de — Comic CR Index',
  description: 'Sobre el proyecto Comic CR Index y su misión de documentar la escena del cómic costarricense.',
};

export default function AcercaDePage() {
  return (
    <div className="pt-16 min-h-screen bg-surface">
      <main className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20">

        {/* Header */}
        <header className="mb-10 md:mb-16">
          <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mb-4">
            Sobre el proyecto
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface leading-tight mb-6">
            Centralizando el talento del cómic tico
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed font-body">
            Costa Rica ha forjado una escena sorprendente, con más de 40 artistas
            documentados, inclusive trabajando para editoriales globales como DC Comics y BOOM! Studios.
            Sin embargo, la información vive dispersa en internet, entre redes sociales, entrevistas y portafolios personales, lo que dificulta descubrir y apreciar la riqueza de nuestra producción nacional.
          </p>
        </header>

        {/* Sections */}
        <div className="space-y-10 md:space-y-16">

          {/* Impacto global */}
          <section>
            <h2 className="text-base font-semibold text-on-surface mb-6">
              Impacto global
            </h2>
            <ul className="space-y-4">
              {[
                'Varios artistas costarricenses producen para las editoriales más grandes del mundo.',
                'Dan Mora es uno de los dibujantes más cotizados del planeta y candidato al Eisner Award 2024.',
                'John Timms fue el primer costarricense en trabajar regularmente para DC y Marvel.',
                'Leo Trinidad es bestseller del New York Times con trabajo para DreamWorks y Cartoon Network.',
              ].map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="text-outline-variant shrink-0 mt-1" aria-hidden="true">—</span>
                  <span className="text-sm text-on-surface-variant leading-relaxed font-body">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Objetivo */}
          <section>
            <h2 className="text-base font-semibold text-on-surface mb-4">
              Objetivo del repositorio
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body mb-4">
              <strong>ÍNDICE NUEVE</strong> nace de una necesidad como consumidor y fan del cómic, que quiere conocer el talento existente en el país. Con este mapeo, en un dataset abierto y gratuito, se pretende llenar un vacío documental crítico dentro de la historia del arte secuencial costarricense.
            </p>

            <p className="text-sm text-on-surface-variant leading-relaxed font-body mb-4">
              Este proyecto utiliza <strong className="font-semibold text-on-surface">Lunr.js</strong> para
              ofrecer búsqueda full-text que permita descubrir y preservar la producción nacional,
              llenando un vacío documental crítico en la historia del cómic costarricense.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body">
              Es un proyecto de código abierto y comunitario. ¿Conoces un artista que deba estar aquí?{' '}
              <a
                href="https://github.com/Euquimides/indicenueve"
                target="_blank"
                rel="noopener noreferrer"
                className="text-comic-red hover:text-on-surface transition-colors underline underline-offset-2"
              >
                Contribuye en GitHub →
              </a>
            </p>
          </section>

          {/* Cómo aparecer */}
          <section className="border-t border-outline-variant/20 pt-10">
            <h2 className="text-base font-semibold text-on-surface mb-6">
              ¿Cómo aparecer en el índice?
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body mb-6">
              Si eres artista costarricense de cómics o conocés a alguien que debería estar en el
              directorio, puedes contribuir de la siguiente manera:
            </p>
            <ol className="space-y-4">
              {[
                'Abre un issue en el repositorio de GitHub.',
                'Completa la información del artista según el esquema de datos.',
                <>
                  Envía un pull request con la actualización en{' '}
                  <code className="text-[0.8em] bg-surface-container px-1.5 py-0.5 rounded font-mono">
                    public/data/comic_artist_index.json
                  </code>
                  .
                </>,
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[0.6875rem] uppercase tracking-widest text-outline font-extrabold font-label shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="text-sm text-on-surface-variant leading-relaxed font-body">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

        </div>
      </main>
    </div>
  );
}
