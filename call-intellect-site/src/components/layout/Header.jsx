import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'Продажи', href: '/sales' },
    { name: 'Маркетинг', href: '/marketing' },
    { name: 'Анализ рынка', href: '/market-analysis' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' }
  ]

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">CI</span>
            </div>
            <span className="hidden md:block text-sm">
              Сервис контроля качества звонков<br />
              для отделов продаж, колл-центров и кастдев-команд.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm hover:text-blue-200 transition-colors ${
                  location.pathname === item.href ? 'text-blue-200' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <Phone className="w-5 h-5" />
            </div>
            <a href="tel:+79636165035" className="text-sm hover:text-blue-200">
              +7 (963) 616-50-35
            </a>
            <Button variant="outline" className="text-blue-600 border-white hover:bg-white">
              Заказать звонок
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-500">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-2 text-sm hover:text-blue-200 transition-colors ${
                    location.pathname === item.href ? 'text-blue-200' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-blue-500">
                <a href="tel:+79636165035" className="block py-2 text-sm">
                  +7 (963) 616-50-35
                </a>
                <Button variant="outline" className="mt-2 text-blue-600 border-white hover:bg-white">
                  Заказать звонок
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

