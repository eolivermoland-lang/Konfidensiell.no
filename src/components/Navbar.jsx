import { useState } from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="h-10 w-10">
      <rect width="100" height="100" rx="22" fill="#ffffff" />
      <circle cx="50" cy="50" r="25" stroke="#9e353a" strokeWidth="10" />
    </svg>
  );
}

export default function Navbar({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-50 bg-[#ab2e34] text-[#f5f5f5] p-3 shadow-sm flex items-center gap-4 sticky top-0">
      <Link to="/" className="flex items-center gap-3 font-serif font-bold text-3xl text-[#f5f5f5]">
        <Logo />
        OliverMoland
      </Link>

      {/* pc menu */}
      <div className="hidden md:flex ml-auto font-extrabold gap-2 text-lg">
        <Link to="/" className="p-2 hover:text-yellow-600 duration-100">{language === 'no' ? 'Hjem' : 'Home'}</Link>
        <Link to="/proskjekter" className="p-2 hover:text-yellow-600 duration-100">{language === 'no' ? 'Prosjekter' : 'Projects'}</Link>
      </div>

      <button onClick={() => setLanguage(language === 'no' ? 'en' : 'no')} className="font-bold border border-[#f5f5f5] rounded px-3 py-1 ml-auto md:ml-0">
        {language === 'no' ? 'EN' : 'NO'}
      </button>

      {/* mobile menu button */}
      <button className="md:hidden p-2 text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      {/* mobilmeny */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#ab2e34] underline flex flex-row gap-1 pb-3 pt-2 text-xl font-extrabold">
          <Link to="/" onClick={() => setIsOpen(false)} className="p-2 hover:text-yellow-600 duration-100">{language === 'no' ? 'Hjem' : 'Home'}</Link>
          <Link to="/proskjekter" onClick={() => setIsOpen(false)} className="p-2 hover:text-yellow-600 duration-100">{language === 'no' ? 'Prosjekter' : 'Projects'}</Link>
        </div>
      )}
    </nav>
  );
}