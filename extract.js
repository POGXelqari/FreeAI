const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify');

const RAW_DIR = path.join(__dirname, 'raw');
const EXTRACTED_DIR = path.join(__dirname, 'extracted');
const CHUNKS_DIR = path.join(RAW_DIR, '_next', 'static', 'chunks');
const CSS_DIR = path.join(RAW_DIR, '_next', 'static', 'css');

const jsOptions = {
  indent_size: 2,
  indent_char: ' ',
  max_preserve_newlines: 2,
  preserve_newlines: true,
  keep_array_indentation: false,
  break_chained_methods: false,
  indent_scripts: 'normal',
  brace_style: 'collapse,preserve-inline',
  space_before_conditional: true,
  unescape_strings: false,
  jslint_happy: false,
  end_with_newline: true,
  wrap_line_length: 120,
  comma_first: false,
  e4x: true
};

const cssOptions = {
  indent_size: 2,
  indent_char: ' ',
  end_with_newline: true
};

const htmlOptions = {
  indent_size: 2,
  indent_char: ' ',
  end_with_newline: true,
  wrap_line_length: 120
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Map chunk name to category and clean name
function categorizeChunk(filename) {
  // strip hash e.g. "auth-modal.component-hFpdr88a.js" -> name: "auth-modal.component", hash: "hFpdr88a"
  const m = filename.match(/^(.+)-([a-zA-Z0-9_-]{6,10})\.js$/);
  let base = filename.replace(/\.js$/, '');
  let hash = '';
  if (m) {
    base = m[1];
    hash = m[2];
  }

  // Categories
  if (base.includes('.component')) {
    return { category: 'components', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.service')) {
    return { category: 'services', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.hook') || base.startsWith('use-') || base.startsWith('useQuery') || base.startsWith('useMutation') || base.startsWith('useInfiniteQuery')) {
    return { category: 'hooks', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.store')) {
    return { category: 'stores', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.provider')) {
    return { category: 'providers', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.model')) {
    return { category: 'models', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.util')) {
    return { category: 'utils', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.constant')) {
    return { category: 'constants', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.interface')) {
    return { category: 'interfaces', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.module')) {
    return { category: 'modules', cleanName: base + '.js', base, hash };
  }
  if (base.includes('.api')) {
    return { category: 'api', cleanName: base + '.js', base, hash };
  }

  // Icons check
  const iconNames = [
    'arrow-up-right', 'arrow-right', 'chevron-down', 'chevron-left', 'chevron-right',
    'folder', 'globe', 'plug-2', 'settings', 'tag', 'loader-circle', 'x', 'check',
    'circle', 'circle-alert', 'circle-question-mark', 'lock', 'mail', 'mic', 'camera',
    'image', 'palette', 'plus', 'search', 'menu', 'magnifier', 'copy', 'download',
    'share', 'files', 'logo-icon', 'logo-icon-white', 'logo-spinner', 'microsoft-logo'
  ];
  if (iconNames.some(i => base === i || base.startsWith(i))) {
    return { category: 'icons', cleanName: base + '.js', base, hash };
  }

  // UI Components
  const uiNames = [
    'button', 'badge', 'card', 'dialog', 'drawer', 'dropdown-menu', 'input',
    'popover', 'separator', 'skeleton', 'tooltip', 'greeting', 'attachment'
  ];
  if (uiNames.some(u => base === u || base.startsWith(u))) {
    return { category: 'components/ui', cleanName: base + '.js', base, hash };
  }

  // Vendor / frameworks
  const vendorNames = [
    'react', 'zod', 'floating-ui', 'rolldown', 'framework', 'vinext', 'dist-',
    'es2015', 'js.cookie', 'v4', 'bundle-mjs', 'pure', 'shallow', 'turnstile'
  ];
  if (vendorNames.some(v => base.startsWith(v) || base.includes(v))) {
    return { category: 'vendor', cleanName: base + '.js', base, hash };
  }

  return { category: 'modules', cleanName: base + '.js', base, hash };
}

async function run() {
  console.log('Starting extraction and beautification...');
  ensureDir(EXTRACTED_DIR);
  const srcDir = path.join(EXTRACTED_DIR, 'src');
  ensureDir(srcDir);

  const manifest = {
    source: 'https://use.ai',
    extractedAt: new Date().toISOString(),
    totalChunks: 0,
    categories: {},
    files: []
  };

  // 1. Process JS chunks
  if (fs.existsSync(CHUNKS_DIR)) {
    const chunkFiles = fs.readdirSync(CHUNKS_DIR).filter(f => f.endsWith('.js'));
    manifest.totalChunks = chunkFiles.length;
    console.log(`Processing ${chunkFiles.length} JavaScript chunks...`);

    for (const file of chunkFiles) {
      const { category, cleanName, base, hash } = categorizeChunk(file);
      const targetSubDir = path.join(srcDir, category);
      ensureDir(targetSubDir);

      const rawPath = path.join(CHUNKS_DIR, file);
      const rawCode = fs.readFileSync(rawPath, 'utf8');

      // Beautify code
      let formattedCode;
      try {
        formattedCode = beautify.js(rawCode, jsOptions);
      } catch (err) {
        formattedCode = rawCode;
      }

      // Prepend metadata header
      const header = `/**\n * Source: https://use.ai/_next/static/chunks/${file}\n * Module: ${base}\n * Extracted & Beautified\n */\n\n`;
      const outPath = path.join(targetSubDir, cleanName);
      fs.writeFileSync(outPath, header + formattedCode, 'utf8');

      manifest.categories[category] = (manifest.categories[category] || 0) + 1;
      manifest.files.push({
        rawChunk: file,
        category,
        extractedPath: path.relative(EXTRACTED_DIR, outPath).replace(/\\/g, '/'),
        sizeBytes: formattedCode.length
      });
    }
  }

  // 2. Process CSS
  if (fs.existsSync(CSS_DIR)) {
    const cssFiles = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
    const stylesDir = path.join(srcDir, 'styles');
    ensureDir(stylesDir);

    for (const file of cssFiles) {
      const rawCss = fs.readFileSync(path.join(CSS_DIR, file), 'utf8');
      const formattedCss = beautify.css(rawCss, cssOptions);
      const outPath = path.join(stylesDir, 'layout.css');
      fs.writeFileSync(outPath, formattedCss, 'utf8');
      console.log(`Extracted & beautified CSS: ${file} -> styles/layout.css`);
    }
  }

  // 3. Process HTML pages
  const htmlFiles = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.html'));
  const pagesDir = path.join(EXTRACTED_DIR, 'pages');
  ensureDir(pagesDir);

  for (const file of htmlFiles) {
    const rawHtml = fs.readFileSync(path.join(RAW_DIR, file), 'utf8');
    const formattedHtml = beautify.html(rawHtml, htmlOptions);
    const outPath = path.join(pagesDir, file);
    fs.writeFileSync(outPath, formattedHtml, 'utf8');
    console.log(`Extracted & beautified HTML: ${file}`);
  }

  // 4. Extract environment config and secrets from env chunk
  const envChunk = fs.readdirSync(CHUNKS_DIR).find(f => f.startsWith('env-'));
  if (envChunk) {
    console.log(`Extracting environment configuration from ${envChunk}...`);
    const envRaw = fs.readFileSync(path.join(CHUNKS_DIR, envChunk), 'utf8');
    const configDir = path.join(EXTRACTED_DIR, 'config');
    ensureDir(configDir);

    // Extract runtimeEnv object
    const match = envRaw.match(/runtimeEnv:\{([^}]+)\}/);
    if (match) {
      const pairs = {};
      const regex = /([A-Z0-9_]+):`([^`]*)`/g;
      let m;
      while ((m = regex.exec(match[1])) !== null) {
        pairs[m[1]] = m[2];
      }
      fs.writeFileSync(path.join(configDir, 'runtime-env.json'), JSON.stringify(pairs, null, 2), 'utf8');
      console.log('Wrote config/runtime-env.json with extracted keys');
    }
  }

  // 5. Write manifest.json
  fs.writeFileSync(path.join(EXTRACTED_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Extraction completed successfully!');
  console.log('Category breakdown:', manifest.categories);
}

run().catch(err => {
  console.error('Error during extraction:', err);
  process.exit(1);
});
