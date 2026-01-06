# Inkspire

A classic, elegant blog theme for modern developers built with Zola. Inkspire combines clean typography, beautiful code blocks, and a minimalist design to create the perfect platform for technical writing and developer blogs.

![Inkspire Theme](screenshot.png)

## Features

- 🎨 **Clean, Modern Design** - Minimalist aesthetic focused on content readability
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices
- 🌍 **Multilingual Support** - Built-in support for English and Spanish (easily extensible)
- 💻 **Beautiful Code Blocks** - Syntax highlighting with Zola's built-in support
- ⚡ **Fast & Lightweight** - No JavaScript frameworks, pure vanilla JS
- 🎯 **SEO Optimized** - Semantic HTML and proper meta tags
- 📝 **Content Styles** - Rich typography for all markdown elements
- 🏷️ **Tags & Categories** - Built-in taxonomy support
- 📄 **Multiple Page Types** - Homepage, articles, about page, and more
- 🎨 **Customizable Theme Variables** - Easy color and typography customization

## Demo

[Live Demo](https://inkspire-demo.example.com) <!-- Update with your demo URL -->

## Installation

### Option 1: As a Zola Theme

1. **Download the theme:**
   ```bash
   cd themes
   git clone https://github.com/josegarcia/inkspire.git
   ```

2. **Enable the theme in your `config.toml`:**
   ```toml
   theme = "inkspire"
   ```

3. **Copy example content (optional):**
   ```bash
   cp -r themes/inkspire/content/* content/
   ```

### Option 2: Use as a Template

Clone the entire repository as your site:

```bash
git clone https://github.com/josegarcia/inkspire.git my-blog
cd my-blog
zola serve
```

## Requirements

- Zola v0.4.0 or higher

## Configuration

### Basic Configuration

In your `config.toml`:

```toml
base_url = "https://yourdomain.com"
title = "Your Blog Name"
description = "Your blog description"

# Enable syntax highlighting
[markdown]
highlight_code = true
highlight_theme = "base16-ocean-dark"

# Author information
author = "Your Name"

# Language configuration
default_language = "en"

[languages.en]
title = "Your Blog"
description = "Your blog description"

[languages.es]
title = "Tu Blog"
description = "Descripción de tu blog"
```

### Menu Configuration

Configure your navigation menu in `config.toml`:

```toml
# English menu
[[extra.menu.en]]
name = "Home"
url = "/"

[[extra.menu.en]]
name = "Articles"
url = "/articles"

[[extra.menu.en]]
name = "About"
url = "/about"

[[extra.menu.en]]
name = "Pages"

    [[extra.menu.en.children]]
    name = "Tags"
    url = "/tags"

    [[extra.menu.en.children]]
    name = "Categories"
    url = "/categories"

# Spanish menu
[[extra.menu.es]]
name = "Inicio"
url = "/es/"

[[extra.menu.es]]
name = "Artículos"
url = "/es/articulos"

# ... add more Spanish menu items
```

### Footer Configuration

```toml
# Footer links for English
[[extra.footer.en]]
name = "Articles"
url = "/articles"

[[extra.footer.en]]
name = "About"
url = "/about"

[[extra.footer.en]]
name = "RSS"
url = "/atom.xml"

# Footer links for Spanish
[[extra.footer.es]]
name = "Artículos"
url = "/articulos"

# ... add more footer links

# Footer info text
[extra.footer]
info = 'Powered by <a href="https://www.getzola.org" target="_blank">Zola</a> and <a href="#">Inkspire</a>.'
```

### Taxonomies

Configure tags and categories:

```toml
[languages.en.taxonomies]
    { name = "categories", feed = true, paginate_by = 10 },
    { name = "tags", feed = true, paginate_by = 10 },

[languages.es.taxonomies]
    { name = "categories", feed = true, paginate_by = 10 },
    { name = "tags", feed = true, paginate_by = 10 },
```

## Content Structure

### Creating Articles

Create articles in `content/articles/posts/` or `content/articles/featured/`:

```markdown
+++
title = "My Article Title"
description = "A brief description of the article"
date = 2025-01-06

[taxonomies]
categories = ["Technology"]
tags = ["Zola", "Static Sites"]

[extra]
featured = false
image = ""
+++

Your article content here...
```

### Creating a Multilingual Article

For Spanish version, create a file with `.es.md` extension:

**English:** `content/articles/posts/my-article/index.md`
**Spanish:** `content/articles/posts/my-article/index.es.md`

Add `lang = "es"` to the Spanish version's frontmatter:

```markdown
+++
title = "Mi Artículo"
description = "Una breve descripción del artículo"
date = 2025-01-06
lang = "es"

[taxonomies]
categories = ["Tecnología"]
tags = ["Zola", "Sitios Estáticos"]
+++
```

### Creating an About Page

Create `content/about.md`:

```markdown
+++
title = "Your Name"
description = "Your title/role"
template = "about.html"
transparent = true

[extra]
intro = "Your introduction text"
bioWork1 = "First work experience"
bioPeriod1 = "2020-2023"
bioWork2 = "Second work experience"
bioPeriod2 = "2023-2024"
bioWork3 = "Current work"
bioPeriod3 = "2024 to present"
interest = "Your interests, separated by commas"
+++

Your bio paragraph here...
```

For Spanish version, create `content/about.es.md` with `lang = "es"`.

## Theme Customization

### Customizing Colors and Typography

The theme uses CSS variables defined in `static/css/_base.css`. You can customize:

#### Colors
```css
:root {
    --theme-primary: #3b82f6;           /* Main brand color */
    --theme-accent: #ec4899;            /* Accent color */
    --theme-bg-primary: #ffffff;        /* Background color */
    --theme-text-primary: #111827;      /* Text color */
    /* ... more variables */
}
```

#### Typography
```css
:root {
    --theme-title-size: 3rem;           /* Page title size */
    --theme-body-size: 1.125rem;        /* Body text size */
    --font-family-mono: "IBM Plex Mono"; /* Main font */
    /* ... more variables */
}
```

### Custom CSS

To add custom styles without modifying the theme:

1. Create `static/css/custom.css`
2. Import it in `templates/base.html`:

```html
<link rel="stylesheet" href="{{ get_url(path='css/custom.css') }}" />
```

## Content Features

### Headings

All heading levels (H1-H6) are styled with proper hierarchy.

### Code Blocks

Use fenced code blocks with language specification:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

Supported languages include Python, JavaScript, HTML, CSS, Rust, TypeScript, and more.

### Lists

- Unordered lists
- Ordered lists
- Nested lists
- Task lists with checkboxes

### Blockquotes

> Standard blockquote for quotes and callouts.

### Tables

Tables are fully styled with alternating row colors and hover effects.

### Images

Images are automatically responsive with rounded corners and shadows:

```markdown
![Alt text](/images/my-image.jpg "Image title")
```

## Templates

The theme includes these templates:

- `index.html` - Homepage
- `page.html` - Generic page template
- `section.html` - Section/listing pages
- `articles.html` - Articles listing
- `about.html` - About page with timeline
- `featured.html` - Featured articles component
- `partials/header.html` - Navigation header
- `partials/footer.html` - Footer
- `partials/paginator.html` - Pagination component

## Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/josegarcia/inkspire.git
cd inkspire

# Serve with Zola
zola serve

# Build for production
zola build
```

### Project Structure

```
inkspire/
├── config.toml          # Site configuration
├── content/             # Your content
│   ├── articles/        # Blog posts
│   │   ├── posts/       # Regular posts
│   │   └── featured/    # Featured posts
│   ├── about.md         # About page
│   └── style-guide.md   # Style guide page
├── static/              # Static assets
│   ├── css/             # Stylesheets
│   └── js/              # JavaScript
├── templates/           # Theme templates
│   └── partials/        # Reusable components
├── theme.toml           # Theme metadata
└── README.md            # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This theme is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE).

**What this means:**
- ✅ **Free for personal use** - Use it for your personal blog, portfolio, or hobby projects
- ✅ **Modify and adapt** - Customize the theme to fit your needs
- ✅ **Share** - Redistribute the theme (with attribution)
- ❌ **No commercial use** - Cannot be used for commercial websites or sold
- 🔄 **ShareAlike** - Any modifications must be shared under the same license

For commercial use, please [contact me](https://josegarcia.dev) for licensing options.

Full license: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Credits

- Built with [Zola](https://www.getzola.org/)
- Font: [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- Icons: SVG icons

## Author

**Jose Garcia**
- Website: [https://josegarcia.dev](https://josegarcia.dev)
- GitHub: [@josegarcia](https://github.com/josegarcia)

## Support

If you find this theme useful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📝 Improving documentation

---

Made with ❤️ for the Zola community
