+++
title = "Creating a Blog with Zola: A Practical Guide"
description = "A step-by-step walkthrough of building a real blog with Zola, from installation to deployment. Learn the practical decisions and patterns that make Zola development efficient."
date = 2025-11-19

[taxonomies]
categories = ["Simple Post"]
tags = ["Zola", "Bloging"]

[extra]
featured = false
image = ""
+++

Building a blog with Zola is straightforward, but there are patterns and decisions that aren't immediately obvious from the documentation. This guide walks through creating a real blog, covering the practical choices you'll face and the solutions that work well.

## Getting Started: Installation and Project Setup

First, install Zola. Download the binary for your platform from the releases page, or use a package manager:

```bash
# macOS
brew install zola

# Linux
snap install zola --edge

# Or download the binary directly
```

Create your project:

```bash
zola init my-blog
cd my-blog
```

Zola will ask a few questions. For a blog, answer:
- URL: Your production URL (you can change this later)
- Sass compilation: Yes
- Syntax highlighting: Yes

Your directory structure looks like this:

```
my-blog/
├── config.toml
├── content/
├── sass/
├── static/
├── templates/
└── themes/
```

## Configuration: The Foundation

Open `config.toml` and configure the essentials:

```toml
base_url = "https://yourdomain.com"
title = "Your Blog Name"
description = "A brief description of your blog"

# Compile Sass files
compile_sass = true

# Enable syntax highlighting for code blocks
highlight_code = true
highlight_theme = "base16-ocean-dark"

# Generate RSS feed
generate_feed = true
feed_filename = "rss.xml"

# Taxonomies (tags and categories)
taxonomies = [
    {name = "tags", feed = true},
    {name = "categories", feed = true},
]

[markdown]
# Enable smart punctuation and other features
smart_punctuation = true
highlight_code = true

[extra]
# Add any custom variables you need
author = "Your Name"
github = "https://github.com/yourusername"
twitter = "yourusername"
```

This configuration gives you a solid foundation: RSS feeds, taxonomies for organizing content, and code highlighting.

## Content Structure: Organizing Your Posts

Create a blog section in `content/blog/`:

```bash
mkdir -p content/blog
```

Create `content/blog/_index.md`:

```markdown
+++
title = "Blog"
sort_by = "date"
template = "blog.html"
page_template = "blog-page.html"
paginate_by = 10
+++

Welcome to my blog where I write about web development, programming, and technology.
```

This file defines how the blog section behaves:
- `sort_by = "date"` orders posts by publication date
- `paginate_by = 10` creates pagination every 10 posts
- `template` defines the list view
- `page_template` defines individual post view

## Creating Your First Post

Create `content/blog/hello-world.md`:

```markdown
+++
title = "Hello World: Starting a New Blog"
date = 2025-11-16
description = "My first post on this new blog built with Zola"
[taxonomies]
tags = ["meta", "blogging"]
categories = ["General"]

[extra]
featured = true
+++

Welcome to my blog! This is my first post built with Zola, and I'm excited to share what I'm learning.

<!-- more -->

## Why Zola?

I chose Zola for several reasons:
- Fast builds
- Zero dependencies
- Simple configuration
- Great multilingual support

## What's Next?

I plan to write about web development, share tutorials, and document my learning journey.

Stay tuned for more content!
```

The `<!-- more -->` tag creates a summary break. Text before it appears in post previews.

## Templates: Building the Blog Layout

Create `templates/base.html` as your foundation:

~~~html
<!DOCTYPE html>
<html lang="{{ lang | default(value="en") }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{{ config.title }}{% endblock %}</title>
    <meta name="description" content="{% block description %}{{ config.description }}{% endblock %}">
    
    {% if config.generate_feed %}
    <link rel="alternate" type="application/rss+xml" title="RSS" href="#">
    {% endif %}
    
    <link rel="/">
</head>
<body>
    <header>
        <nav>
            <a href="#">{{ config.title }}</a>
            <a href="#">Blog</a>
            <a href="#">About</a>
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

Create `templates/blog.html` for the blog list:

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
            <time datetime="{{ page.date }}">{{ page.date | date(format="%B %d, %Y") }}</time>
            
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
            
            <a href="{{ page.permalink }}">Read more →</a>
        </article>
        {% endfor %}
    </div>
    {% endif %}
    
    {% if paginator %}
    <nav class="pagination">
        {% if paginator.previous %}
        <a href="{{ paginator.previous }}">← Newer</a>
        {% endif %}
        
        <span>Page {{ paginator.current_index }} of {{ paginator.number_pagers }}</span>
        
        {% if paginator.next %}
        <a href="{{ paginator.next }}">Older →</a>
        {% endif %}
    </nav>
    {% endif %}
</div>
{% endblock %}
~~~

Create `templates/blog-page.html` for individual posts:

~~~html
{% extends "base.html" %}

{% block title %}{{ page.title }} | {{ config.title }}{% endblock %}
{% block description %}{{ page.description | default(value=page.summary) }}{% endblock %}

{% block content %}
<article class="blog-post">
    <header>
        <h1>{{ page.title }}</h1>
        <div class="post-meta">
            <time datetime="{{ page.date }}">{{ page.date | date(format="%B %d, %Y") }}</time>
            {% if page.extra.reading_time %}
            <span>• {{ page.reading_time }} min read</span>
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

## Styling with Sass

Create `sass/style.scss`:

```scss
// Variables
$primary-color: #2563eb;
$text-color: #1f2937;
$background: #ffffff;
$border-color: #e5e7eb;
$max-width: 800px;

// Base styles
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

// Layout
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

// Blog styles
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

// Responsive
@media (max-width: 768px) {
    header nav {
        flex-direction: column;
        gap: 1rem;
    }
}
```

## Adding Homepage

Create `content/_index.md`:

```markdown
+++
title = "Home"
template = "index.html"
+++
```

Create `templates/index.html`:

~~~html
{% extends "base.html" %}

{% block content %}
<div class="home">
    <h1>Welcome to {{ config.title }}</h1>
    <p class="intro">{{ config.description }}</p>
    
    {% set blog_section = get_section(path="blog/_index.md") %}
    {% if blog_section.pages %}
    <section class="recent-posts">
        <h2>Recent Posts</h2>
        <div class="posts">
            {% for page in blog_section.pages | slice(end=5) %}
            <article class="post-preview">
                <h3><a href="{{ page.permalink }}">{{ page.title }}</a></h3>
                <time datetime="{{ page.date }}">{{ page.date | date(format="%B %d, %Y") }}</time>
                {% if page.description %}
                <p>{{ page.description }}</p>
                {% endif %}
            </article>
            {% endfor %}
        </div>
        <a href="#" class="view-all">View all posts →</a>
    </section>
    {% endif %}
</div>
{% endblock %}
~~~

## Running Your Blog

Start the development server:

```bash
zola serve
```

Visit `http://127.0.0.1:1111` to see your blog. Changes to content and templates reload automatically.

## Building for Production

Build your site for deployment:

```bash
zola build
```

The static site is generated in the `public/` directory. Upload these files to any static hosting service.

## Deployment to GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Zola
        run: |
          wget https://github.com/getzola/zola/releases/download/v0.18.0/zola-v0.18.0-x86_64-unknown-linux-gnu.tar.gz
          tar xzf zola-v0.18.0-x86_64-unknown-linux-gnu.tar.gz
          sudo mv zola /usr/local/bin/
      
      - name: Build
        run: zola build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

Push to GitHub, enable GitHub Pages in your repository settings, and your blog deploys automatically on every push.

## Next Steps

Your blog is now functional. Consider adding:

**Featured posts**: Add a `featured` field to front matter and filter in templates
**Reading time**: Use `{{ page.reading_time }}` to show estimated reading time
**Table of contents**: Enable `insert_anchor_links = "left"` in config for heading anchors
**Search**: Implement search with Zola's search index feature
**Comments**: Integrate a commenting system like utterances or Disqus
**Analytics**: Add analytics with a simple script include

## Key Takeaways

Creating a blog with Zola is refreshingly straightforward:

1. **Content is just Markdown** with front matter—no complex APIs or abstractions
2. **Templates are Tera**—if you know Jinja2, you already know 90% of what you need
3. **Built-in features eliminate plugins**—Sass, syntax highlighting, RSS, and taxonomies work out of the box
4. **Fast iteration**—changes appear instantly during development
5. **Simple deployment**—static files can be hosted anywhere

The key to productive Zola development is embracing its opinions. The structure might feel restrictive at first, but it eliminates decision fatigue and lets you focus on content.

Start simple, write content, and expand as you need more features. Zola gets out of your way and lets you build.