
export default function Events({ language }) {
  const linkClass =
    'flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 sm:px-5 py-3 text-sm sm:text-lg font-medium transition hover:border-[#9e353a] hover:bg-[#9e353a] hover:text-white min-w-0 max-w-full'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-10 py-16 max-w-5xl mx-auto">
      {/* Venstre kort: My Pages */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm text-center min-w-0">
        <h2 className="text-3xl font-bold mb-2">
          {language === 'no' ? 'Mine sider' : 'My Pages'}
        </h2>
        <div className="mx-auto mb-6 h-1 w-12 rounded bg-[#9e353a]" />

        <div className="flex flex-col gap-3">
          <a
            href="https://github.com/eolivermoland-lang"
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            <span className="shrink-0">🐙</span> GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/oliver-moland-eyde-5a9ab23aa/"
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            <span className="shrink-0">💼</span> LinkedIn
          </a>
        </div>
      </div>

      {/* Høyre kort: Contact me */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm text-center min-w-0">
        <h2 className="text-3xl font-bold mb-2">
          {language === 'no' ? 'Kontakt meg' : 'Contact me'}
        </h2>
        <div className="mx-auto mb-6 h-1 w-12 rounded bg-[#9e353a]" />

        <div className="flex flex-col gap-3">
          <a
            href="mailto:olivermolandeyde@hotmail.com"
            className={linkClass}
          >
            <span className="shrink-0">✉️</span>
            <span className="min-w-0 break-all">
              olivermolandeyde@hotmail.com
            </span>
          </a>

          <a
            href="tel:+4741445959"
            className={linkClass}
          >
            <span className="shrink-0">📞</span>
            +47 41 44 59 59
          </a>
        </div>
      </div>
    </div>
  )
}
