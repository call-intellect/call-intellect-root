import { Button } from '@/components/ui/button'
import { CheckCircle, Users, TrendingUp, Clock, Target, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import FAQSection from '../components/FAQSection'
import ContactForm from '../components/ContactForm'

const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formType, setFormType] = useState('general')

  const openForm = (type) => {
    setFormType(type)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Контроль качества звонков менеджеров - система ИИ для анализов звонков Call-Intellect"
        description="Сервис контроля качества звонков и обучения для отделов продаж, колл-центров и кастдев-команд с помощью полного контроля нейросетей. Гарантия увеличения конверсии продаж."
        keywords="контроль качества звонков, анализ звонков, ИИ для продаж, обучение менеджеров, call-центр, нейросети, конверсия продаж"
        url="https://call-intellect.ru"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Гарантия увеличения конверсии продаж</h1>
              <p className="text-xl mb-4">Сколько клиентов вы еще готовы потерять, чтоб попробовать?</p>
              <h2 className="text-3xl font-bold mb-8">CALL-INTELLECT 🚀</h2>
              <p className="text-lg mb-8">
                Сервис контроля качества звонков и обучения для отделов продаж,
                колл-центров и кастдев-команд с помощью полного контроля нейросетей.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => openForm('excursion')}
                >
                  Хочу на экскурсию
                </Button>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm">
                    Запишись <span className="text-green-400">на экскурсию</span>, покажем как
                    увеличить конверсию в продажах
                  </p>
                  <p className="text-xs mt-2">Не сливай бюджет на лиды!</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/10 p-8 rounded-lg">
                <BarChart3 className="w-64 h-64 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speech Analytics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Речевая аналитика и контроль качества звонков
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Внедряется за 1,5 часа</p>
              <p className="text-sm text-gray-600">От вас — скачивание виджета в CRM</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="font-semibold">Создан на основе нейросетей</p>
              <p className="text-sm text-gray-600">И умнее GPT</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold">В 10 раз дешевле</p>
              <p className="text-sm text-gray-600">Человека</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-2" />
              <p className="font-semibold">Экономит РОПу</p>
              <p className="text-sm text-gray-600">От 10 часов в неделю</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Service Increases Profit */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Как сервис увеличивает прибыль в вашей компании и минимизирует слив заявок?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">01</div>
              <h3 className="font-bold mb-2">Выявление ошибок</h3>
              <p className="text-gray-600">Оценка качества звонков менеджеров по заданным критериям.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">02</div>
              <h3 className="font-bold mb-2">Отчет об ошибках</h3>
              <p className="text-gray-600">Дашборд для РОПа и собственника — отчеты о качестве работы ОП в любой момент.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">03</div>
              <h3 className="font-bold mb-2">Обучение менеджера</h3>
              <p className="text-gray-600">Генерация обучающего материала на основе ошибок каждого менеджера.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-4">04</div>
              <h3 className="font-bold mb-2">Рост конверсии в продажу</h3>
              <p className="text-gray-600">Менеджер улучшает мастерство продаж и коммуникации.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg font-semibold mb-4">Наш сервис контроля единственный обучает менеджеров.</p>
            <p className="text-gray-600 mb-8">
              Все прочие лишь указывают на ошибки и не дают точечных рекомендаций, как нужно было вести коммуникацию.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => openForm('demo')}>Запишитесь на презентацию продукта</Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">1 сервис — 16 выгод для 4 категорий сотрудников</h2>
          <p className="text-xl text-blue-600 font-semibold mb-8">Протестируйте сервис в деле</p>
          <Button size="lg" className="bg-green-500 hover:bg-green-600" onClick={() => openForm('demo')}>Заказать демонстрацию продукта</Button>
        </div>
      </section>

      {/* Functions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12">7 основных функций сервиса по аналитике звонков Call Intellect</h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => openForm('demo')}>Закажите демонстрацию продукта</Button>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Доверьте контроль качества звонков сервису, а не человеку</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-lg">[...]</div>
            <div className="bg-yellow-50 p-6 rounded-lg">[...]</div>
            <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500">[...]</div>
          </div>
          <div className="text-center mt-8"><p className="text-xl font-bold">Сервис дешевле, быстрее, объективней и не ленится обучать менеджеров каждый день.</p></div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">Стоимость услуг сервиса речевой аналитики звонков</h2>
          <p className="text-center text-gray-600 mb-12">Тарифы — платите только за фактически используемые минуты</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">[...]</div>
          <div className="text-center"><Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => openForm('calculate')}>Рассчитаем стоимость ежемесячного использования сервиса</Button></div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Case Studies Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Кейсы по внедрению сервиса ИИ в компании для аналитики звонков</h2>
          <div className="bg-gray-50 p-8 rounded-lg">[...]</div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={closeForm} 
        formType={formType} 
      />
    </div>
  )
}

export default Home
