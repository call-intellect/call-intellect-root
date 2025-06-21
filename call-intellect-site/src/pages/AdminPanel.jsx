import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, FileText, Settings, Monitor, CheckCircle, AlertCircle, Clock, Hash, Plus, Edit, Trash2, Search, Filter, BarChart3 } from 'lucide-react'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('upload')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const [articles, setArticles] = useState([])
  
  // Состояние для семантического ядра
  const [keywords, setKeywords] = useState([])
  const [keywordStats, setKeywordStats] = useState({})
  const [selectedCluster, setSelectedCluster] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddKeywordForm, setShowAddKeywordForm] = useState(false)
  const [editingKeyword, setEditingKeyword] = useState(null)
  
  // Состояние формы загрузки
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    slug: '',
    keywords: '',
    image: null
  })

  // Состояние формы ключевого слова
  const [keywordFormData, setKeywordFormData] = useState({
    phrase: '',
    cluster: '',
    priority: '',
    search_volume: '',
    competition: '',
    commercial_intent: ''
  })

  // Состояние массовой загрузки
  const [bulkKeywords, setBulkKeywords] = useState('')

  // Проверка статуса микросервиса
  const [serviceStatus, setServiceStatus] = useState('unknown')

  useEffect(() => {
    checkServiceHealth()
    if (activeTab === 'semantic') {
      loadKeywords()
      loadKeywordStats()
    }
    // eslint-disable-next-line
  }, [activeTab])

  // Применение фильтров
  useEffect(() => {
    if (activeTab === 'semantic') {
      loadKeywords()
    }
    // eslint-disable-next-line
  }, [selectedCluster, selectedPriority, searchQuery])

  const checkServiceHealth = async () => {
    try {
      const response = await fetch('http://213.108.199.149:8080/api/seo/health')
      if (response.ok) {
        setServiceStatus('healthy')
      } else {
        setServiceStatus('error')
      }
    } catch (error) {
      setServiceStatus('offline')
    }
  }

  const showMessage = (text, type = 'info') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 5000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('slug', formData.slug)
      formDataToSend.append('keywords', formData.keywords)
      
      if (formData.image) {
        formDataToSend.append('image', formData.image)
      }

      const response = await fetch('http://213.108.199.149:8080/api/seo/optimize-article', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (response.ok) {
        showMessage('Статья успешно оптимизирована и добавлена!', 'success')
        setFormData({
          title: '',
          content: '',
          slug: '',
          keywords: '',
          image: null
        })
        // Сброс файла
        const fileInput = document.getElementById('image-upload')
        if (fileInput) fileInput.value = ''
      } else {
        showMessage(result.error || 'Ошибка при обработке статьи', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом оптимизации', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const startFolderMonitoring = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://213.108.199.149:8080/api/seo/monitor-folder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder_path: '/tmp/articles'
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        showMessage(`Мониторинг завершен. Обработано: ${result.results.length} файлов`, 'success')
      } else {
        showMessage(result.error || 'Ошибка мониторинга', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const scheduleMonitoring = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://213.108.199.149:8080/api/seo/schedule-monitoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder_path: '/tmp/articles',
          interval_hours: 24
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        showMessage('Автоматический мониторинг настроен (каждые 24 часа)', 'success')
      } else {
        showMessage(result.error || 'Ошибка настройки мониторинга', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (serviceStatus) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'offline':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (serviceStatus) {
      case 'healthy':
        return 'Сервис работает'
      case 'error':
        return 'Ошибка сервиса'
      case 'offline':
        return 'Сервис недоступен'
      default:
        return 'Проверка...'
    }
  }

  // Функции для работы с семантическим ядром
  const loadKeywords = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCluster) params.append('cluster', selectedCluster)
      if (selectedPriority) params.append('priority', selectedPriority)
      if (searchQuery) params.append('search', searchQuery)
      
      const response = await fetch(`http://213.108.199.149:8080/api/semantic/keywords?${params}`)
      const result = await response.json()
      
      if (response.ok) {
        setKeywords(result.keywords)
      } else {
        showMessage(result.error || 'Ошибка загрузки ключевых слов', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    }
  }

  const loadKeywordStats = async () => {
    try {
      const response = await fetch('http://213.108.199.149:8080/api/semantic/keywords/statistics')
      const result = await response.json()
      
      if (response.ok) {
        setKeywordStats(result)
      }
    } catch (error) {
      console.error('Ошибка загрузки статистики:', error)
    }
  }

  const handleKeywordFormChange = (e) => {
    const { name, value } = e.target
    setKeywordFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddKeyword = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const dataToSend = {
        phrase: keywordFormData.phrase,
        ...(keywordFormData.cluster && { cluster: keywordFormData.cluster }),
        ...(keywordFormData.priority && { priority: keywordFormData.priority }),
        ...(keywordFormData.search_volume && { search_volume: parseInt(keywordFormData.search_volume) }),
        ...(keywordFormData.competition && { competition: keywordFormData.competition }),
        ...(keywordFormData.commercial_intent && { commercial_intent: parseFloat(keywordFormData.commercial_intent) })
      }

      const response = await fetch('http://213.108.199.149:8080/api/semantic/keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })

      const result = await response.json()

      if (response.ok) {
        showMessage('Ключевое слово успешно добавлено!', 'success')
        setKeywordFormData({
          phrase: '',
          cluster: '',
          priority: '',
          search_volume: '',
          competition: '',
          commercial_intent: ''
        })
        setShowAddKeywordForm(false)
        loadKeywords()
        loadKeywordStats()
      } else {
        showMessage(result.error || 'Ошибка добавления ключевого слова', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBulkAdd = async () => {
    if (!bulkKeywords.trim()) {
      showMessage('Введите ключевые слова для массового добавления', 'error')
      return
    }

    setIsLoading(true)

    try {
      const keywordsList = bulkKeywords
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)

      const response = await fetch('http://213.108.199.149:8080/api/semantic/keywords/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: keywordsList
        })
      })

      const result = await response.json()

      if (response.ok) {
        showMessage(`Добавлено: ${result.added}, Ошибок: ${result.errors}`, 'success')
        setBulkKeywords('')
        loadKeywords()
        loadKeywordStats()
      } else {
        showMessage(result.error || 'Ошибка массового добавления', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditKeyword = (keyword) => {
    setEditingKeyword(keyword)
    setKeywordFormData({
      phrase: keyword.phrase,
      cluster: keyword.cluster,
      priority: keyword.priority,
      search_volume: keyword.search_volume || '',
      competition: keyword.competition || '',
      commercial_intent: keyword.commercial_intent || ''
    })
    setShowAddKeywordForm(true)
  }

  const handleUpdateKeyword = async (e) => {
    e.preventDefault()
    if (!editingKeyword) return

    setIsLoading(true)

    try {
      const dataToSend = {
        phrase: keywordFormData.phrase,
        cluster: keywordFormData.cluster,
        priority: keywordFormData.priority,
        ...(keywordFormData.search_volume && { search_volume: parseInt(keywordFormData.search_volume) }),
        ...(keywordFormData.competition && { competition: keywordFormData.competition }),
        ...(keywordFormData.commercial_intent && { commercial_intent: parseFloat(keywordFormData.commercial_intent) })
      }

      const response = await fetch(`http://213.108.199.149:8080/api/semantic/keywords/${editingKeyword.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })

      const result = await response.json()

      if (response.ok) {
        showMessage('Ключевое слово успешно обновлено!', 'success')
        setKeywordFormData({
          phrase: '',
          cluster: '',
          priority: '',
          search_volume: '',
          competition: '',
          commercial_intent: ''
        })
        setShowAddKeywordForm(false)
        setEditingKeyword(null)
        loadKeywords()
        loadKeywordStats()
      } else {
        showMessage(result.error || 'Ошибка обновления ключевого слова', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteKeyword = async (keywordId) => {
    if (!window.confirm('Вы уверены, что хотите удалить это ключевое слово?')) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`http://213.108.199.149:8080/api/semantic/keywords/${keywordId}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (response.ok) {
        showMessage('Ключевое слово успешно удалено!', 'success')
        loadKeywords()
        loadKeywordStats()
      } else {
        showMessage(result.error || 'Ошибка удаления ключевого слова', 'error')
      }
    } catch (error) {
      showMessage('Ошибка соединения с сервисом', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getClusterColor = (cluster) => {
    const colors = {
      technology: 'text-blue-600 bg-blue-100',
      industry: 'text-purple-600 bg-purple-100',
      functional: 'text-green-600 bg-green-100',
      problem: 'text-red-600 bg-red-100',
      integration: 'text-indigo-600 bg-indigo-100',
      pricing: 'text-yellow-600 bg-yellow-100',
      analytics: 'text-pink-600 bg-pink-100',
      training: 'text-teal-600 bg-teal-100'
    }
    return colors[cluster] || 'text-gray-600 bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Админ-панель SEO/GEO оптимизации
              </h1>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="text-sm text-gray-600">{getStatusText()}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={checkServiceHealth}
                >
                  Обновить
                </Button>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mx-6 mt-4 p-4 rounded-lg ${
              messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
              messageType === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
              'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              {message}
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Загрузка статьи
              </button>
              <button
                onClick={() => setActiveTab('semantic')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'semantic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Hash className="w-4 h-4 inline mr-2" />
                Семантическое ядро
              </button>
              <button
                onClick={() => setActiveTab('monitoring')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'monitoring'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Monitor className="w-4 h-4 inline mr-2" />
                Мониторинг
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Настройки
              </button>
            </nav>
          </div>

          {/* Content */}
          {/* ...оставь все внутренние рендеры, формы и таблицы как у тебя было... */}
          {/* см. твой предыдущий return, ты всё можешь оставить без изменений */}
          {/* если что-то еще понадобится - пиши! */}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
