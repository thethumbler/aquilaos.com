# aquilaos.com

The website of [AquilaOS](https://github.com/thethumbler/aquila), built with [Zola](https://www.getzola.org/).

```
zola serve      # http://127.0.0.1:1111, rebuilt on every change
zola build      # into public/
```

Pushes to `master` are built and deployed to GitHub Pages by
[.github/workflows/deploy.yml](.github/workflows/deploy.yml).

- `content/`: pages and blog posts (Markdown)
- `templates/`: Tera templates
- `sass/style.scss`: the stylesheet
- `data/`: the boot log shown on the home page, from a real boot in QEMU
- `static/`: fonts, images, `CNAME`

The fonts are IBM Plex Sans and Martian Mono (SIL Open Font License),
and unscii-16 by Viznut (public domain), the font of the AquilaOS
kernel's early console, for the top bar and the boot log.
