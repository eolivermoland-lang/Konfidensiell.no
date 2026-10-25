import forsecImg from '../assets/forsec.jpg'
import bubblegumImg from '../assets/bubblegum.jpg'
import jobotImg from '../assets/jobot.jpg'

export default function Projects({ language }) {
  const no = language === 'no'

  const projects = [
    {
      image: forsecImg,
      status: no ? 'Ferdig' : 'Completed',
      title: no ? 'ForSec AS – nettside' : 'ForSec AS – website',
      description: no
        ? 'Nettside for ForSec AS, et norsk cybersikkerhetsselskap som er spesialister på blue team. Jeg bygde den i løpet av de fire månedene jeg jobbet der. Siden er flerspråklig, har lys og mørk modus, kundeportal-innlogging, blogg med 16 artikler og tag-filter, kontaktskjema og FAQ. Designet følger U.S. Web Design System, og siden er optimalisert for SEO og tilgjengelighet.'
        : 'Website for ForSec AS, a Norwegian cybersecurity company specialising in blue team work. I built it during the four months I worked there. The site is bilingual, with light and dark mode, a customer portal login, a blog with 16 articles and tag filtering, a contact form and an FAQ. The design follows the U.S. Web Design System, and the site is optimised for SEO and accessibility.',
      tech: ['HTML', 'CSS', 'JavaScript', 'USWDS', 'SEO'],
      links: [
        { label: no ? 'Se live' : 'View live', url: 'https://forsec.eolivermoland.workers.dev' },
        { label: 'GitHub', url: 'https://github.com/eolivermoland-lang/forsec' },
      ],
    },
    {
      image: bubblegumImg,
      status: no ? 'Ferdig' : 'Completed',
      title: 'BubbleBubbleGum',
      description: no
        ? 'En nettapplikasjon bygget med React 19, Vite og Tailwind CSS. Den har flere sider med React Router, animasjoner med Framer Motion, Firebase som backend og PayPal for betaling.'
        : 'A web application built with React 19, Vite and Tailwind CSS. It has multiple pages with React Router, animations with Framer Motion, Firebase as the backend and PayPal for payments.',
      tech: ['React', 'Vite', 'Tailwind', 'Firebase', 'PayPal', 'Framer Motion'],
      links: [
        { label: no ? 'Se live' : 'View live', url: 'https://bubble-bubble-gum.vercel.app' },
        { label: 'GitHub', url: 'https://github.com/eolivermoland-lang/BubbleBubbleGum' },
      ],
    },
    {
      image: jobotImg,
      status: no ? 'Pågår' : 'In progress',
      title: no ? 'Robothund med AI' : 'AI Robot Dog',
      description: no
        ? 'Et pågående prosjekt vi har jobbet med i to uker: en robothund styrt av en Raspberry Pi. Vi har koblet på ChatGPT, slik at hunden skal kunne gå rundt, snakke og svare når man snakker til den. Den drives av 12 servoer, to powerbanks og et servo-kontrollkort. Skjelettet har vi designet selv fra bunnen av, med litt inspirasjon fra andre, og 3D-printer selv.'
        : 'An ongoing project we have worked on for two weeks: a robot dog controlled by a Raspberry Pi. We have integrated ChatGPT so the dog can walk around, talk and respond when you speak to it. It runs on 12 servos, two power banks and a servo controller board. We designed the skeleton from scratch, with some inspiration from others, and 3D print it ourselves.',
      tech: ['Raspberry Pi', 'Python', 'ChatGPT', '3D-printing', 'Servoer'],
      links: [
        {
          label: no ? 'Følg oppdateringer på LinkedIn' : 'Follow updates on LinkedIn',
          url: 'https://www.linkedin.com/in/oliver-moland-eyde-5a9ab23aa/',
        },
      ],
    },
  ]

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        {no ? 'Prosjekter' : 'Projects'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            {project.image ? (
              <div className="flex h-56 w-full items-center justify-center bg-gray-100 p-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full rounded-lg object-contain"
                />
              </div>
            ) : (
              <div className="flex h-56 w-full items-center justify-center bg-gray-200 text-gray-500">
                {no ? 'Bilde kommer' : 'Image coming soon'}
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {project.status}
                </span>
              </div>

              <p className="mb-4 text-gray-700 leading-relaxed">
                {project.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition hover:border-[#9e353a] hover:bg-[#9e353a] hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}