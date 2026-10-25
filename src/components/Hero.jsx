import image from '../assets/image.jpg'

export default function Hero({ language }) {
  return (
    <div className="p-10 pt-20 flex flex-col md:flex-row items-center gap-10 border-b border-gray-300">
      <img
        src={image}
        alt="Hero"
        className="w-64 h-64 rounded-full object-cover shrink-0"
      />
      <div>
        {language === 'no' && (
          <p className="text-lg leading-relaxed max-w-2xl">
            Hei! Jeg heter Oliver Moland Eyde, er 17 år og går på Tangen videregående skole.
            Jeg brenner for utvikling og bruker mye av fritiden på å programmere.
            Jeg er åpen for både softwareutvikling og fullstack-utvikling, og hovedfokuset mitt er webutvikling.
            Gjennom egne prosjekter og praktisk erfaring har jeg bygget nettsider og lært mye underveis.
            Til daglig jobber jeg med HTML, CSS, JavaScript og Python, og jeg er særlig trygg på React, Tailwind og Vite.
            Jeg har også kunnskap om MySQL, NoSQL og Git.
            Jeg slutter aldri å lære, og er nå i gang med å lære TypeScript og Next.js.
          </p>
        )}
        {language === 'en' && (
          <p className="text-lg leading-relaxed max-w-2xl">
            Hi! I’m Oliver Moland Eyde, a 17-year-old student at Tangen Upper Secondary School.
            I’m passionate about development and spend much of my free time programming.
            I’m open to both software development and full-stack development, and my main focus is web development.
            Through my own projects and hands-on experience, I’ve built websites and learned a great deal along the way.
            Day to day, I work with HTML, CSS, JavaScript and Python, and I’m especially comfortable with React, Tailwind and Vite.
            I also have experience with MySQL, NoSQL and Git.
            I never stop learning, and I’m currently picking up TypeScript and Next.js.
          </p>
        )}
      </div>
    </div>
  )
}