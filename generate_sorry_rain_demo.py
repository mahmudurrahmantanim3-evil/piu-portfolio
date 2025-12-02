"""
Create a demo HTML that includes the current `style.css` and `script.js` and adds a small UI to show continuous "sorry" rain.
Run: python generate_sorry_rain_demo.py
"""
from pathlib import Path

root = Path(__file__).parent
css_path = root / 'style.css'
js_path = root / 'script.js'

css = css_path.read_text(encoding='utf-8') if css_path.exists() else '/* missing style.css */'
js = js_path.read_text(encoding='utf-8') if js_path.exists() else '/* missing script.js */'

html = [
    '<!doctype html>',
    '<html lang="bn">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width,initial-scale=1">',
    '  <title>Sorry Rain Demo</title>',
    '  <style>',
    css,
    '  /* demo-only overrides */',
    '  body{ min-height:100vh; background:#0b0b0d; }',
    '  .demo-bar{ position:fixed; left:12px; top:12px; z-index:10005; background:rgba(255,255,255,0.06); color:#fff; padding:6px 10px; border-radius:8px; }',
    '  </style>',
    '</head>',
    '<body>',
    '  <div class="demo-bar">Demo — click "Sorry Rain" toggle to start/stop</div>',
    '  <main style="display:flex; align-items:center; justify-content:center; min-height:100vh;">',
    '    <div style="text-align:center; color:#fff">',
    '      <h1>Sorry Rain Demo</h1>',
    '      <p>Use the toggle button bottom-right to start continuous Sorry rain.</p>',
    '    </div>',
    '  </main>',
    '  <script>',
    js,
    '  // Demo helper: click the toggle to start/stop if the toggle exists',
    '  (function(){',
    '    if (window.startSorryRain) {',
    '      // nothing',
    '    }',
    '  })();',
    '  </script>',
    '</body>',
    '</html>'
]

out = root / 'demo_sorry_rain.html'
out.write_text('\n'.join(html), encoding='utf-8')
print(f'Wrote {out}')
