import os
from flask import Blueprint, request, jsonify
from src.semantic_core import SemanticCoreManager, KeywordCluster, KeywordPriority, Keyword

# Создаем Blueprint для семантического ядра
semantic_bp = Blueprint('semantic', __name__)

# Инициализируем менеджер семантического ядра
semantic_manager = SemanticCoreManager()

@semantic_bp.route('/keywords', methods=['GET'])
def get_keywords():
    """Получение всех ключевых слов с фильтрацией"""
    try:
        # Параметры фильтрации
        cluster = request.args.get('cluster')
        priority = request.args.get('priority')
        search = request.args.get('search')
        active_only = request.args.get('active_only', 'true').lower() == 'true'
        
        # Получаем ключевые слова
        if search:
            keywords = semantic_manager.search_keywords(search)
        elif cluster:
            try:
                cluster_enum = KeywordCluster(cluster)
                keywords = semantic_manager.get_keywords_by_cluster(cluster_enum)
            except ValueError:
                return jsonify({'error': f'Неверный кластер: {cluster}'}), 400
        elif priority:
            try:
                priority_enum = KeywordPriority(priority)
                keywords = semantic_manager.get_keywords_by_priority(priority_enum)
            except ValueError:
                return jsonify({'error': f'Неверный приоритет: {priority}'}), 400
        else:
            keywords = semantic_manager.get_all_keywords(active_only=active_only)
        
        # Преобразуем в словари для JSON
        keywords_data = []
        for keyword in keywords:
            keyword_dict = {
                'id': keyword.id,
                'phrase': keyword.phrase,
                'cluster': keyword.cluster.value,
                'priority': keyword.priority.value,
                'search_volume': keyword.search_volume,
                'competition': keyword.competition,
                'commercial_intent': keyword.commercial_intent,
                'created_at': keyword.created_at,
                'updated_at': keyword.updated_at,
                'is_active': keyword.is_active
            }
            keywords_data.append(keyword_dict)
        
        return jsonify({
            'keywords': keywords_data,
            'total': len(keywords_data),
            'filters': {
                'cluster': cluster,
                'priority': priority,
                'search': search,
                'active_only': active_only
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Ошибка получения ключевых слов: {str(e)}'}), 500

@semantic_bp.route('/keywords', methods=['POST'])
def add_keyword():
    """Добавление нового ключевого слова"""
    try:
        data = request.get_json()
        
        if not data or 'phrase' not in data:
            return jsonify({'error': 'Поле phrase обязательно'}), 400
        
        phrase = data['phrase'].strip()
        if not phrase:
            return jsonify({'error': 'Фраза не может быть пустой'}), 400
        
        # Проверяем, не существует ли уже такая фраза
        existing_keywords = semantic_manager.search_keywords(phrase)
        for existing in existing_keywords:
            if existing.phrase.lower() == phrase.lower():
                return jsonify({'error': 'Ключевое слово уже существует'}), 409
        
        # Получаем дополнительные параметры
        cluster = None
        if 'cluster' in data:
            try:
                cluster = KeywordCluster(data['cluster'])
            except ValueError:
                return jsonify({'error': f'Неверный кластер: {data["cluster"]}'}), 400
        
        priority = None
        if 'priority' in data:
            try:
                priority = KeywordPriority(data['priority'])
            except ValueError:
                return jsonify({'error': f'Неверный приоритет: {data["priority"]}'}), 400
        
        # Дополнительные параметры
        kwargs = {}
        for field in ['search_volume', 'competition', 'commercial_intent']:
            if field in data:
                kwargs[field] = data[field]
        
        # Добавляем ключевое слово
        keyword = semantic_manager.add_keyword(
            phrase=phrase,
            cluster=cluster,
            priority=priority,
            **kwargs
        )
        
        # Обновляем SEO/GEO файлы
        update_seo_files_with_keywords()
        
        return jsonify({
            'message': 'Ключевое слово успешно добавлено',
            'keyword': {
                'id': keyword.id,
                'phrase': keyword.phrase,
                'cluster': keyword.cluster.value,
                'priority': keyword.priority.value,
                'search_volume': keyword.search_volume,
                'competition': keyword.competition,
                'commercial_intent': keyword.commercial_intent,
                'created_at': keyword.created_at,
                'updated_at': keyword.updated_at,
                'is_active': keyword.is_active
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Ошибка добавления ключевого слова: {str(e)}'}), 500

@semantic_bp.route('/keywords/bulk', methods=['POST'])
def add_keywords_bulk():
    """Массовое добавление ключевых слов"""
    try:
        data = request.get_json()
        
        if not data or 'keywords' not in data:
            return jsonify({'error': 'Поле keywords обязательно'}), 400
        
        keywords_data = data['keywords']
        if not isinstance(keywords_data, list):
            return jsonify({'error': 'keywords должно быть массивом'}), 400
        
        added_keywords = []
        errors = []
        
        for i, keyword_data in enumerate(keywords_data):
            try:
                if isinstance(keyword_data, str):
                    # Простая строка - только фраза
                    phrase = keyword_data.strip()
                    if phrase:
                        keyword = semantic_manager.add_keyword(phrase=phrase)
                        added_keywords.append({
                            'id': keyword.id,
                            'phrase': keyword.phrase,
                            'cluster': keyword.cluster.value,
                            'priority': keyword.priority.value
                        })
                elif isinstance(keyword_data, dict) and 'phrase' in keyword_data:
                    # Объект с дополнительными параметрами
                    phrase = keyword_data['phrase'].strip()
                    if not phrase:
                        errors.append(f'Строка {i+1}: пустая фраза')
                        continue
                    
                    # Проверяем дубликаты
                    existing_keywords = semantic_manager.search_keywords(phrase)
                    if any(existing.phrase.lower() == phrase.lower() for existing in existing_keywords):
                        errors.append(f'Строка {i+1}: ключевое слово "{phrase}" уже существует')
                        continue
                    
                    cluster = None
                    if 'cluster' in keyword_data:
                        try:
                            cluster = KeywordCluster(keyword_data['cluster'])
                        except ValueError:
                            errors.append(f'Строка {i+1}: неверный кластер')
                            continue
                    
                    priority = None
                    if 'priority' in keyword_data:
                        try:
                            priority = KeywordPriority(keyword_data['priority'])
                        except ValueError:
                            errors.append(f'Строка {i+1}: неверный приоритет')
                            continue
                    
                    kwargs = {}
                    for field in ['search_volume', 'competition', 'commercial_intent']:
                        if field in keyword_data:
                            kwargs[field] = keyword_data[field]
                    
                    keyword = semantic_manager.add_keyword(
                        phrase=phrase,
                        cluster=cluster,
                        priority=priority,
                        **kwargs
                    )
                    
                    added_keywords.append({
                        'id': keyword.id,
                        'phrase': keyword.phrase,
                        'cluster': keyword.cluster.value,
                        'priority': keyword.priority.value
                    })
                else:
                    errors.append(f'Строка {i+1}: неверный формат данных')
                    
            except Exception as e:
                errors.append(f'Строка {i+1}: {str(e)}')
        
        # Обновляем SEO/GEO файлы если были добавлены ключевые слова
        if added_keywords:
            update_seo_files_with_keywords()
        
        return jsonify({
            'message': f'Обработано {len(keywords_data)} ключевых слов',
            'added': len(added_keywords),
            'errors': len(errors),
            'added_keywords': added_keywords,
            'error_details': errors
        }), 201 if added_keywords else 400
        
    except Exception as e:
        return jsonify({'error': f'Ошибка массового добавления: {str(e)}'}), 500

@semantic_bp.route('/keywords/<keyword_id>', methods=['GET'])
def get_keyword(keyword_id):
    """Получение конкретного ключевого слова"""
    try:
        keyword = semantic_manager.get_keyword(keyword_id)
        
        if not keyword:
            return jsonify({'error': 'Ключевое слово не найдено'}), 404
        
        return jsonify({
            'keyword': {
                'id': keyword.id,
                'phrase': keyword.phrase,
                'cluster': keyword.cluster.value,
                'priority': keyword.priority.value,
                'search_volume': keyword.search_volume,
                'competition': keyword.competition,
                'commercial_intent': keyword.commercial_intent,
                'created_at': keyword.created_at,
                'updated_at': keyword.updated_at,
                'is_active': keyword.is_active
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Ошибка получения ключевого слова: {str(e)}'}), 500

@semantic_bp.route('/keywords/<keyword_id>', methods=['PUT'])
def update_keyword(keyword_id):
    """Обновление ключевого слова"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Нет данных для обновления'}), 400
        
        # Проверяем существование ключевого слова
        existing_keyword = semantic_manager.get_keyword(keyword_id)
        if not existing_keyword:
            return jsonify({'error': 'Ключевое слово не найдено'}), 404
        
        # Подготавливаем данные для обновления
        updates = {}
        
        if 'phrase' in data:
            phrase = data['phrase'].strip()
            if not phrase:
                return jsonify({'error': 'Фраза не может быть пустой'}), 400
            updates['phrase'] = phrase
        
        if 'cluster' in data:
            try:
                updates['cluster'] = KeywordCluster(data['cluster'])
            except ValueError:
                return jsonify({'error': f'Неверный кластер: {data["cluster"]}'}), 400
        
        if 'priority' in data:
            try:
                updates['priority'] = KeywordPriority(data['priority'])
            except ValueError:
                return jsonify({'error': f'Неверный приоритет: {data["priority"]}'}), 400
        
        # Дополнительные поля
        for field in ['search_volume', 'competition', 'commercial_intent', 'is_active']:
            if field in data:
                updates[field] = data[field]
        
        # Обновляем ключевое слово
        updated_keyword = semantic_manager.update_keyword(keyword_id, **updates)
        
        if not updated_keyword:
            return jsonify({'error': 'Ошибка обновления ключевого слова'}), 500
        
        # Обновляем SEO/GEO файлы
        update_seo_files_with_keywords()
        
        return jsonify({
            'message': 'Ключевое слово успешно обновлено',
            'keyword': {
                'id': updated_keyword.id,
                'phrase': updated_keyword.phrase,
                'cluster': updated_keyword.cluster.value,
                'priority': updated_keyword.priority.value,
                'search_volume': updated_keyword.search_volume,
                'competition': updated_keyword.competition,
                'commercial_intent': updated_keyword.commercial_intent,
                'created_at': updated_keyword.created_at,
                'updated_at': updated_keyword.updated_at,
                'is_active': updated_keyword.is_active
            }
        })
        
    except Exception as e:
        return jsonify({'error': f'Ошибка обновления ключевого слова: {str(e)}'}), 500

@semantic_bp.route('/keywords/<keyword_id>', methods=['DELETE'])
def delete_keyword(keyword_id):
    """Удаление ключевого слова"""
    try:
        # Проверяем существование ключевого слова
        existing_keyword = semantic_manager.get_keyword(keyword_id)
        if not existing_keyword:
            return jsonify({'error': 'Ключевое слово не найдено'}), 404
        
        # Удаляем ключевое слово
        success = semantic_manager.delete_keyword(keyword_id)
        
        if not success:
            return jsonify({'error': 'Ошибка удаления ключевого слова'}), 500
        
        # Обновляем SEO/GEO файлы
        update_seo_files_with_keywords()
        
        return jsonify({
            'message': 'Ключевое слово успешно удалено',
            'deleted_keyword_id': keyword_id
        })
        
    except Exception as e:
        return jsonify({'error': f'Ошибка удаления ключевого слова: {str(e)}'}), 500

@semantic_bp.route('/keywords/statistics', methods=['GET'])
def get_statistics():
    """Получение статистики по семантическому ядру"""
    try:
        cluster_stats = semantic_manager.get_cluster_statistics()
        
        # Статистика по приоритетам
        priority_stats = {}
        for priority in KeywordPriority:
            priority_stats[priority.value] = len(semantic_manager.get_keywords_by_priority(priority))
        
        # Общая статистика
        all_keywords = semantic_manager.get_all_keywords(active_only=False)
        active_keywords = semantic_manager.get_all_keywords(active_only=True)
        
        return jsonify({
            'total_keywords': len(all_keywords),
            'active_keywords': len(active_keywords),
            'inactive_keywords': len(all_keywords) - len(active_keywords),
            'cluster_distribution': cluster_stats,
            'priority_distribution': priority_stats,
            'clusters': [cluster.value for cluster in KeywordCluster],
            'priorities': [priority.value for priority in KeywordPriority]
        })
        
    except Exception as e:
        return jsonify({'error': f'Ошибка получения статистики: {str(e)}'}), 500

def update_seo_files_with_keywords():
    """Обновление SEO/GEO файлов с учетом семантического ядра"""
    try:
        # Получаем все активные ключевые слова
        keywords = semantic_manager.get_all_keywords(active_only=True)
        
        # Обновляем llms.txt
        update_llms_txt(keywords)
        
        # Обновляем метаданные сайта
        update_site_metadata(keywords)
        
        return True
        
    except Exception as e:
        print(f"Ошибка обновления SEO/GEO файлов: {e}")
        return False

def update_llms_txt(keywords):
    """Обновление файла llms.txt с новыми ключевыми словами"""
    try:
        llms_path = os.path.join('/root/call-intellect-site', 'public', 'llms.txt')
        
        # Группируем ключевые слова по кластерам
        clustered_keywords = {}
        for keyword in keywords:
            cluster = keyword.cluster.value
            if cluster not in clustered_keywords:
                clustered_keywords[cluster] = []
            clustered_keywords[cluster].append(keyword.phrase)
        
        # Читаем существующий файл
        existing_content = ""
        if os.path.exists(llms_path):
            with open(llms_path, 'r', encoding='utf-8') as f:
                existing_content = f.read()
        
        # Добавляем секцию с семантическим ядром
        semantic_section = "\n\n## Семантическое ядро\n\n"
        
        for cluster, phrases in clustered_keywords.items():
            semantic_section += f"### {cluster.title()}\n"
            for phrase in sorted(phrases):
                semantic_section += f"- {phrase}\n"
            semantic_section += "\n"
        
        # Проверяем, есть ли уже секция семантического ядра
        if "## Семантическое ядро" in existing_content:
            # Заменяем существующую секцию
            lines = existing_content.split('\n')
            new_lines = []
            skip_section = False
            
            for line in lines:
                if line.strip() == "## Семантическое ядро":
                    skip_section = True
                    break
                new_lines.append(line)
            
            # Добавляем новую секцию
            new_content = '\n'.join(new_lines) + semantic_section
        else:
            # Добавляем секцию в конец
            new_content = existing_content + semantic_section
        
        # Записываем обновленный файл
        with open(llms_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
    except Exception as e:
        print(f"Ошибка обновления llms.txt: {e}")

def update_site_metadata(keywords):
    """Обновление метаданных сайта с новыми ключевыми словами"""
    try:
        # Получаем высокоприоритетные ключевые слова для метаданных
        high_priority_keywords = [kw.phrase for kw in keywords 
                                if kw.priority in [KeywordPriority.HIGH, KeywordPriority.CRITICAL]]
        
        # Формируем строку ключевых слов для meta keywords
        meta_keywords = ', '.join(high_priority_keywords[:20])  # Ограничиваем 20 ключевыми словами
        
        # Обновляем SEOHead.jsx
        seo_head_path = os.path.join('/root/call-intellect-site', 'src', 'components', 'SEOHead.jsx')
        
        if os.path.exists(seo_head_path):
            with open(seo_head_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Обновляем meta keywords (простая замена)
            import re
            
            # Ищем строку с meta keywords и заменяем её
            keywords_pattern = r'<meta name="keywords" content="[^"]*"'
            new_keywords_meta = f'<meta name="keywords" content="{meta_keywords}"'
            
            if re.search(keywords_pattern, content):
                content = re.sub(keywords_pattern, new_keywords_meta, content)
            
            with open(seo_head_path, 'w', encoding='utf-8') as f:
                f.write(content)
                
    except Exception as e:
        print(f"Ошибка обновления метаданных сайта: {e}")

