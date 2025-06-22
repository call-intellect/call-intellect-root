import { Button } from '@/components/ui/button'
import { BarChart3, PieChart, TrendingUp, Database } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useContactForm } from '../contexts/ContactFormContext'

const MarketAnalysis = () => {
  const { openForm } = useContactForm()
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Анализ рынка через звонки - Call-Intellect для исследования рынка"
        description="Выявляйте потребности и возражения клиентов, анализируйте данные о рынке через разговоры с менеджерами. Детальная аналитика по каждому звонку и общая статистика."
        keywords="анализ рынка, исследование рынка, потребности клиентов, возражения клиентов, аналитика звонков"
        url="https://call-intellect.ru/market-analysis"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Анализ рынка с помощью ИИ
            </h1>
            <p className="text-xl mb-8">
              Получайте глубокие инсайты о рынке на основе анализа звонков
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-100"
              onClick={() => openForm('general')}
            >
              Получить анализ рынка
            </Button>
          </div>
        </div>
      </section>

      {/* Market Analysis Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Возможности анализа рынка
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Тренды рынка</h3>
              <p className="text-gray-600">
                Выявление трендов и изменений в потребностях клиентов
              </p>
            </div>
            <div className="text-center">
              <PieChart className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Сегментация</h3>
              <p className="text-gray-600">
                Автоматическая сегментация рынка по различным критериям
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Прогнозы</h3>
              <p className="text-gray-600">
                Прогнозирование спроса и поведения клиентов
              </p>
            </div>
            <div className="text-center">
              <Database className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Big Data</h3>
              <p className="text-gray-600">
                Анализ больших объемов данных для получения инсайтов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Рыночные инсайты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Анализ конкурентов</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Ценовая политика</h4>
                  <p className="text-gray-600">Анализ упоминаний цен конкурентов в разговорах</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Преимущества</h4>
                  <p className="text-gray-600">Выявление сильных сторон конкурентов</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Слабые места</h4>
                  <p className="text-gray-600">Обнаружение проблем у конкурентов</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Потребности рынка</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Новые потребности</h4>
                  <p className="text-gray-600">Выявление новых потребностей клиентов</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Неудовлетворенный спрос</h4>
                  <p className="text-gray-600">Поиск ниш с неудовлетворенным спросом</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">Болевые точки</h4>
                  <p className="text-gray-600">Анализ основных проблем клиентов</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Visualization */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Визуализация данных
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <BarChart3 className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Дашборды</h3>
              <p className="text-gray-600">
                Интерактивные дашборды с ключевыми метриками рынка
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <PieChart className="w-24 h-24 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Отчеты</h3>
              <p className="text-gray-600">
                Автоматические отчеты с анализом рыночных тенденций
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <TrendingUp className="w-24 h-24 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Прогнозы</h3>
              <p className="text-gray-600">
                Графики прогнозов развития рынка и спроса
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Применение анализа рынка
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Для стратегического планирования</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Разработка продуктовой стратегии</li>
                <li>• Планирование маркетинговых кампаний</li>
                <li>• Выбор целевых сегментов</li>
                <li>• Ценообразование</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Для операционной деятельности</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Обучение менеджеров</li>
                <li>• Улучшение скриптов продаж</li>
                <li>• Работа с возражениями</li>
                <li>• Повышение конверсии</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Получите анализ вашего рынка
          </h2>
          <p className="text-xl mb-8">
            Узнайте больше о вашем рынке и получите конкурентные преимущества
          </p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100"
            onClick={() => openForm('general')}
          >
            Заказать анализ рынка
          </Button>
        </div>
      </section>
    </div>
  )
}

export default MarketAnalysis

