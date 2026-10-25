export default function Footer({ language }) {
  return (
    <footer className="bg-[#9e353a] text-white">
      <div className="max-w-5xl mx-auto px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <p>
          © {new Date().getFullYear()} Oliver Moland Eyde.{' '}
          {language === 'no' ? 'Alle rettigheter reservert.' : 'All rights reserved.'}
        </p>

        <div className="flex gap-5">
          <a
            href="https://github.com/eolivermoland-lang"
            target="_blank"
            rel="noreferrer"
            className="underline hover:opacity-80"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/oliver-moland-eyde-5a9ab23aa/"
            target="_blank"
            rel="noreferrer"
            className="underline hover:opacity-80"
          >
            LinkedIn
          </a>
          <a href="mailto:olivermolandeyde@hotmail.com" className="underline hover:opacity-80">
            {language === 'no' ? 'E-post' : 'Email'}
          </a>
        </div>
      </div>
    </footer>
  )
}