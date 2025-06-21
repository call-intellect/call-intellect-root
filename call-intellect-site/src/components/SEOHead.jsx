import { Helmet } from 'react-helmet-async'

const SEOHead = ({ 
  title = "Контроль качества звонков менеджеров - система ИИ для анализов звонков Call-Intellect",
  description = "Сервис контроля качества звонков и обучения для отделов продаж, колл-центров и кастдев-команд с помощью полного контроля нейросетей.",
  keywords = "контроль качества звонков, анализ звонков, ИИ для продаж, обучение менеджеров, call-центр, нейросети, речевая аналитика, speech analytics, оценка звонков, проверка звонков менеджеров, чек-лист звонка, сервис оценки разговоров, аналитика телефонных разговоров, AI анализ звонков, распознавание речи звонков, транскрибация звонков, перевод звонков в текст, нейросеть для анализа речи, оценка качества лидов, классификация лидов, квалификация лидов по звонку, определение целевых лидов, нецелевые заявки, мусорные лиды, анализ потребностей клиентов, выявление потребностей по звонкам, что хочет клиент по разговору, pain points клиентов, какой продукт нужен клиенту, сегментация клиентов, автоматическая сегментация звонков, тегирование клиентов по нуждам, сегменты по возражениям, распределение лидов по сегментам, сегментация рынка, аналитика звонков для маркетинга, улучшение таргетинга, ROI рекламы, анализ рынка, выявление трендов рынка, ИИ анализ рынка, big data звонки, прогноз спроса, прогноз поведения клиентов, рыночные инсайты, анализ конкурентов, цены конкурентов в разговорах, слабые места конкурентов, benchmark звонков, повышение конверсии, увеличить конверсию отдела продаж, ошибки менеджеров при звонках, как поднять LTV, оптимизация воронки звонков, обучение менеджеров по звонкам, персональные рекомендации менеджеру, оценка работы менеджеров, рейтинг менеджеров, разбор звонков учеба, улучшение скриптов продаж, речевая аналитика Битрикс24, анализ звонков amoCRM, интеграция speech analytics в CRM, плагин речевой аналитики, речевая аналитика цена, контроль звонков стоимость, SaaS анализ звонков тарифы, сколько стоит speech analytics, лицензия speech analytics, цена на транскрибацию звонков, много мусорных лидов, низкая конверсия звонков, пропущенные звонки проблемы, текучка менеджеров продаж, нет прозрачной аналитики звонков, как снизить LTV падение, конфликт отделов маркетинг продажи, примеры чек-листа звонка, 10 ошибок менеджера в разговоре, как сегментировать лидов автоматически, кейс роста конверсии с речевой аналитикой",
  url = "https://call-intellect.ru",
  type = "website",
  geoRegion = "RU",
  geoPlacename = "Россия",
  geoPosition = "55.7558;37.6176" // Москва
}) => {
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Call-Intellect",
    "description": "Сервис контроля качества звонков и обучения для отделов продаж с помощью ИИ. Речевая аналитика, анализ звонков, оценка работы менеджеров, повышение конверсии продаж.",
    "url": "https://call-intellect.ru",
    "logo": "https://call-intellect.ru/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-963-616-50-35",
      "contactType": "customer service",
      "availableLanguage": "Russian",
      "areaServed": "RU"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressRegion": "Россия"
    },
    "sameAs": [
      "https://call-intellect.ru"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Россия"
    },
    "knowsAbout": [
      "контроль качества звонков",
      "речевая аналитика",
      "speech analytics",
      "анализ звонков",
      "оценка звонков",
      "AI анализ звонков",
      "транскрибация звонков",
      "распознавание речи",
      "анализ потребностей клиентов",
      "сегментация клиентов",
      "повышение конверсии",
      "обучение менеджеров",
      "оценка работы менеджеров",
      "анализ рынка",
      "big data звонки",
      "интеграция с CRM"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Call-Intellect",
    "url": "https://call-intellect.ru",
    "description": "Система ИИ для анализа и контроля качества звонков менеджеров. Речевая аналитика, транскрибация звонков, анализ потребностей клиентов, повышение конверсии продаж.",
    "publisher": {
      "@type": "Organization",
      "name": "Call-Intellect"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://call-intellect.ru/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "ru-RU",
    "about": [
      "контроль качества звонков",
      "речевая аналитика",
      "анализ звонков",
      "оценка звонков менеджеров",
      "AI анализ звонков",
      "транскрибация звонков",
      "анализ потребностей клиентов",
      "повышение конверсии продаж"
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Контроль качества звонков с помощью ИИ",
    "description": "Автоматический анализ и оценка качества телефонных разговоров менеджеров с использованием искусственного интеллекта. Речевая аналитика, транскрибация звонков, анализ потребностей клиентов, сегментация лидов, повышение конверсии продаж.",
    "provider": {
      "@type": "Organization",
      "name": "Call-Intellect"
    },
    "serviceType": "AI-powered call quality control and speech analytics",
    "areaServed": {
      "@type": "Country",
      "name": "Россия"
    },
    "availableLanguage": "ru",
    "category": [
      "речевая аналитика",
      "speech analytics",
      "контроль качества звонков",
      "анализ звонков",
      "AI анализ звонков",
      "транскрибация звонков",
      "анализ потребностей клиентов",
      "сегментация клиентов",
      "повышение конверсии",
      "обучение менеджеров"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Услуги контроля качества звонков",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Анализ звонков для отдела продаж",
            "description": "Контроль качества звонков, оценка работы менеджеров, повышение конверсии продаж"
          },
          "areaServed": "RU"
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Маркетинговая аналитика звонков",
            "description": "Анализ качества лидов, классификация лидов, сегментация клиентов, анализ потребностей"
          },
          "areaServed": "RU"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Анализ рынка через звонки",
            "description": "Выявление трендов рынка, анализ конкурентов, рыночные инсайты, прогноз поведения клиентов"
          },
          "areaServed": "RU"
        }
      ]
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Call-Intellect",
    "description": "Сервис контроля качества звонков и обучения для отделов продаж с помощью ИИ. Речевая аналитика, speech analytics, анализ звонков, транскрибация звонков, анализ потребностей клиентов.",
    "url": "https://call-intellect.ru",
    "telephone": "+7-963-616-50-35",
    "email": "info@call-intellect.ru",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressRegion": "Россия"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "55.7558",
      "longitude": "37.6176"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Россия"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "25 руб. за звонок",
    "knowsAbout": [
      "контроль качества звонков",
      "речевая аналитика",
      "speech analytics",
      "анализ звонков",
      "оценка звонков",
      "проверка звонков менеджеров",
      "чек-лист звонка",
      "сервис оценки разговоров",
      "аналитика телефонных разговоров",
      "AI анализ звонков",
      "распознавание речи звонков",
      "транскрибация звонков",
      "перевод звонков в текст",
      "нейросеть для анализа речи",
      "оценка качества лидов",
      "классификация лидов",
      "квалификация лидов по звонку",
      "определение целевых лидов",
      "анализ потребностей клиентов",
      "выявление потребностей по звонкам",
      "сегментация клиентов",
      "автоматическая сегментация звонков",
      "повышение конверсии",
      "увеличить конверсию отдела продаж",
      "обучение менеджеров по звонкам",
      "оценка работы менеджеров",
      "анализ рынка",
      "ИИ анализ рынка",
      "big data звонки",
      "речевая аналитика Битрикс24",
      "анализ звонков amoCRM",
      "интеграция speech analytics в CRM"
    ]
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Call-Intellect",
    "description": "AI-платформа для контроля качества звонков, речевой аналитики и анализа телефонных разговоров. Автоматическая транскрибация звонков, анализ потребностей клиентов, сегментация лидов.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web-based",
    "offers": {
      "@type": "Offer",
      "price": "25",
      "priceCurrency": "RUB",
      "description": "Стоимость за анализ одного звонка"
    },
    "featureList": [
      "контроль качества звонков",
      "речевая аналитика",
      "speech analytics",
      "анализ звонков",
      "оценка звонков",
      "транскрибация звонков",
      "распознавание речи",
      "AI анализ звонков",
      "анализ потребностей клиентов",
      "сегментация клиентов",
      "классификация лидов",
      "повышение конверсии",
      "обучение менеджеров",
      "оценка работы менеджеров",
      "анализ рынка",
      "интеграция с CRM",
      "автоматическая сегментация звонков",
      "выявление потребностей по звонкам",
      "анализ конкурентов",
      "рыночные инсайты"
    ]
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Call-Intellect" />
      <meta name="language" content="ru" />
      
      {/* Geo-targeting meta tags */}
      <meta name="geo.region" content={geoRegion} />
      <meta name="geo.placename" content={geoPlacename} />
      <meta name="geo.position" content={geoPosition} />
      <meta name="ICBM" content={geoPosition} />
      
      {/* GEO (Generative Engine Optimization) specific meta tags */}
      <meta name="ai-content-declaration" content="This content is optimized for AI language models and generative search engines" />
      <meta name="llm-training-data" content="Call-Intellect provides AI-powered call quality control, speech analytics, call transcription, customer needs analysis, lead segmentation, and sales conversion optimization services" />
      <meta name="generative-ai-keywords" content="контроль качества звонков, речевая аналитика, speech analytics, анализ звонков, AI анализ звонков, транскрибация звонков, анализ потребностей клиентов, сегментация клиентов, повышение конверсии, обучение менеджеров" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Call-Intellect" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:country-name" content="Russia" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="ru" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareApplicationSchema)}
      </script>
    </Helmet>
  )
}

export default SEOHead

