import os
import json
import shutil
from datetime import datetime
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import openai

# Загружаем переменные окружения
load_dotenv()

seo_bp = Blueprint('seo', __name__)

# Конфигурация
UPLOAD_FOLDER = '/tmp/uploads'
ALLOWED_EXTENSIONS = {'txt', 'md', 'jpg', 'jpeg', 'png', 'gif', 'webp'}
REACT_PROJECT_PATH = '/root/call-intellect-site'

# Создаем папку для загрузок если её нет
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_openai_client():
    """Получаем клиент OpenAI с безопасным хранением ключа"""
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        raise ValueError("OPENAI_API_KEY не найден в переменных окружения")
    return openai.OpenAI(api_key=api_key)

@seo_bp.route('/health', methods=['GET'])
def health_check():
    """Проверка работоспособности сервиса"""
    return jsonify({
        'status': 'healthy',
        'service': 'SEO/GEO Optimizer',
        'timestamp': datetime.now().isoformat()
    })

@seo_bp.route('/optimize-article', methods=['POST'])
def optimize_article():
    """
    API для приема статьи и изображения для SEO/GEO оптимизации
    
    Ожидаемые данные:
    - title: заголовок статьи
    - content: содержимое статьи
    - slug: URL-slug для статьи (опционально)
    - image: файл изображения (опционально)
    - keywords: ключевые слова (опционально)
    """
    try:
        # Проверяем наличие обязательных полей
        if 'title' not in request.form or 'content' not in request.form:
            return jsonify({
                'error': 'Обязательные поля: title, content'
            }), 400

        title = request.form['title']
        content = request.form['content']
        slug = request.form.get('slug', '').strip()
        keywords = request.form.get('keywords', '').strip()
        
        # Генерируем slug если не предоставлен
        if not slug:
            slug = generate_slug(title)
        
        # Обрабатываем изображение если предоставлено
        image_path = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                image_path = os.path.join(UPLOAD_FOLDER, filename)
                file.save(image_path)
        
        # Оптимизируем контент с помощью OpenAI
        optimized_data = optimize_content_with_ai(title, content, keywords)
        
        # Создаем React-компонент статьи
        article_component = create_article_component(
            title=title,
            content=content,
            slug=slug,
            optimized_data=optimized_data,
            image_path=image_path
        )
        
        # Обновляем SEO файлы
        update_seo_files(slug, optimized_data)
        
        return jsonify({
            'success': True,
            'message': 'Статья успешно оптимизирована и добавлена',
            'data': {
                'slug': slug,
                'optimized_title': optimized_data.get('title', title),
                'meta_description': optimized_data.get('description', ''),
                'keywords': optimized_data.get('keywords', []),
                'schema_org': optimized_data.get('schema_org', {}),
                'component_path': f'/src/pages/blog/{slug}.jsx'
            }
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Ошибка при обработке статьи: {str(e)}'
        }), 500

def generate_slug(title):
    """Генерирует URL-slug из заголовка"""
    import re
    # Транслитерация русских букв
    translit_dict = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    }
    
    slug = title.lower()
    for ru, en in translit_dict.items():
        slug = slug.replace(ru, en)
    
    # Удаляем все кроме букв, цифр и пробелов
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    # Заменяем пробелы на дефисы
    slug = re.sub(r'\s+', '-', slug)
    # Удаляем множественные дефисы
    slug = re.sub(r'-+', '-', slug)
    # Убираем дефисы в начале и конце
    slug = slug.strip('-')
    
    # Ограничиваем длину slug до 50 символов
    if len(slug) > 50:
        slug = slug[:50].rstrip('-')
    
    return slug

def optimize_content_with_ai(title, content, keywords):
    """Оптимизирует контент с помощью OpenAI API"""
    try:
        client = get_openai_client()
        
        prompt = f"""
        Ты - эксперт по SEO и GEO (Generative Engine Optimization). 
        Оптимизируй следующую статью для поисковых систем и AI-моделей.
        
        Заголовок: {title}
        Контент: {content}
        Ключевые слова: {keywords}
        
        Верни JSON с следующими полями:
        {{
            "title": "оптимизированный заголовок (до 60 символов)",
            "description": "мета-описание (до 160 символов)",
            "keywords": ["список", "ключевых", "слов"],
            "schema_org": {{
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "заголовок статьи",
                "description": "описание статьи",
                "author": {{"@type": "Person", "name": "Call-Intellect"}},
                "publisher": {{"@type": "Organization", "name": "Call-Intellect"}},
                "datePublished": "{datetime.now().isoformat()}",
                "dateModified": "{datetime.now().isoformat()}"
            }},
            "h1": "оптимизированный H1 заголовок",
            "h2_suggestions": ["предложения", "для", "подзаголовков"],
            "content_structure": "рекомендации по структуре контента для GEO"
        }}
        """
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Ты эксперт по SEO и GEO оптимизации. Отвечай только в формате JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        
        result = json.loads(response.choices[0].message.content)
        return result
        
    except Exception as e:
        # Возвращаем базовую оптимизацию в случае ошибки
        return {
            "title": title[:60],
            "description": content[:160] + "..." if len(content) > 160 else content,
            "keywords": keywords.split(',') if keywords else [],
            "schema_org": {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "description": content[:160],
                "author": {"@type": "Person", "name": "Call-Intellect"},
                "publisher": {"@type": "Organization", "name": "Call-Intellect"},
                "datePublished": datetime.now().isoformat(),
                "dateModified": datetime.now().isoformat()
            },
            "h1": title,
            "h2_suggestions": [],
            "content_structure": "Структурируйте контент в формате вопрос-ответ для лучшей GEO оптимизации"
        }

def create_article_component(title, content, slug, optimized_data, image_path=None):
    """Создает React-компонент для статьи"""
    
    # Копируем изображение в папку проекта если оно есть
    image_src = None
    if image_path and os.path.exists(image_path):
        image_filename = os.path.basename(image_path)
        dest_path = os.path.join(REACT_PROJECT_PATH, 'public', 'images', image_filename)
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        shutil.copy2(image_path, dest_path)
        image_src = f"/images/{image_filename}"
    
    # Создаем содержимое React-компонента
    component_content = f"""import {{ Button }} from '@/components/ui/button'
import SEOHead from '../../components/SEOHead'

const {slug.replace('-', '').title()}Article = () => {{
  const schemaOrg = {json.dumps(optimized_data.get('schema_org', {}), indent=4, ensure_ascii=False)}

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="{optimized_data.get('title', title)}"
        description="{optimized_data.get('description', '')}"
        keywords="{', '.join(optimized_data.get('keywords', []))}"
        url="https://call-intellect.ru/blog/{slug}"
      />
      
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {optimized_data.get('h1', title)}
            </h1>
            <div className="text-gray-600 mb-6">
              <time dateTime="{datetime.now().isoformat()}">
                {datetime.now().strftime('%d.%m.%Y')}
              </time>
            </div>
            {image_src and f'''
            <div className="mb-8">
              <img 
                src="{image_src}" 
                alt="{title}"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            ''' or ''}
          </header>
          
          <div className="prose prose-lg max-w-none">
            {content.replace(chr(10), chr(10) + '            ')}
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Узнать больше о Call-Intellect
            </Button>
          </div>
        </div>
      </article>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{{{
        __html: JSON.stringify(schemaOrg)
      }}}} />
    </div>
  )
}}

export default {slug.replace('-', '').title()}Article
"""
    
    # Создаем папку для блога если её нет
    blog_dir = os.path.join(REACT_PROJECT_PATH, 'src', 'pages', 'blog')
    os.makedirs(blog_dir, exist_ok=True)
    
    # Сохраняем компонент
    component_path = os.path.join(blog_dir, f'{slug}.jsx')
    with open(component_path, 'w', encoding='utf-8') as f:
        f.write(component_content)
    
    return component_path

def update_seo_files(slug, optimized_data):
    """Обновляет SEO файлы (sitemap.xml, llms.txt)"""
    
    # Обновляем sitemap.xml
    sitemap_path = os.path.join(REACT_PROJECT_PATH, 'public', 'sitemap.xml')
    if os.path.exists(sitemap_path):
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            sitemap_content = f.read()
        
        # Добавляем новую запись перед закрывающим тегом
        new_entry = f'''  <url>
    <loc>https://call-intellect.ru/blog/{slug}</loc>
    <lastmod>{datetime.now().strftime('%Y-%m-%d')}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>'''
        
        sitemap_content = sitemap_content.replace('</urlset>', new_entry)
        
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(sitemap_content)
    
    # Обновляем llms.txt
    llms_path = os.path.join(REACT_PROJECT_PATH, 'public', 'llms.txt')
    if os.path.exists(llms_path):
        with open(llms_path, 'r', encoding='utf-8') as f:
            llms_content = f.read()
        
        # Добавляем ссылку на новую статью в раздел блога
        blog_section = f"- [{optimized_data.get('title', 'Новая статья')}](/blog/{slug}): {optimized_data.get('description', '')[:100]}..."
        
        if "## Blog Articles" in llms_content:
            llms_content = llms_content.replace("## Blog Articles", f"## Blog Articles\\n{blog_section}")
        else:
            llms_content += f"\\n\\n## Blog Articles\\n{blog_section}"
        
        with open(llms_path, 'w', encoding='utf-8') as f:
            f.write(llms_content)



@seo_bp.route('/monitor-folder', methods=['POST'])
def monitor_folder():
    """
    API для мониторинга папки на наличие новых статей
    
    Ожидаемые данные:
    - folder_path: путь к папке для мониторинга
    """
    try:
        data = request.get_json()
        folder_path = data.get('folder_path', '/tmp/articles')
        
        if not os.path.exists(folder_path):
            return jsonify({
                'error': f'Папка {folder_path} не существует'
            }), 400
        
        # Сканируем папку на наличие новых файлов
        new_articles = scan_folder_for_articles(folder_path)
        
        results = []
        for article_file in new_articles:
            try:
                # Обрабатываем каждую найденную статью
                result = process_article_file(article_file)
                results.append(result)
            except Exception as e:
                results.append({
                    'file': article_file,
                    'error': str(e)
                })
        
        return jsonify({
            'success': True,
            'message': f'Обработано {len(results)} файлов',
            'results': results
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Ошибка при мониторинге папки: {str(e)}'
        }), 500

def scan_folder_for_articles(folder_path):
    """Сканирует папку на наличие новых статей"""
    article_files = []
    
    for filename in os.listdir(folder_path):
        if filename.endswith(('.md', '.txt')):
            file_path = os.path.join(folder_path, filename)
            # Проверяем, что файл не был обработан ранее
            if not is_article_processed(file_path):
                article_files.append(file_path)
    
    return article_files

def is_article_processed(file_path):
    """Проверяет, была ли статья уже обработана"""
    processed_file = file_path + '.processed'
    return os.path.exists(processed_file)

def mark_article_as_processed(file_path):
    """Отмечает статью как обработанную"""
    processed_file = file_path + '.processed'
    with open(processed_file, 'w') as f:
        f.write(datetime.now().isoformat())

def process_article_file(file_path):
    """Обрабатывает файл статьи"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Извлекаем заголовок из первой строки или имени файла
    lines = content.split('\\n')
    title = lines[0].strip('#').strip() if lines and lines[0].startswith('#') else os.path.basename(file_path).replace('.md', '').replace('.txt', '')
    
    # Убираем заголовок из контента если он есть
    if lines and lines[0].startswith('#'):
        content = '\\n'.join(lines[1:]).strip()
    
    # Генерируем slug
    slug = generate_slug(title)
    
    # Оптимизируем контент
    optimized_data = optimize_content_with_ai(title, content, '')
    
    # Создаем компонент
    create_article_component(title, content, slug, optimized_data)
    
    # Обновляем SEO файлы
    update_seo_files(slug, optimized_data)
    
    # Отмечаем как обработанную
    mark_article_as_processed(file_path)
    
    return {
        'file': file_path,
        'slug': slug,
        'title': optimized_data.get('title', title),
        'status': 'processed'
    }

@seo_bp.route('/schedule-monitoring', methods=['POST'])
def schedule_monitoring():
    """
    API для настройки автоматического мониторинга
    
    Ожидаемые данные:
    - folder_path: путь к папке для мониторинга
    - interval_hours: интервал проверки в часах (по умолчанию 24)
    """
    try:
        data = request.get_json()
        folder_path = data.get('folder_path', '/tmp/articles')
        interval_hours = data.get('interval_hours', 24)
        
        # Создаем cron job для автоматического мониторинга
        create_monitoring_cron_job(folder_path, interval_hours)
        
        return jsonify({
            'success': True,
            'message': f'Автоматический мониторинг настроен для папки {folder_path} с интервалом {interval_hours} часов'
        })
        
    except Exception as e:
        return jsonify({
            'error': f'Ошибка при настройке мониторинга: {str(e)}'
        }), 500

def create_monitoring_cron_job(folder_path, interval_hours):
    """Создает cron job для автоматического мониторинга"""
    import subprocess
    
    # Создаем скрипт для мониторинга
    script_content = f'''#!/bin/bash
cd /home/ubuntu/seo-optimizer-service
source venv/bin/activate
python -c "
import requests
import json

try:
    response = requests.post('http://localhost:5000/api/seo/monitor-folder', 
                           json={{'folder_path': '{folder_path}'}},
                           headers={{'Content-Type': 'application/json'}})
    print(f'Monitoring result: {{response.status_code}} - {{response.text}}')
except Exception as e:
    print(f'Error during monitoring: {{e}}')
"
'''
    
    script_path = '/home/ubuntu/seo-monitor.sh'
    with open(script_path, 'w') as f:
        f.write(script_content)
    
    # Делаем скрипт исполняемым
    os.chmod(script_path, 0o755)
    
    # Добавляем в crontab
    cron_entry = f'0 */{interval_hours} * * * {script_path}'
    
    # Получаем текущий crontab
    try:
        current_cron = subprocess.check_output(['crontab', '-l'], stderr=subprocess.DEVNULL).decode()
    except subprocess.CalledProcessError:
        current_cron = ''
    
    # Добавляем новую запись если её нет
    if script_path not in current_cron:
        new_cron = current_cron + f'\\n{cron_entry}\\n'
        
        # Записываем обновленный crontab
        process = subprocess.Popen(['crontab', '-'], stdin=subprocess.PIPE)
        process.communicate(new_cron.encode())
    
    return True

