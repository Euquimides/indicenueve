import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Premios Figueroa — Comic CR Index',
  description: 'Los Premios Figueroa a lo Mejor del Cómic Nacional, celebración que reconoce el talento destacado del cómic costarricense.',
};

const awards = [
  'Mejor portada',
  'Mejor edición',
  'Mejor artista',
  'Mejor guión',
  'Mejor cómic infantil/juvenil',
  'Mejor trabajo en humor gráfico',
  'Mejor serie',
  'Mejor webcómic',
  'Trayectoria profesional',
  'Aporte al medio',
  'Mejor cómic del año',
];

const editions = [
  {
    year: 2024,
    location: 'Auditorio Cora Ferro, de la UNA',
    event: 'Feria Internacional del Libro Universitario (FILU)',
  },
  {
    year: 2025,
    location: 'Teatro 1887, en el CENAC',
    event: 'Actividades del Día Nacional de la Historieta Costarricense (Septiembre)',
  },
];

export default function PremiosFigueroaPage() {
  return (
    <div className="pt-16 min-h-screen bg-surface">
      <main className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20">

        {/* Header */}
        <header className="mb-10 md:mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/premios-figueroa/Premios_Figueroa_LOGO.png"
              alt="Premios Figueroa Logo"
              width={180}
              height={220}
              priority
              className="object-contain"
            />
          </div>
          <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mb-4">
            Reconocimiento nacional
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface leading-tight mb-6">
            Premios Figueroa
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed font-body">
            Los Premios Figueroa a lo Mejor del Cómic Nacional, una celebración que reúne a los talentos más destacados del cómic costarricense con el motivo de reconocer su labor durante el año.
          </p>
        </header>

        {/* Content sections */}
        <div className="space-y-12 md:space-y-16">

          {/* Homenaje */}
          <section>
            <h2 className="text-base font-semibold text-on-surface mb-4">
              Un homenaje al pionero
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body">
              El nombre honra la trayectoria e impacto en el medio de <strong>Carlos Enrique Figueroa</strong>, 
              creador de <em>Tricolín</em> y pionero en la creación de revistas de historietas en Costa Rica. 
              Su legado continúa inspirando a las nuevas generaciones de creadores costarricenses.
            </p>
          </section>

          {/* Ediciones */}
          <section>
            <h2 className="text-base font-semibold text-on-surface mb-6">
              Ediciones celebradas
            </h2>
            <div className="space-y-5">
              {editions.map(({ year, location, event }) => (
                <div key={year} className="border-l-2 border-outline-variant/40 pl-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label">
                      Edición {year}
                    </p>
                    <p className="text-sm font-semibold text-on-surface">
                      {location}
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                      {event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categorías */}
          <section className="border-t border-outline-variant/20 pt-10">
            <h2 className="text-base font-semibold text-on-surface mb-6">
              Categorías de premios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {awards.map((award) => (
                <div
                  key={award}
                  className="bg-surface-container-low border border-outline-variant/20 px-4 py-3 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <p className="text-sm text-on-surface leading-snug">
                    {award}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* About the project */}
          <section className="border-t border-outline-variant/20 pt-10">
            <h2 className="text-base font-semibold text-on-surface mb-4">
              Sobre los premios
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body">
              Los Premios Figueroa son un espacio de celebración y reconocimiento para los artistas que 
              conforman la vibrante escena del cómic costarricense. Cada edición reúne a autores, editores 
              y profesionales del medio en torno a la valoración de las obras más destacadas del año.
            </p>
          </section>

        </div>

      </main>
    </div>
  );
}
