+++
title = "Migrando de WordPress a Zola: Una guía práctica"
description = "Moverse de WordPress a un generador de sitios estáticos como Zola significa intercambiar complejidad dinámica por simplicidad estática. Aquí está cómo hacer la transición suave, qué esperar, y qué ganarás en el proceso."
date = 2025-11-21
lang = "es"

[taxonomies]
categories = ["Simple Post"]
tags = ["Zola", "Bloging"]

[extra]
featured = false
image = ""
+++

Recientemente migré un blog de WordPress que había estado funcionando durante años a Zola. El proceso tomó aproximadamente un fin de semana, y los resultados valieron la pena: tiempos de carga más rápidos, cero sobrecarga de mantenimiento, y control completo sobre la salida. Aquí está todo lo que aprendí.

## ¿Por qué dejar WordPress?

WordPress es poderoso, pero ese poder viene con peso. Mi sitio estaba:
- Ejecutándose en un VPS que necesitaba actualizaciones y monitoreo
- Usando múltiples plugins que ocasionalmente se rompían después de actualizaciones
- Cargando lentamente a pesar de plugins de caché
- Vulnerable a problemas de seguridad que requerían vigilancia constante
- Costando tarifas de hosting mensuales

El blog era 95% contenido estático. No estaba usando la mayoría de las características dinámicas de WordPress. Un sitio estático tenía más sentido.

## Entendiendo lo que estás intercambiando

**Lo que pierdes:**
- Comentarios dinámicos (reemplazables con servicios externos)
- Panel de administración para editar (editarás archivos markdown)
- Ecosistema de plugins (construyes lo que necesitas)
- Editor WYSIWYG (escribirás en markdown)
- Actualizaciones fáciles desde el navegador (harás push a git)

**Lo que ganas:**
- Cargas de página casi instantáneas
- Cero mantenimiento del servidor
- Sin vulnerabilidades de seguridad
- Opciones de hosting gratuitas (GitHub Pages, Netlify, Cloudflare Pages)
- Control completo sobre la salida
- Control de versiones para todo el contenido
- Capacidad de trabajar offline

Si escribes en markdown y te sientes cómodo con git, este intercambio es favorable.

## Paso 1: Exporta tu contenido de WordPress

WordPress tiene una herramienta de exportación integrada:

1. Ve a Herramientas → Exportar en el admin de WordPress
2. Selecciona "Todo el contenido"
3. Descarga el archivo XML

Esto te da un archivo con todos los posts, páginas, comentarios y metadatos.

También puedes usar plugins como "WordPress to Jekyll Exporter" que exporta directamente a markdown, aunque aún necesitarás adaptar el formato para Zola.

## Paso 2: Convierte el contenido a Markdown

WordPress exporta a XML. Zola necesita markdown con front matter. Tienes opciones:

**Opción A: Usa un convertidor existente**

Herramientas como `wordpress-export-to-markdown` (paquete npm) pueden ayudar:

```bash
npm install -g wordpress-export-to-markdown
wordpress-export-to-markdown --input=export.xml --output=content/blog
```

**Opción B: Escribe un script de conversión**

Escribí un script de Python para procesar el XML y convertir a markdown compatible con Zola:

```python
import xml.etree.ElementTree as ET
from html2text import html2text
from datetime import datetime
import os
import re

def clean_filename(title):
    # Convertir título a nombre de archivo válido
    filename = title.lower()
    filename = re.sub(r'[^a-z0-9]+', '-', filename)
    return filename.strip('-')

def convert_wordpress_export(xml_file, output_dir):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # Espacios de nombres XML de WordPress
    namespaces = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'wp': 'http://wordpress.org/export/1.2/'
    }
    
    for item in root.findall('.//item'):
        # Obtener datos del post
        title = item.find('title').text
        post_type = item.find('wp:post_type', namespaces).text
        status = item.find('wp:status', namespaces).text
        
        # Solo procesar posts publicados
        if post_type != 'post' or status != 'publish':
            continue
            
        # Obtener contenido
        content_html = item.find('content:encoded', namespaces).text or ''
        content_md = html2text(content_html)
        
        # Obtener metadatos
        date_str = item.find('wp:post_date', namespaces).text
        date = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
        
        # Obtener categorías y etiquetas
        categories = []
        tags = []
        for category in item.findall('category'):
            domain = category.get('domain')
            name = category.text
            if domain == 'category':
                categories.append(name)
            elif domain == 'post_tag':
                tags.append(name)
        
        # Crear nombre de archivo
        filename = f"{date.strftime('%Y-%m-%d')}-{clean_filename(title)}.md"
        filepath = os.path.join(output_dir, filename)
        
        # Crear front matter
        front_matter = f"""+++
title = "{title}"
date = {date.strftime('%Y-%m-%d')}
lang = "es"
"""
        
        if categories:
            front_matter += f"\n[taxonomies]\n"
            if tags:
                front_matter += f'tags = {tags}\n'
            if categories:
                front_matter += f'categories = {categories}\n'
        
        front_matter += "+++\n\n"
        
        # Escribir archivo
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(front_matter + content_md)
        
        print(f"Convertido: {title}")

# Uso
convert_wordpress_export('export.xml', 'content/blog')
```

Instala el paquete requerido: `pip install html2text`

Este script:
- Analiza el XML de WordPress
- Convierte contenido HTML a markdown
- Crea el front matter apropiado
- Organiza archivos con fechas en nombres de archivo
- Preserva categorías y etiquetas

## Paso 3: Maneja imágenes y medios

WordPress almacena imágenes en `wp-content/uploads/AÑO/MES/`. Necesitas:

**1. Descargar todas las imágenes:**

Usa wget o un plugin de WordPress para descargar tu biblioteca de medios:

```bash
wget -r -np -nH --cut-dirs=3 -R index.html \
  https://tusitio.com/wp-content/uploads/
```

**2. Mover al directorio estático de Zola:**

```bash
mv uploads static/images
```

**3. Actualizar referencias de imágenes:**

Tu markdown convertido tendrá referencias como:

    ![Texto alternativo](https://tusitio.com/wp-content/uploads/2023/05/imagen.jpg)

Actualízalas a:

    ![Texto alternativo](/images/2023/05/imagen.jpg)

Usa buscar y reemplazar o un script:

```bash
# En tu directorio de contenido
find . -name "*.md" -type f -exec sed -i \
  's|https://tusitio.com/wp-content/uploads|/images|g' {} +
```

## Paso 4: Configura la estructura de Zola

Crea tu sitio Zola:

```bash
zola init mi-sitio
cd mi-sitio
```

Mueve los posts convertidos:

```bash
mkdir -p content/blog
mv ../posts-convertidos/*.md content/blog/
```

Crea `content/blog/_index.md`:

```markdown
+++
title = "Blog"
sort_by = "date"
template = "blog.html"
page_template = "blog-page.html"
paginate_by = 10
+++
```

## Paso 5: Maneja la estructura de URL

WordPress típicamente usa URLs como:
- `tusitio.com/2023/05/titulo-post/`
- `tusitio.com/category/tech/titulo-post/`

Zola por defecto usa:
- `tusitio.com/blog/titulo-post/`

**Opción 1: Acepta nuevas URLs y configura redirecciones**

Crea un archivo `_redirects` para Netlify o usa meta refresh en HTML:

    /2023/05/titulo-post-viejo/ /blog/titulo-post-viejo/ 301

**Opción 2: Coincide con la estructura de WordPress**

Configura el `config.toml` de Zola:

```toml
[slugify]
paths = "safe"
taxonomies = "safe"

# En el front matter de tu sección
[extra]
# Puedes personalizar rutas por post
```

O en posts individuales, establece rutas personalizadas:

```markdown
+++
title = "Mi Post"
date = 2023-05-15
lang = "es"
path = "2023/05/mi-post"
+++
```

## Paso 6: Migra comentarios

Los comentarios de WordPress no pueden transferirse directamente a sitios estáticos. Opciones:

**1. Usa un servicio de terceros:**
- Disqus (gratis, pero con anuncios)
- Utterances (basado en GitHub, limpio)
- Commento (open-source, auto-hospedable)

**2. Exporta y muestra estáticamente:**

Exporta comentarios de WordPress, conviértelos a markdown, y muéstralos como contenido estático al final de los posts.

**3. Deshabilita comentarios:**

Si los comentarios no estaban activos o no eran valiosos, simplemente no los incluyas.

Elegí Utterances por su simplicidad e integración con GitHub.

## Paso 7: Crea plantillas

Construye plantillas básicas que coincidan con tu diseño de WordPress:

**Plantilla base** (`templates/base.html`):

    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}{{ config.title }}{% endblock %}</title>
        <link rel="stylesheet" href="#">
    </head>
    <body>
        <header>
            <nav>
                <a href="#">Inicio</a>
                <a href="#">Blog</a>
            </nav>
        </header>
        <main>
            {% block content %}{% endblock %}
        </main>
    </body>
    </html>

**Plantilla de post de blog** (`templates/blog-page.html`):

    {% extends "base.html" %}
    
    {% block content %}
    <article>
        <h1>{{ page.title }}</h1>
        <time>{{ page.date | date(format="%d de %B de %Y") }}</time>
        
        <div class="content">
            {{ page.content | safe }}
        </div>
        
        {% if page.taxonomies.tags %}
        <div class="tags">
            {% for tag in page.taxonomies.tags %}
            <a href="{{ get_taxonomy_url(kind="tags", name=tag) }}">#{{ tag }}</a>
            {% endfor %}
        </div>
        {% endif %}
    </article>
    {% endblock %}

## Paso 8: Migración de estilos

Exporta tu CSS de WordPress o recrea el diseño. Si usaste un tema, podrías necesitar reconstruir los estilos desde cero.

Zola compila Sass, así que úsalo para organización:

```bash
mkdir sass
# Crea sass/style.scss con tus estilos
```

## Paso 9: Prueba todo

Antes de ir en vivo:

1. **Verifica todos los enlaces internos:**
   ```bash
   zola check
   ```

2. **Verifica que las imágenes carguen:**
   - Busca enlaces de imagen rotos
   - Asegúrate de que las rutas sean correctas

3. **Prueba en servidor local:**
   ```bash
   zola serve
   ```

4. **Revisa el formato de posts:**
   - Verifica el renderizado de markdown
   - Verifica bloques de código
   - Prueba el formato de listas

5. **Valida el feed RSS:**
   - Revisa `public/rss.xml` después de construir

## Paso 10: Despliega

Construye el sitio:

```bash
zola build
```

Despliega el directorio `public/` a:
- **GitHub Pages** (gratis)
- **Netlify** (gratis, despliegue continuo fácil)
- **Cloudflare Pages** (gratis, CDN rápido)
- **Cualquier host estático**

Para Netlify, crea `netlify.toml`:

```toml
[build]
command = "zola build"
publish = "public"

[build.environment]
ZOLA_VERSION = "0.18.0"

[[redirects]]
from = "/wp-content/uploads/*"
to = "/images/:splat"
status = 301
```

## Lista de verificación post-migración

- [ ] Todos los posts migrados y renderizando correctamente
- [ ] Imágenes cargando desde nuevas rutas
- [ ] Feed RSS funcionando
- [ ] Enlaces internos actualizados
- [ ] Redirecciones de URL configuradas
- [ ] Solución de comentarios implementada (si se desea)
- [ ] Analíticas añadidas (si se necesitan)
- [ ] Funcionalidad de búsqueda (si se necesita)
- [ ] Dominio apuntando al nuevo host
- [ ] Certificado SSL configurado
- [ ] Sitio viejo de WordPress respaldado antes de apagar

## Lo que aprendí

**Semana 1 después de la migración:**
- Las páginas cargaban 10x más rápido
- No más ansiedad por actualizaciones de plugins
- Editar en markdown se sintió liberador
- El historial de git para todo el contenido fue valioso

**Mes 1:**
- Cero tiempo de mantenimiento gastado
- Costos de hosting cayeron a $0
- Podía trabajar en posts offline
- El flujo de despliegue se volvió natural

**Mes 6:**
- Nunca miré atrás
- Escribiendo más porque la fricción se fue
- El sitio sigue rápido, sin degradación
- Sin preocupaciones de seguridad

## Problemas comunes y soluciones

**Problema: HTML en markdown convertido se ve desordenado**

Solución: Limpia el markdown manualmente o mejora tu script de conversión. Algo de HTML está bien—Zola lo renderiza.

**Problema: Los shortcodes de WordPress no se convierten**

Solución: Reemplaza los shortcodes de WordPress con HTML equivalente o shortcodes de Zola. Crea shortcodes personalizados para elementos complejos.

**Problema: Imágenes destacadas faltantes**

Solución: Las imágenes destacadas de WordPress necesitan manejo especial. Extráelas del XML y añádelas al front matter:

```markdown
+++
[extra]
featured_image = "/images/2023/05/destacada.jpg"
+++
```

**Problema: Categorías y etiquetas no funcionan**

Solución: Asegúrate de que las taxonomías estén configuradas en `config.toml` y formateadas apropiadamente en el front matter.

## ¿Vale la pena la migración?

Para mí: absolutamente. Los intercambios favorecen la generación estática cuando:
- Tu sitio es mayormente contenido estático
- Te sientes cómodo con markdown y git
- Quieres máximo rendimiento
- Quieres minimizar el mantenimiento
- Los costos de hosting importan

No vale la pena si:
- Necesitas interacciones de usuario complejas
- Múltiples personas no técnicas necesitan editar contenido
- Usas mucho plugins específicos de WordPress
- No te sientes cómodo con herramientas de línea de comandos

## Recursos que ayudaron

- Documentación de Zola (comprehensiva)
- Biblioteca Python html2text (conversión HTML a markdown)
- Paquete npm wordpress-export-to-markdown
- Utterances para comentarios
- Netlify para hosting y despliegue

La migración tomó un fin de semana de trabajo enfocado. Seis meses después, no tengo arrepentimientos. El sitio es más rápido, más barato de ejecutar, y más disfrutable de mantener. Si tu sitio WordPress es principalmente un blog con contenido estático, Zola es una alternativa convincente.