import Navbar from '../components/Navbar'
import Projects from '../components/projects'
import Footer from '../components/Footer'

export default function Proskjekter({ language, setLanguage }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="flex-1">
        <Projects language={language} />
      </main>
      <Footer language={language} />
    </div>
  )
}