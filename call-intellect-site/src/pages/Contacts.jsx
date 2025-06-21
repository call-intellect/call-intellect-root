import { Button } from '@/components/ui/button'
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Contacts = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Контакты Call-Intellect - Свяжитесь с нами для демонстрации"
        description="Готовы ответить на ваши вопросы и провести демонстрацию системы контроля качества звонков. Телефон: +7 (963) 616-50-35, Email: info@call-intellect.ru"
        keywords="контакты Call-Intellect, демонстрация системы, консультация, техподдержка"
        url="https://call-intellect.ru/contacts"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl mb-8">
              Готовы ответить на ваши вопросы и провести демонстрацию
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Оставьте заявку</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Компания
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Название компании"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Сообщение
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Расскажите о ваших потребностях..."
                  />
                </div>
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                  Отправить заявку
                </Button>
                <p className="text-sm text-gray-500">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            </div>

            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Контактная информация</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <a href="tel:+79636165035" className="text-blue-600 hover:underline">
                      +7 (963) 616-50-35
                    </a>
                    <p className="text-gray-600 text-sm">Звонки принимаем с 9:00 до 18:00 МСК</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Мессенджеры</h3>
                    <p className="text-gray-600">Telegram, WhatsApp</p>
                    <p className="text-gray-600 text-sm">Отвечаем в течение 15 минут</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@call-intellect.ru" className="text-blue-600 hover:underline">
                      info@call-intellect.ru
                    </a>
                    <p className="text-gray-600 text-sm">Отвечаем в течение 2 часов</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Время работы</h3>
                    <p className="text-gray-600">Пн-Пт: 9:00 - 18:00 МСК</p>
                    <p className="text-gray-600">Сб-Вс: выходные</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold">Быстрые действия</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Заказать демонстрацию
                  </Button>
                  <Button variant="outline" className="w-full">
                    Скачать презентацию
                  </Button>
                  <Button variant="outline" className="w-full">
                    Рассчитать стоимость
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Как быстро происходит внедрение?</h3>
              <p className="text-gray-600">
                Внедрение занимает всего 1,5 часа. От вас требуется только скачивание виджета в CRM.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Какая стоимость услуг?</h3>
              <p className="text-gray-600">
                Стоимость от 5 рублей за минуту. Точная цена зависит от тарифа и количества менеджеров.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Есть ли техническая поддержка?</h3>
              <p className="text-gray-600">
                Да, мы предоставляем полную техническую поддержку и администрирование личного кабинета.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Можно ли протестировать сервис?</h3>
              <p className="text-gray-600">
                Конечно! Мы предоставляем демонстрацию продукта и возможность протестировать сервис.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contacts

