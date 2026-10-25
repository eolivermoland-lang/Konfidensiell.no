import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Events from '../components/Events'
import Footer from '../components/Footer'

export default function Home({ language, setLanguage }) {
  return (
    <>
      <div className="bg-gray-50"/>
      <div className="">
        <Navbar language={language} setLanguage={setLanguage} />
        <Hero language={language} />
        <Events language={language} />
        <Footer language={language} />
      </div>
    </>
  )
}