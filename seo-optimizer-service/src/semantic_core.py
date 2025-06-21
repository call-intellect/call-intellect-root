import json
import os
from datetime import datetime
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from enum import Enum

class KeywordPriority(Enum):
    """Приоритеты ключевых слов"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class KeywordCluster(Enum):
    """Кластеры семантического ядра"""
    TECHNOLOGY = "technology"  # Технологические термины
    INDUSTRY = "industry"      # Отраслевые термины
    FUNCTIONAL = "functional"  # Функциональные возможности
    PROBLEM = "problem"        # Проблемно-ориентированные
    INTEGRATION = "integration" # Интеграции
    PRICING = "pricing"        # Ценообразование
    ANALYTICS = "analytics"    # Аналитика
    TRAINING = "training"      # Обучение

@dataclass
class Keyword:
    """Модель ключевого слова"""
    id: str
    phrase: str
    cluster: KeywordCluster
    priority: KeywordPriority
    search_volume: Optional[int] = None
    competition: Optional[str] = None
    commercial_intent: Optional[float] = None
    created_at: str = None
    updated_at: str = None
    is_active: bool = True
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now().isoformat()
        if self.updated_at is None:
            self.updated_at = datetime.now().isoformat()

class SemanticCoreManager:
    """Менеджер семантического ядра"""
    
    def __init__(self, data_file: str = "semantic_core.json"):
        self.data_file = data_file
        self.keywords: Dict[str, Keyword] = {}
        self.load_keywords()
    
    def load_keywords(self):
        """Загрузка ключевых слов из файла"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for keyword_data in data.get('keywords', []):
                        keyword = Keyword(
                            id=keyword_data['id'],
                            phrase=keyword_data['phrase'],
                            cluster=KeywordCluster(keyword_data['cluster']),
                            priority=KeywordPriority(keyword_data['priority']),
                            search_volume=keyword_data.get('search_volume'),
                            competition=keyword_data.get('competition'),
                            commercial_intent=keyword_data.get('commercial_intent'),
                            created_at=keyword_data.get('created_at'),
                            updated_at=keyword_data.get('updated_at'),
                            is_active=keyword_data.get('is_active', True)
                        )
                        self.keywords[keyword.id] = keyword
            except Exception as e:
                print(f"Ошибка загрузки семантического ядра: {e}")
    
    def save_keywords(self):
        """Сохранение ключевых слов в файл"""
        data = {
            'keywords': [asdict(keyword) for keyword in self.keywords.values()],
            'last_updated': datetime.now().isoformat()
        }
        with open(self.data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def add_keyword(self, phrase: str, cluster: KeywordCluster = None, 
                   priority: KeywordPriority = None, **kwargs) -> Keyword:
        """Добавление нового ключевого слова с автоматической группировкой и приоритизацией"""
        
        # Генерируем уникальный ID
        keyword_id = self._generate_keyword_id(phrase)
        
        # Автоматическая группировка если не указана
        if cluster is None:
            cluster = self._auto_classify_cluster(phrase)
        
        # Автоматическая приоритизация если не указана
        if priority is None:
            priority = self._auto_prioritize(phrase, cluster)
        
        keyword = Keyword(
            id=keyword_id,
            phrase=phrase.strip(),
            cluster=cluster,
            priority=priority,
            **kwargs
        )
        
        self.keywords[keyword_id] = keyword
        self.save_keywords()
        return keyword
    
    def update_keyword(self, keyword_id: str, **updates) -> Optional[Keyword]:
        """Обновление существующего ключевого слова"""
        if keyword_id not in self.keywords:
            return None
        
        keyword = self.keywords[keyword_id]
        
        # Обновляем поля
        for field, value in updates.items():
            if hasattr(keyword, field):
                if field == 'cluster' and isinstance(value, str):
                    value = KeywordCluster(value)
                elif field == 'priority' and isinstance(value, str):
                    value = KeywordPriority(value)
                setattr(keyword, field, value)
        
        keyword.updated_at = datetime.now().isoformat()
        self.save_keywords()
        return keyword
    
    def delete_keyword(self, keyword_id: str) -> bool:
        """Удаление ключевого слова"""
        if keyword_id in self.keywords:
            del self.keywords[keyword_id]
            self.save_keywords()
            return True
        return False
    
    def get_keyword(self, keyword_id: str) -> Optional[Keyword]:
        """Получение ключевого слова по ID"""
        return self.keywords.get(keyword_id)
    
    def get_keywords_by_cluster(self, cluster: KeywordCluster) -> List[Keyword]:
        """Получение ключевых слов по кластеру"""
        return [kw for kw in self.keywords.values() if kw.cluster == cluster and kw.is_active]
    
    def get_keywords_by_priority(self, priority: KeywordPriority) -> List[Keyword]:
        """Получение ключевых слов по приоритету"""
        return [kw for kw in self.keywords.values() if kw.priority == priority and kw.is_active]
    
    def get_all_keywords(self, active_only: bool = True) -> List[Keyword]:
        """Получение всех ключевых слов"""
        if active_only:
            return [kw for kw in self.keywords.values() if kw.is_active]
        return list(self.keywords.values())
    
    def search_keywords(self, query: str) -> List[Keyword]:
        """Поиск ключевых слов по фразе"""
        query = query.lower()
        return [kw for kw in self.keywords.values() 
                if query in kw.phrase.lower() and kw.is_active]
    
    def get_cluster_statistics(self) -> Dict[str, int]:
        """Статистика по кластерам"""
        stats = {}
        for cluster in KeywordCluster:
            stats[cluster.value] = len(self.get_keywords_by_cluster(cluster))
        return stats
    
    def _generate_keyword_id(self, phrase: str) -> str:
        """Генерация уникального ID для ключевого слова"""
        import hashlib
        base_id = phrase.lower().replace(' ', '_').replace('-', '_')
        # Добавляем хеш для уникальности
        hash_suffix = hashlib.md5(phrase.encode()).hexdigest()[:8]
        return f"{base_id}_{hash_suffix}"
    
    def _auto_classify_cluster(self, phrase: str) -> KeywordCluster:
        """Автоматическая классификация ключевого слова по кластерам"""
        phrase_lower = phrase.lower()
        
        # Технологические термины
        tech_keywords = ['речевая аналитика', 'speech analytics', 'ai', 'искусственный интеллект', 
                        'машинное обучение', 'нейросети', 'транскрибация', 'распознавание речи']
        
        # Отраслевые термины
        industry_keywords = ['колл-центр', 'call center', 'контакт-центр', 'телефония', 
                           'клиентский сервис', 'продажи по телефону']
        
        # Функциональные возможности
        functional_keywords = ['контроль качества', 'мониторинг звонков', 'анализ разговоров',
                             'оценка звонков', 'скрипты продаж', 'обучение менеджеров']
        
        # Проблемно-ориентированные
        problem_keywords = ['низкая конверсия', 'мусорные лиды', 'пропущенные звонки',
                          'текучка менеджеров', 'падение продаж']
        
        # Интеграции
        integration_keywords = ['битрикс24', 'amocrm', 'crm', 'интеграция', 'api', 'webhook']
        
        # Ценообразование
        pricing_keywords = ['цена', 'стоимость', 'тариф', 'расчет', 'бюджет', 'roi']
        
        # Аналитика
        analytics_keywords = ['аналитика', 'отчеты', 'статистика', 'метрики', 'kpi', 'дашборд']
        
        # Обучение
        training_keywords = ['обучение', 'тренинг', 'курсы', 'семинар', 'вебинар', 'консультация']
        
        # Проверяем соответствие кластерам
        if any(keyword in phrase_lower for keyword in tech_keywords):
            return KeywordCluster.TECHNOLOGY
        elif any(keyword in phrase_lower for keyword in industry_keywords):
            return KeywordCluster.INDUSTRY
        elif any(keyword in phrase_lower for keyword in functional_keywords):
            return KeywordCluster.FUNCTIONAL
        elif any(keyword in phrase_lower for keyword in problem_keywords):
            return KeywordCluster.PROBLEM
        elif any(keyword in phrase_lower for keyword in integration_keywords):
            return KeywordCluster.INTEGRATION
        elif any(keyword in phrase_lower for keyword in pricing_keywords):
            return KeywordCluster.PRICING
        elif any(keyword in phrase_lower for keyword in analytics_keywords):
            return KeywordCluster.ANALYTICS
        elif any(keyword in phrase_lower for keyword in training_keywords):
            return KeywordCluster.TRAINING
        else:
            # По умолчанию - функциональный кластер
            return KeywordCluster.FUNCTIONAL
    
    def _auto_prioritize(self, phrase: str, cluster: KeywordCluster) -> KeywordPriority:
        """Автоматическая приоритизация ключевого слова"""
        phrase_lower = phrase.lower()
        
        # Критически важные запросы
        critical_keywords = ['речевая аналитика', 'speech analytics', 'контроль качества звонков',
                           'анализ звонков', 'мониторинг звонков']
        
        # Высокоприоритетные запросы
        high_keywords = ['купить', 'заказать', 'цена', 'стоимость', 'демо', 'презентация',
                        'внедрение', 'интеграция']
        
        # Среднеприоритетные запросы
        medium_keywords = ['как', 'что такое', 'преимущества', 'возможности', 'функции']
        
        # Проверяем длину фразы (более длинные фразы обычно менее приоритетны)
        word_count = len(phrase.split())
        
        if any(keyword in phrase_lower for keyword in critical_keywords):
            return KeywordPriority.CRITICAL
        elif any(keyword in phrase_lower for keyword in high_keywords):
            return KeywordPriority.HIGH
        elif any(keyword in phrase_lower for keyword in medium_keywords) or word_count <= 3:
            return KeywordPriority.MEDIUM
        else:
            return KeywordPriority.LOW

