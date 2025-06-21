import { Button } from '@/components/ui/button'
import { TrendingUp, Users, Target, BarChart3 } from 'lucide-react'
import SEOHead from '../components/SEOHead'

const Sales = () => {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Увеличьте продажи с помощью ИИ - Call-Intellect для отдела продаж"
        description="Контроль качества звонков и обучение менеджеров для роста конверсии. Автоматический анализ разговоров, персональные рекомендации, объективная оценка работы."
        keywords="увеличение продаж, обучение менеджеров, контроль качества звонков, конверсия продаж, ИИ для продаж"
        url="https://call-intellect.ru/sales"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Увеличьте продажи с помощью ИИ
            </h1>
            <p className="text-xl mb-8">
              Контроль качества звонков и обучение менеджеров для роста конверсии
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Получить демо для отдела продаж
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits for Sales */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Преимущества для отдела продаж
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Рост конверсии</h3>
              <p className="text-gray-600">
                Увеличение конверсии звонков в продажи благодаря выявлению и устранению ошибок
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Обучение команды</h3>
              <p className="text-gray-600">
                Персональные рекомендации для каждого менеджера на основе анализа его звонков
              </p>
            </div>
            <div className="text-center">
              <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Точная оценка</h3>
              <p className="text-gray-600">
                Объективная оценка качества работы каждого менеджера по заданным критериям
              </p>
            </div>
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Аналитика</h3>
              <p className="text-gray-600">
                Детальная аналитика по каждому звонку и общая статистика по отделу
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Как происходит обучение менеджеров
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-4">1</div>
              <h3 className="font-bold mb-2">Анализ звонков</h3>
              <p className="text-gray-600">
                ИИ анализирует каждый звонок менеджера и выявляет ошибки в коммуникации
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-4">2</div>
              <h3 className="font-bold mb-2">Генерация рекомендаций</h3>
              <p className="text-gray-600">
                Система создает персональные рекомендации для улучшения техники продаж
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-4">3</div>
              <h3 className="font-bold mb-2">Постоянное развитие</h3>
              <p className="text-gray-600">
                Менеджер получает обратную связь после каждого звонка и постоянно совершенствуется
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Готовы увеличить продажи?
          </h2>
          <p className="text-xl mb-8">
            Запишитесь на демонстрацию и узнайте, как Call-Intellect поможет вашему отделу продаж
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
            Заказать демонстрацию
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Sales

