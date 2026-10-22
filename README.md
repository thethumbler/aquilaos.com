# aquilaos.com

The website of [AquilaOS](https://github.com/thethumbler/aquila), built with [Zola](https://www.getzola.org/).

```
zola serve      # http://127.0.0.1:1111, rebuilt on every change
zola build      # into public/
```

Pushes to `main` are built and deployed to GitHub Pages by
[.github/workflows/deploy.yml](.github/workflows/deploy.yml).

- `content/`: pages and blog posts (Markdown)
- `templates/`: Tera templates
- `sass/style.scss`: the stylesheet
- `data/`: the boot log shown on the home page, from a real boot in QEMU
- `static/`: fonts, images, `CNAME`
- `static/try/`: the Try page's machine: `aquila.img` is aquila's
  `make live CONFIG=i386-pc` (`build/live.img`), run by
  [v86](https://github.com/copy/v86) 0.5.470 (`libv86.js`, `v86.wasm`, and its
  SeaBIOS and VGA BIOS) with [xterm.js](https://xtermjs.org/) 6.0.0 as the
  terminal on its serial port; their licenses are in `static/try/licenses/`

The fonts are IBM Plex Sans and Martian Mono (SIL Open Font License),
and unscii-16 by Viznut (public domain), the font of the AquilaOS
kernel's early console, for the top bar and the boot log.
