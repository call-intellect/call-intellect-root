import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import { ContactFormProvider } from './contexts/ContactFormContext'
import Home from './pages/Home'
import Sales from './pages/Sales'
import Marketing from './pages/Marketing'
import MarketAnalysis from './pages/MarketAnalysis'
import Blog from './pages/Blog'
import Contacts from './pages/Contacts'
import AdminPanel from './pages/AdminPanel'
import PersonalData from './pages/PersonalData'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ContactFormProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/market-analysis" element={<MarketAnalysis />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/personal-data" element={<PersonalData />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ContactFormProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App

