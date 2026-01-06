+++
title = "Creando un blog con Zola: Una guía prácticas"
description = "Un recorrido paso a paso para construir un blog real con Zola, desde la instalación hasta el despliegue. Aprende las decisiones prácticas y patrones que hacen el desarrollo con Zola eficiente."
date = 2025-11-19
lang = "es"

[taxonomies]
categories = ["Simple Post"]
tags = ["Zola", "Bloging"]

[extra]
featured = false
image = ""
+++

Construir un blog con Zola es directo, pero hay patrones y decisiones que no son inmediatamente obvios desde la documentación. Esta guía recorre la creación de un blog real, cubriendo las elecciones prácticas que enfrentarás y las soluciones que funcionan bien.

## Comenzando: Instalación y configuración del proyecto

Primero, instala Zola. Descarga el binario para tu plataforma desde la página de releases, o usa un gestor de paquetes:

```bash
# macOS
brew install zola

# Linux
snap install zola --edge

# O descarga el binario directamente
```

Crea tu proyecto:

```bash
zola init mi-blog
cd mi-blog
```

Zola hará algunas preguntas. Para un blog, responde:
- URL: Tu URL de producción (puedes cambiar esto después)
- Compilación Sass: Sí
- Resaltado de sintaxis: Sí

Tu estructura de directorios se ve así:

```
mi-blog/
├── config.toml
├── content/
├── sass/
├── static/
├── templates/
└── themes/
```

## Configuración: Los cimientos

Abre `config.toml` y configura lo esencial:

```toml
base_url = "https://tudominio.com"
title = "Nombre de tu Blog"
description = "Una breve descripción de tu blog"

# Compilar archivos Sass
compile_sass = true

# Habilitar resaltado de sintaxis para bloques de código
highlight_code = true
highlight_theme = "base16-ocean-dark"

# Generar feed RSS
generate_feed = true
feed_filename = "rss.xml"

# Taxonomías (etiquetas y categorías)
taxonomies = [
    {name = "tags", feed = true},
    {name = "categories", feed = true},
]

[markdown]
# Habilitar puntuación inteligente y otras características
smart_punctuation = true
highlight_code = true

[extra]
# Añade cualquier variable personalizada que necesites
author = "Tu Nombre"
github = "https://github.com/tuusuario"
twitter = "tuusuario"
```

Esta configuración te da una base sólida: feeds RSS, taxonomías para organizar contenido, y resaltado de código.

## Estructura de contenido: Organizando tus posts

Crea una sección de blog en `content/blog/`:

```bash
mkdir -p content/blog
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

Bienvenido a mi blog donde escribo sobre desarrollo web, programación y tecnología.
```

Este archivo define cómo se comporta la sección de blog:
- `sort_by = "date"` ordena los posts por fecha de publicación
- `paginate_by = 10` crea paginación cada 10 posts
- `template` define la vista de lista
- `page_template` define la vista de post individual

## Creando tu primer post

Crea `content/blog/hola-mundo.md`:

```markdown
+++
title = "Hola Mundo: Comenzando un nuevo blog"
date = 2025-11-16
lang = "es"
description = "Mi primer post en este nuevo blog construido con Zola"
[taxonomies]
tags = ["meta", "blogging"]
categories = ["General"]

[extra]
featured = true
+++

¡Bienvenido a mi blog! Este es mi primer post construido con Zola, y estoy emocionado de compartir lo que estoy aprendiendo.

<!-- more -->

## ¿Por qué Zola?

Elegí Zola por varias razones:
- Compilaciones rápidas
- Cero dependencias
- Configuración simple
- Gran soporte multilingüe

## ¿Qué sigue?

Planeo escribir sobre desarrollo web, compartir tutoriales, y documentar mi viaje de aprendizaje.

¡Mantente atento a más contenido!
```

La etiqueta `<!-- more -->` crea un salto de resumen. El texto antes de ella aparece en las vistas previas de posts.

## Plantillas: Construyendo el diseño del blog

Crea `templates/base.html` como tu fundación:

~~~html
<!DOCTYPE html>
<html lang="{{ lang | default(value="es") }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{{ config.title }}{% endblock %}</title>
    <meta name="description" content="{% block description %}{{ config.description }}{% endblock %}">
    
    {% if config.generate_feed %}
    <link rel="alternate" type="application/rss+xml" title="RSS" href="#">
    {% endif %}
    
    <link rel="stylesheet" href="/">
</head>
<body>
    <header>
        <nav>
            <a href="#">{{ config.title }}</a>
            <a href="#">Blog</a>
            <a href="#">Acerca de</a>
        </nav>
    </header>
    
    <main>
        {% block content %}{% endblock %}
    </main>
    
    <footer>
        <p>&copy; {{ now() | date(format="%Y") }} {{ config.extra.author }}</p>
    </footer>
</body>
</html>
~~~

Crea `templates/blog.html` para la lista de blog:

~~~html
{% extends "base.html" %}

{% block title %}{{ section.title }} | {{ config.title }}{% endblock %}
{% block description %}{{ section.description | default(value=config.description) }}{% endblock %}

{% block content %}
<div class="blog-list">
    <h1>{{ section.title }}</h1>
    
    {{ section.content | safe }}
    
    {% if section.pages %}
    <div class="posts">
        {% for page in section.pages %}
        <article class="post-preview">
            <h2><a href="{{ page.permalink }}">{{ page.title }}</a></h2>
            <time datetime="{{ page.date }}">{{ page.date | date(format="%d de %B de %Y") }}</time>
            
            {% if page.summary %}
            <p>{{ page.summary | safe }}</p>
            {% elif page.description %}
            <p>{{ page.description }}</p>
            {% endif %}
            
            {% if page.taxonomies.tags %}
            <div class="tags">
                {% for tag in page.taxonomies.tags %}
                <a href="{{ get_taxonomy_url(kind="tags", name=tag) }}">#{{ tag }}</a>
                {% endfor %}
            </div>
            {% endif %}
            
            <a href="{{ page.permalink }}">Leer más →</a>
        </article>
        {% endfor %}
    </div>
    {% endif %}
    
    {% if paginator %}
    <nav class="pagination">
        {% if paginator.previous %}
        <a href="{{ paginator.previous }}">← Más recientes</a>
        {% endif %}
        
        <span>Página {{ paginator.current_index }} de {{ paginator.number_pagers }}</span>
        
        {% if paginator.next %}
        <a href="{{ paginator.next }}">Más antiguos →</a>
        {% endif %}
    </nav>
    {% endif %}
</div>
{% endblock %}
~~~

Crea `templates/blog-page.html` para posts individuales:

~~~html
{% extends "base.html" %}

{% block title %}{{ page.title }} | {{ config.title }}{% endblock %}
{% block description %}{{ page.description | default(value=page.summary) }}{% endblock %}

{% block content %}
<article class="blog-post">
    <header>
        <h1>{{ page.title }}</h1>
        <div class="post-meta">
            <time datetime="{{ page.date }}">{{ page.date | date(format="%d de %B de %Y") }}</time>
            {% if page.extra.reading_time %}
            <span>• {{ page.reading_time }} min de lectura</span>
            {% endif %}
        </div>
        
        {% if page.taxonomies.tags %}
        <div class="tags">
            {% for tag in page.taxonomies.tags %}
            <a href="{{ get_taxonomy_url(kind="tags", name=tag) }}">#{{ tag }}</a>
            {% endfor %}
        </div>
        {% endif %}
    </header>
    
    <div class="post-content">
        {{ page.content | safe }}
    </div>
    
    {% if page.earlier or page.later %}
    <nav class="post-navigation">
        {% if page.earlier %}
        <a href="{{ page.earlier.permalink }}" class="prev">← {{ page.earlier.title }}</a>
        {% endif %}
        {% if page.later %}
        <a href="{{ page.later.permalink }}" class="next">{{ page.later.title }} →</a>
        {% endif %}
    </nav>
    {% endif %}
</article>
{% endblock %}
~~~

## Estilización con Sass

Crea `sass/style.scss`:

```scss
// Variables
$primary-color: #2563eb;
$text-color: #1f2937;
$background: #ffffff;
$border-color: #e5e7eb;
$max-width: 800px;

// Estilos base
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: $text-color;
    background: $background;
}

// Diseño
header {
    border-bottom: 1px solid $border-color;
    padding: 1rem 0;
    
    nav {
        max-width: $max-width;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        gap: 2rem;
        
        a {
            text-decoration: none;
            color: $text-color;
            font-weight: 500;
            
            &:hover {
                color: $primary-color;
            }
            
            &:first-child {
                font-weight: 700;
                margin-right: auto;
            }
        }
    }
}

main {
    max-width: $max-width;
    margin: 2rem auto;
    padding: 0 1rem;
}

footer {
    border-top: 1px solid $border-color;
    padding: 2rem 1rem;
    text-align: center;
    color: #6b7280;
    margin-top: 4rem;
}

// Estilos de blog
.post-preview {
    margin-bottom: 3rem;
    
    h2 {
        margin-bottom: 0.5rem;
        
        a {
            color: $text-color;
            text-decoration: none;
            
            &:hover {
                color: $primary-color;
            }
        }
    }
    
    time {
        color: #6b7280;
        font-size: 0.9rem;
    }
    
    p {
        margin: 1rem 0;
    }
}

.blog-post {
    .post-content {
        margin: 2rem 0;
        
        h2, h3 {
            margin: 2rem 0 1rem;
        }
        
        p {
            margin: 1rem 0;
        }
        
        code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-size: 0.9em;
        }
        
        pre {
            background: #1f2937;
            color: #f3f4f6;
            padding: 1rem;
            border-radius: 5px;
            overflow-x: auto;
            
            code {
                background: none;
                padding: 0;
            }
        }
    }
}

.tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 1rem 0;
    
    a {
        background: #f3f4f6;
        padding: 0.25rem 0.75rem;
        border-radius: 3px;
        text-decoration: none;
        color: $text-color;
        font-size: 0.9rem;
        
        &:hover {
            background: $primary-color;
            color: white;
        }
    }
}

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 3rem 0;
    padding: 1rem 0;
    border-top: 1px solid $border-color;
}

// Responsivo
@media (max-width: 768px) {
    header nav {
        flex-direction: column;
        gap: 1rem;
    }
}
```

## Añadiendo página de inicio

Crea `content/_index.md`:

```markdown
+++
title = "Inicio"
template = "index.html"
+++
```

Crea `templates/index.html`:

~~~html
{% extends "base.html" %}

{% block content %}
<div class="home">
    <h1>Bienvenido a {{ config.title }}</h1>
    <p class="intro">{{ config.description }}</p>
    
    {% set blog_section = get_section(path="blog/_index.md") %}
    {% if blog_section.pages %}
    <section class="recent-posts">
        <h2>Posts Recientes</h2>
        <div class="posts">
            {% for page in blog_section.pages | slice(end=5) %}
            <article class="post-preview">
                <h3><a href="{{ page.permalink }}">{{ page.title }}</a></h3>
                <time datetime="{{ page.date }}">{{ page.date | date(format="%d de %B de %Y") }}</time>
                {% if page.description %}
                <p>{{ page.description }}</p>
                {% endif %}
            </article>
            {% endfor %}
        </div>
        <a href="#" class="view-all">Ver todos los posts →</a>
    </section>
    {% endif %}
</div>
{% endblock %}
~~~

## Ejecutando tu blog

Inicia el servidor de desarrollo:

```bash
zola serve
```

Visita `http://127.0.0.1:1111` para ver tu blog. Los cambios en contenido y plantillas se recargan automáticamente.

## Construyendo para producción

Construye tu sitio para despliegue:

```bash
zola build
```

El sitio estático se genera en el directorio `public/`. Sube estos archivos a cualquier servicio de hosting estático.

## Despliegue a GitHub Pages

Crea `.github/workflows/deploy.yml`:

```yaml
name: Desplegar a GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Instalar Zola
        run: |
          wget https://github.com/getzola/zola/releases/download/v0.18.0/zola-v0.18.0-x86_64-unknown-linux-gnu.tar.gz
          tar xzf zola-v0.18.0-x86_64-unknown-linux-gnu.tar.gz
          sudo mv zola /usr/local/bin/
      
      - name: Construir
        run: zola build
      
      - name: Desplegar
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

Empuja a GitHub, habilita GitHub Pages en la configuración de tu repositorio, y tu blog se despliega automáticamente en cada push.

## Próximos pasos

Tu blog ahora es funcional. Considera añadir:

**Posts destacados**: Añade un campo `featured` al front matter y filtra en plantillas
**Tiempo de lectura**: Usa `{{ page.reading_time }}` para mostrar tiempo estimado de lectura
**Tabla de contenidos**: Habilita `insert_anchor_links = "left"` en config para anclas de encabezados
**Búsqueda**: Implementa búsqueda con la característica de índice de búsqueda de Zola
**Comentarios**: Integra un sistema de comentarios como utterances o Disqus
**Analíticas**: Añade analíticas con una simple inclusión de script

## Conclusiones clave

Crear un blog con Zola es refrescantemente directo:

1. **El contenido es solo Markdown** con front matter—sin APIs complejas o abstracciones
2. **Las plantillas son Tera**—si conoces Jinja2, ya sabes el 90% de lo que necesitas
3. **Las funcionalidades integradas eliminan plugins**—Sass, resaltado de sintaxis, RSS y taxonomías funcionan desde el inicio
4. **Iteración rápida**—los cambios aparecen instantáneamente durante el desarrollo
5. **Despliegue simple**—los archivos estáticos se pueden alojar en cualquier lugar

La clave para el desarrollo productivo con Zola es abrazar sus opiniones. La estructura puede sentirse restrictiva al principio, pero elimina la fatiga de decisiones y te permite enfocarte en el contenido.

Comienza simple, escribe contenido, y expande a medida que necesites más funcionalidades. Zola se quita del medio y te deja construir.