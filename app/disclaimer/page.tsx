import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aviso Legal — Índice Nueve',
  description: 'Aviso legal, descargo de responsabilidad y política de privacidad del Índice Nueve.',
};

const sections = [
  {
    title: 'Naturaleza del proyecto',
    body: <><strong>ÍNDICE NUEVE</strong> es un proyecto de documentación cultural sin fines de lucro, mantenido por la comunidad. No es una publicación oficial ni representa a ninguna editorial, organización o institución. La información contenida en el índice es recopilada de fuentes públicas con el propósito de preservar y difundir el patrimonio del cómic costarricense.</>,
  },
  {
    title: 'Exactitud de la información',
    body: 'La información sobre los artistas es aportada por la comunidad y puede estar incompleta, desactualizada o contener inexactitudes. El proyecto no garantiza la exactitud, integridad ni vigencia de los datos. Si encuentras información incorrecta sobre tu perfil o el de otro artista, puedes reportarla abriendo un issue en el repositorio de GitHub.',
  },
  {
    title: 'Imágenes y derechos de autor',
    body: 'Las imágenes utilizadas en los perfiles de artistas son propiedad de sus respectivos autores o titulares de derechos. Su uso en este sitio es exclusivamente con fines de identificación y referencia cultural, sin ánimo de lucro. Si eres titular de derechos sobre alguna imagen y quieres que sea retirada, contactanos a través del repositorio de GitHub.',
  },
  {
    title: 'Derecho al olvido',
    body: 'Si eres un artista listado en el índice y prefieres no aparecer, tienes derecho a solicitar la eliminación de tu información. Para ello, abre un issue en el repositorio de GitHub indicando tu nombre y la solicitud de eliminación. Procesaremos la solicitud a la brevedad posible.',
  },
  {
    title: 'Privacidad',
    body: 'Este sitio no recopila datos personales de los visitantes, no utiliza cookies de seguimiento y no integra servicios de analítica de terceros. Toda la búsqueda y filtrado se ejecuta localmente en tu dispositivo. No se transmiten datos de uso a ningún servidor.',
  },
  {
    title: 'Licencia del contenido',
    body: 'El contenido del proyecto (código fuente y datos) está disponible bajo la licencia Creative Commons Attribution 4.0 International (CC BY 4.0). Podés compartir y adaptar el material libremente, incluso con fines comerciales, siempre que des crédito adecuado al proyecto Índice Nueve.',
  },
  {
    title: 'Exención de responsabilidad',
    body: 'El proyecto no se hace responsable por el contenido de los sitios web, redes sociales o portafolios externos enlazados desde los perfiles de artistas. Los enlaces a terceros se ofrecen únicamente como referencia y no implican respaldo ni afiliación.',
  },
  {
    title: 'Cambios a este aviso',
    body: 'Este aviso legal puede actualizarse en cualquier momento sin previo aviso. La versión vigente siempre estará disponible en esta página. Los cambios se reflejan en el historial de commits del repositorio de GitHub.',
  },
];

export default function DisclaimerPage() {
  return (
    <div className="pt-16 min-h-screen bg-surface">
      <main className="max-w-[720px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20">

        <header className="mb-10 md:mb-16">
          <p className="text-[0.6875rem] uppercase tracking-widest text-outline font-label mb-4">
            Aviso legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface leading-tight mb-6">
            Disclaimer
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed font-body">
            Información legal sobre el uso del sitio, los datos publicados y los derechos de los artistas listados.
          </p>
        </header>

        <div className="divide-y divide-outline-variant/20">
          {sections.map(({ title, body }) => (
            <div key={title} className="py-8">
              <h2 className="text-sm font-semibold text-on-surface mb-3">{title}</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t border-outline-variant/20">
          <p className="text-sm text-on-surface-variant leading-relaxed font-body">
            Para consultas, solicitudes de eliminación o reportes de contenido incorrecto:{' '}
            <a
              href="https://github.com/Euquimides/indicenueve/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-comic-red hover:text-on-surface transition-colors underline underline-offset-2"
            >
              abrí un issue en GitHub →
            </a>
          </p>
        </div>

      </main>
    </div>
  );
}
