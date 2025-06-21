import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xl">CI</span>
              </div>
              <span className="text-lg font-semibold">Call-Intellect</span>
            </div>
            <p className="text-gray-300 mb-4">
              Сервис контроля качества звонков и обучения для отделов продаж, 
              колл-центров и кастдев-команд с помощью полного контроля нейросетей.
            </p>
            <div className="flex items-center space-x-4">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <Phone className="w-5 h-5 text-green-500" />
              <Mail className="w-5 h-5 text-green-500" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Главная</Link></li>
              <li><Link to="/sales" className="text-gray-300 hover:text-white transition-colors">Продажи</Link></li>
              <li><Link to="/marketing" className="text-gray-300 hover:text-white transition-colors">Маркетинг</Link></li>
              <li><Link to="/market-analysis" className="text-gray-300 hover:text-white transition-colors">Анализ рынка</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Блог</Link></li>
              <li><Link to="/contacts" className="text-gray-300 hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-2">
              <a href="tel:+79636165035" className="block text-gray-300 hover:text-white transition-colors">
                +7 (963) 616-50-35
              </a>
              <p className="text-gray-300">
                Запишитесь на презентацию продукта
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Call-Intellect. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

