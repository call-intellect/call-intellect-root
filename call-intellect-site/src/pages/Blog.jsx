import { Button } from '@/components/ui/button'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { useContactForm } from '../contexts/ContactFormContext'

const Blog = () => {
  const { openForm } = useContactForm()
  const blogPosts = [
    {
      id: 1,
      title: "Как ИИ революционизирует контроль качества звонков",
      excerpt: "Узнайте, как искусственный интеллект меняет подход к анализу телефонных разговоров и обучению менеджеров.",
      date: "15 июня 2024",
      author: "Команда Call-Intellect"
    },
    {
      id: 2,
      title: "5 ошибок менеджеров, которые убивают продажи",
      excerpt: "Разбираем самые частые ошибки в телефонных продажах и способы их устранения с помощью ИИ-анализа.",
      date: "10 июня 2024",
      author: "Эксперт по продажам"
    },
    {
      id: 3,
      title: "ROI от внедрения речевой аналитики: реальные цифры",
      excerpt: "Конкретные примеры окупаемости инвестиций в системы анализа звонков на основе данных наших клиентов.",
      date: "5 июня 2024",
      author: "Аналитик данных"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Блог Call-Intellect
            </h1>
            <p className="text-xl mb-8">
              Экспертные статьи о речевой аналитике, продажах и ИИ
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" className="group">
                    Читать далее
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Подпишитесь на наши обновления
          </h2>
          <p className="text-xl mb-8">
            Получайте новые статьи и экспертные материалы о речевой аналитике
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <Button
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => openForm('general')}
            >
              Подписаться
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Категории статей
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Речевая аналитика</h3>
              <p className="text-gray-600 text-sm">Технологии и методы анализа звонков</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Продажи</h3>
              <p className="text-gray-600 text-sm">Техники и стратегии продаж</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Искусственный интеллект</h3>
              <p className="text-gray-600 text-sm">ИИ в бизнесе и автоматизации</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition-shadow">
              <h3 className="font-bold mb-2">Кейсы клиентов</h3>
              <p className="text-gray-600 text-sm">Реальные истории успеха</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog

