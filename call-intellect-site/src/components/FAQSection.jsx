import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

const FAQSection = () => {
  const [openItems, setOpenItems] = useState({})

  const faqData = [
    {
      question: "Как работает система контроля качества звонков Call-Intellect?",
      answer: "Call-Intellect использует искусственный интеллект для автоматического анализа 100% телефонных разговоров в режиме реального времени. Система распознает речь, анализирует содержание разговора, оценивает качество работы менеджера и выявляет потребности клиентов."
    },
    {
      question: "Сколько стоит анализ одного звонка?",
      answer: "Стоимость анализа одного звонка составляет около 25 рублей, что в 8 раз дешевле аутсорсинга (~200 руб.) и в 5 раз дешевле штатного сотрудника (~125 руб.). При этом система обрабатывает звонки моментально без ограничений по количеству."
    },
    {
      question: "Какие преимущества у ИИ-анализа перед человеческим контролем?",
      answer: "ИИ-анализ обеспечивает 100% объективность оценки, моментальную обработку любого количества звонков, отсутствие человеческого фактора, круглосуточную работу и детальную аналитику по каждому разговору."
    },
    {
      question: "Можно ли интегрировать Call-Intellect с нашей CRM-системой?",
      answer: "Да, Call-Intellect поддерживает интеграцию с большинством популярных CRM-систем и телефонных платформ. Наши специалисты помогут настроить интеграцию под ваши потребности."
    },
    {
      question: "Как быстро можно запустить систему в работу?",
      answer: "Запуск системы занимает от 1 до 3 рабочих дней в зависимости от сложности интеграции. Мы предоставляем полную техническую поддержку на всех этапах внедрения."
    },
    {
      question: "Безопасны ли наши данные при использовании Call-Intellect?",
      answer: "Да, мы обеспечиваем полную конфиденциальность и безопасность ваших данных. Система работает с соблюдением всех требований по защите персональных данных и коммерческой тайны."
    }
  ]

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section className="py-16 bg-gray-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-gray-600">
            Ответы на популярные вопросы о системе Call-Intellect
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
                {openItems[index] ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600 flex-shrink-0" />
                )}
              </button>
              
              {openItems[index] && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection

