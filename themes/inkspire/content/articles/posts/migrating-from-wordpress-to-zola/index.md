+++
title = "Migrating from WordPress to Zola: A Practical Guide"
description = "Moving from WordPress to a static site generator like Zola means trading dynamic complexity for static simplicity. Here's how to make the transition smooth, what to expect, and what you'll gain in the process."
date = 2025-11-21

[taxonomies]
categories = ["Simple Post"]
tags = ["Zola", "Bloging"]

[extra]
featured = false
image = ""
+++


I recently migrated a WordPress blog that had been running for years to Zola. The process took about a weekend, and the results were worth it: faster load times, zero maintenance overhead, and complete control over the output. Here's everything I learned.

## Why Leave WordPress?

WordPress is powerful, but that power comes with weight. My site was:
- Running on a VPS that needed updates and monitoring
- Using multiple plugins that occasionally broke after updates
- Loading slowly despite caching plugins
- Vulnerable to security issues requiring constant vigilance
- Costing monthly hosting fees

The blog was 95% static content. I wasn't using most of WordPress's dynamic features. A static site made more sense.

## Understanding What You're Trading

**What you lose:**
- Dynamic comments (replaceable with external services)
- Admin dashboard for editing (you'll edit markdown files)
- Plugin ecosystem (you build what you need)
- WYSIWYG editor (you'll write in markdown)
- Easy updates from browser (you'll push to git)

**What you gain:**
- Near-instant page loads
- Zero server maintenance
- No security vulnerabilities
- Free hosting options (GitHub Pages, Netlify, Cloudflare Pages)
- Complete control over output
- Version control for all content
- Ability to work offline

If you write in markdown and are comfortable with git, this trade-off is favorable.

## Step 1: Export Your WordPress Content

WordPress has a built-in export tool:

1. Go to Tools → Export in WordPress admin
2. Select "All content"
3. Download the XML file

This gives you a file with all posts, pages, comments, and metadata.

You can also use plugins like "WordPress to Jekyll Exporter" which exports directly to markdown, though you'll still need to adapt the format for Zola.

## Step 2: Convert Content to Markdown

WordPress exports to XML. Zola needs markdown with front matter. You have options:

**Option A: Use an existing converter**

Tools like `wordpress-export-to-markdown` (npm package) can help:

```bash
npm install -g wordpress-export-to-markdown
wordpress-export-to-markdown --input=export.xml --output=content/blog
```

**Option B: Write a conversion script**

I wrote a Python script to process the XML and convert to Zola-compatible markdown:

```python
import xml.etree.ElementTree as ET
from html2text import html2text
from datetime import datetime
import os
import re

def clean_filename(title):
    # Convert title to valid filename
    filename = title.lower()
    filename = re.sub(r'[^a-z0-9]+', '-', filename)
    return filename.strip('-')

def convert_wordpress_export(xml_file, output_dir):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # WordPress XML namespaces
    namespaces = {
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'wp': 'http://wordpress.org/export/1.2/'
    }
    
    for item in root.findall('.//item'):
        # Get post data
        title = item.find('title').text
        post_type = item.find('wp:post_type', namespaces).text
        status = item.find('wp:status', namespaces).text
        
        # Only process published posts
        if post_type != 'post' or status != 'publish':
            continue
            
        # Get content
        content_html = item.find('content:encoded', namespaces).text or ''
        content_md = html2text(content_html)
        
        # Get metadata
        date_str = item.find('wp:post_date', namespaces).text
        date = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
        
        # Get categories and tags
        categories = []
        tags = []
        for category in item.findall('category'):
            domain = category.get('domain')
            name = category.text
            if domain == 'category':
                categories.append(name)
            elif domain == 'post_tag':
                tags.append(name)
        
        # Create filename
        filename = f"{date.strftime('%Y-%m-%d')}-{clean_filename(title)}.md"
        filepath = os.path.join(output_dir, filename)
        
        # Create front matter
        front_matter = f"""+++
title = "{title}"
date = {date.strftime('%Y-%m-%d')}
"""
        
        if categories:
            front_matter += f"\n[taxonomies]\n"
            if tags:
                front_matter += f'tags = {tags}\n'
            if categories:
                front_matter += f'categories = {categories}\n'
        
        front_matter += "+++\n\n"
        
        # Write file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(front_matter + content_md)
        
        print(f"Converted: {title}")

# Usage
convert_wordpress_export('export.xml', 'content/blog')
```

Install required package: `pip install html2text`

This script:
- Parses the WordPress XML
- Converts HTML content to markdown
- Creates proper front matter
- Organizes files with dates in filenames
- Preserves categories and tags

## Step 3: Handle Images and Media

WordPress stores images in `wp-content/uploads/YEAR/MONTH/`. You need to:

**1. Download all images:**

Use wget or a WordPress plugin to download your media library:

```bash
wget -r -np -nH --cut-dirs=3 -R index.html \
  https://yoursite.com/wp-content/uploads/
```

**2. Move to Zola's static directory:**

```bash
mv uploads static/images
```

**3. Update image references:**

Your converted markdown will have references like:

    ![Alt text](https://yoursite.com/wp-content/uploads/2023/05/image.jpg)

Update them to:

    ![Alt text](/images/2023/05/image.jpg)

Use find and replace or a script:

```bash
# In your content directory
find . -name "*.md" -type f -exec sed -i \
  's|https://yoursite.com/wp-content/uploads|/images|g' {} +
```

## Step 4: Set Up Zola Structure

Create your Zola site:

```bash
zola init my-site
cd my-site
```

Move converted posts:

```bash
mkdir -p content/blog
mv ../converted-posts/*.md content/blog/
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
```

## Step 5: Handle URL Structure

WordPress typically uses URLs like:
- `yoursite.com/2023/05/post-title/`
- `yoursite.com/category/tech/post-title/`

Zola defaults to:
- `yoursite.com/blog/post-title/`

**Option 1: Accept new URLs and set up redirects**

Create a `_redirects` file for Netlify or use meta refresh in HTML:

    /2023/05/old-post-title/ /blog/old-post-title/ 301

**Option 2: Match WordPress structure**

Configure Zola's `config.toml`:

```toml
[slugify]
paths = "safe"
taxonomies = "safe"

# In your section front matter
[extra]
# You can customize paths per post
```

Or in individual posts, set custom paths:

```markdown
+++
title = "My Post"
date = 2023-05-15
path = "2023/05/my-post"
+++
```

## Step 6: Migrate Comments

WordPress comments can't directly transfer to static sites. Options:

**1. Use a third-party service:**
- Disqus (free, but ads)
- Utterances (GitHub-based, clean)
- Commento (open-source, self-hostable)

**2. Export and display statically:**

Export comments from WordPress, convert to markdown, and display them as static content at the bottom of posts.

**3. Disable comments:**

If comments weren't active or valuable, simply don't include them.

I chose Utterances for its simplicity and GitHub integration.

## Step 7: Create Templates

Build basic templates matching your WordPress design:

**Base template** (`templates/base.html`):

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}{{ config.title }}{% endblock %}</title>
        <link rel="stylesheet" href="#">
    </head>
    <body>
        <header>
            <nav>
                <a href="#">Home</a>
                <a href="#">Blog</a>
            </nav>
        </header>
        <main>
            {% block content %}{% endblock %}
        </main>
    </body>
    </html>

**Blog post template** (`templates/blog-page.html`):

    {% extends "base.html" %}
    
    {% block content %}
    <article>
        <h1>{{ page.title }}</h1>
        <time>{{ page.date | date(format="%B %d, %Y") }}</time>
        
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

## Step 8: Style Migration

Export your WordPress CSS or recreate the design. If you used a theme, you might need to rebuild styles from scratch.

Zola compiles Sass, so use that for organization:

```bash
mkdir sass
# Create sass/style.scss with your styles
```

## Step 9: Test Everything

Before going live:

1. **Check all internal links:**
   ```bash
   zola check
   ```

2. **Verify images load:**
   - Look for broken image links
   - Ensure paths are correct

3. **Test on local server:**
   ```bash
   zola serve
   ```

4. **Review post formatting:**
   - Check markdown rendering
   - Verify code blocks
   - Test list formatting

5. **Validate RSS feed:**
   - Check `public/rss.xml` after build

## Step 10: Deploy

Build the site:

```bash
zola build
```

Deploy the `public/` directory to:
- **GitHub Pages** (free)
- **Netlify** (free, easy continuous deployment)
- **Cloudflare Pages** (free, fast CDN)
- **Any static host**

For Netlify, create `netlify.toml`:

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

## Post-Migration Checklist

- [ ] All posts migrated and rendering correctly
- [ ] Images loading from new paths
- [ ] RSS feed working
- [ ] Internal links updated
- [ ] URL redirects configured
- [ ] Comments solution implemented (if wanted)
- [ ] Analytics added (if needed)
- [ ] Search functionality (if needed)
- [ ] Domain pointed to new host
- [ ] SSL certificate configured
- [ ] Old WordPress site backed up before shutdown

## What I Learned

**Week 1 after migration:**
- Pages loaded 10x faster
- No more plugin update anxiety
- Editing in markdown felt liberating
- Git history for all content was valuable

**Month 1:**
- Zero maintenance time spent
- Hosting costs dropped to $0
- Could work on posts offline
- Deploy workflow became natural

**Month 6:**
- Never looked back
- Writing more because the friction is gone
- Site is still fast, no degradation
- No security worries

## Common Issues and Solutions

**Problem: HTML in converted markdown looks messy**

Solution: Clean up the markdown manually or improve your conversion script. Some HTML is fine—Zola renders it.

**Problem: WordPress shortcodes don't convert**

Solution: Replace WordPress shortcodes with equivalent HTML or Zola shortcodes. Create custom shortcodes for complex elements.

**Problem: Featured images missing**

Solution: WordPress featured images need special handling. Extract them from the XML and add to front matter:

```markdown
+++
[extra]
featured_image = "/images/2023/05/featured.jpg"
+++
```

**Problem: Categories and tags not working**

Solution: Ensure taxonomies are configured in `config.toml` and properly formatted in front matter.

## Is Migration Worth It?

For me: absolutely. The trade-offs favor static generation when:
- Your site is mostly static content
- You're comfortable with markdown and git
- You want maximum performance
- You want to minimize maintenance
- Hosting costs matter

It's not worth it if:
- You need complex user interactions
- Multiple non-technical people need to edit content
- You heavily use WordPress-specific plugins
- You're not comfortable with command-line tools

## Resources That Helped

- Zola documentation (comprehensive)
- html2text Python library (HTML to markdown conversion)
- wordpress-export-to-markdown npm package
- Utterances for comments
- Netlify for hosting and deployment

The migration took one weekend of focused work. Six months later, I have zero regrets. The site is faster, cheaper to run, and more enjoyable to maintain. If your WordPress site is primarily a blog with static content, Zola is a compelling alternative.