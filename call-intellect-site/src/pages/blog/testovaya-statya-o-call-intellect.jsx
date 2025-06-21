import { Button } from '@/components/ui/button'
import SEOHead from '../../components/SEOHead'

const TestovayastatyaocallintellectArticle = () => {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Тестовая статья о Call-Intellect",
    "description": "Это тестовая статья для проверки работы микросервиса SEO/GEO оптимизации. Call-Intellect - это инновационная система для анализа качества звонков с помощью иску",
    "author": {
        "@type": "Person",
        "name": "Call-Intellect"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Call-Intellect"
    },
    "datePublished": "2025-06-21T00:07:53.535162",
    "dateModified": "2025-06-21T00:07:53.535170"
}

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Тестовая статья о Call-Intellect"
        description="Это тестовая статья для проверки работы микросервиса SEO/GEO оптимизации. Call-Intellect - это инновационная система для анализа качества звонков с помощью иску..."
        keywords="call-intellect, анализ звонков, ИИ, качество обслуживания"
        url="https://call-intellect.ru/blog/testovaya-statya-o-call-intellect"
      />
      
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Тестовая статья о Call-Intellect
            </h1>
            <div className="text-gray-600 mb-6">
              <time dateTime="2025-06-21T00:07:53.535265">
                21.06.2025
              </time>
            </div>
            
          </header>
          
          <div className="prose prose-lg max-w-none">
            Это тестовая статья для проверки работы микросервиса SEO/GEO оптимизации. Call-Intellect - это инновационная система для анализа качества звонков с помощью искусственного интеллекта.
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Узнать больше о Call-Intellect
            </Button>
          </div>
        </div>
      </article>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaOrg)
      }} />
    </div>
  )
}

export default TestovayastatyaocallintellectArticle
