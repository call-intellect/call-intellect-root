import { Button } from '@/components/ui/button'
import { Search, Filter, Users, TrendingUp } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Marketing = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Маркетинговая аналитика звонков - Call-Intellect для маркетинга"
        description="Анализируйте качество лидов и потребности клиентов с помощью ИИ. Автоматическая сегментация клиентов, оценка качества лидов, оптимизация рекламных кампаний."
        keywords="маркетинговая аналитика, качество лидов, сегментация клиентов, анализ потребностей, оптимизация рекламы"
        url="https://call-intellect.ru/marketing"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Маркетинговая аналитика звонков
            </h1>
            <p className="text-xl mb-8">
              Анализируйте качество лидов и потребности клиентов с помощью ИИ
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Получить маркетинговую аналитику
            </Button>
          </div>
        </div>
      </section>

      {/* Marketing Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Преимущества для маркетинга
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Search className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Анализ потребностей</h3>
              <p className="text-gray-600">
                Выявление реальных потребностей клиентов из разговоров с менеджерами
              </p>
            </div>
            <div className="text-center">
              <Filter className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Качество лидов</h3>
              <p className="text-gray-600">
                Оценка качества лидов на основе анализа первичных звонков
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Сегментация</h3>
              <p className="text-gray-600">
                Автоматическая сегментация клиентов по потребностям и возражениям
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Оптимизация</h3>
              <p className="text-gray-600">
                Данные для оптимизации рекламных кампаний и улучшения таргетинга
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Quality Analysis */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Анализ качества лидов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Что анализирует система:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold">Готовность к покупке</h4>
                    <p className="text-gray-600">Определение уровня заинтересованности клиента</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold">Бюджет клиента</h4>
                    <p className="text-gray-600">Анализ платежеспособности и готовности инвестировать</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold">Соответствие ЦА</h4>
                    <p className="text-gray-600">Проверка соответствия клиента целевой аудитории</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 mt-1">4</div>
                  <div>
                    <h4 className="font-semibold">Источник трафика</h4>
                    <p className="text-gray-600">Эффективность различных каналов привлечения</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-4">Результат анализа:</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Высокое качество</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Среднее качество</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Низкое качество</span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Insights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Инсайты о клиентах
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Основные потребности</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Автоматизация процессов</li>
                <li>• Контроль качества</li>
                <li>• Экономия времени</li>
                <li>• Увеличение прибыли</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Частые возражения</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Высокая стоимость</li>
                <li>• Сложность внедрения</li>
                <li>• Недоверие к ИИ</li>
                <li>• Нехватка времени</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Триггеры покупки</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Быстрая окупаемость</li>
                <li>• Простота использования</li>
                <li>• Гарантии результата</li>
                <li>• Техподдержка</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Получите маркетинговые инсайты
          </h2>
          <p className="text-xl mb-8">
            Узнайте больше о ваших клиентах и оптимизируйте маркетинговые кампании
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Заказать анализ
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Marketing

