import fs from 'fs';
import path from 'path';
import Book from './models/Book.js';

// SVG Generation Helpers
function generateCyberpunkCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#05050d"/>
          <stop offset="50%" stop-color="#0c0f26"/>
          <stop offset="100%" stop-color="#1c052a"/>
        </linearGradient>
        <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00f2fe"/>
          <stop offset="100%" stop-color="#bd00ff"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="800" fill="url(#bg)"/>
      <g opacity="0.1">
        <line x1="50" y1="0" x2="50" y2="800" stroke="#00f2fe" stroke-width="1"/>
        <line x1="150" y1="0" x2="150" y2="800" stroke="#00f2fe" stroke-width="1"/>
        <line x1="250" y1="0" x2="250" y2="800" stroke="#00f2fe" stroke-width="1"/>
        <line x1="350" y1="0" x2="350" y2="800" stroke="#00f2fe" stroke-width="1"/>
        <line x1="450" y1="0" x2="450" y2="800" stroke="#00f2fe" stroke-width="1"/>
        <line x1="550" y1="0" x2="550" y2="800" stroke="#00f2fe" stroke-width="1"/>
        <line x1="0" y1="100" x2="600" y2="100" stroke="#bd00ff" stroke-width="1"/>
        <line x1="0" y1="200" x2="600" y2="200" stroke="#bd00ff" stroke-width="1"/>
        <line x1="0" y1="300" x2="600" y2="300" stroke="#bd00ff" stroke-width="1"/>
        <line x1="0" y1="400" x2="600" y2="400" stroke="#bd00ff" stroke-width="1"/>
        <line x1="0" y1="500" x2="600" y2="500" stroke="#bd00ff" stroke-width="1"/>
        <line x1="0" y1="600" x2="600" y2="600" stroke="#bd00ff" stroke-width="1"/>
      </g>
      <path d="M 0 500 L 100 350 L 120 350 L 150 400 L 220 280 L 250 280 L 300 480 L 400 320 L 450 320 L 500 420 L 600 250 L 600 800 L 0 800 Z" fill="#0d0e1b"/>
      <path d="M 0 550 L 80 450 L 140 500 L 190 380 L 260 490 L 380 340 L 420 340 L 480 470 L 600 380 L 600 800 L 0 800 Z" fill="#131730" opacity="0.8"/>
      <ellipse cx="300" cy="500" rx="200" ry="10" fill="none" stroke="#bd00ff" stroke-width="2" opacity="0.3" filter="url(#glow)"/>
      <ellipse cx="300" cy="530" rx="350" ry="15" fill="none" stroke="#00f2fe" stroke-width="2" opacity="0.4" filter="url(#glow)"/>
      <text x="300" y="160" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="52" font-weight="900" fill="#00f2fe" filter="url(#glow)">CYBERPUNK</text>
      <text x="300" y="220" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="44" font-weight="900" fill="#bd00ff" filter="url(#glow)">ODYSSEY</text>
      <text x="300" y="270" text-anchor="middle" font-family="'Inter', sans-serif" font-size="20" font-weight="700" fill="#ffffff" letter-spacing="8">NEO-TOKYO</text>
      <path d="M 300 450 Q 280 430 260 450 T 220 520 T 180 620 L 180 800 L 420 800 L 420 620 T 380 520 T 340 450 Z" fill="#06070c"/>
      <circle cx="300" cy="420" r="30" fill="#06070c"/>
      <path d="M 285 418 L 315 418" stroke="#00f2fe" stroke-width="6" stroke-linecap="round" filter="url(#glow)"/>
      <path d="M 270 410 L 285 418 L 280 430 Z" fill="#bd00ff" opacity="0.7"/>
      <rect x="50" y="700" width="160" height="36" rx="18" fill="url(#neonGlow)"/>
      <text x="130" y="723" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" font-weight="800" fill="#000000">WEBTOON ORIGINAL</text>
      <text x="550" y="760" text-anchor="end" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#94a3b8">BY JAX RAZER</text>
    </svg>`;
}

function generateAlchemistCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#140f07"/>
          <stop offset="50%" stop-color="#2d1c08"/>
          <stop offset="100%" stop-color="#100b05"/>
        </linearGradient>
        <radialGradient id="magicCircleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#b45309" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="600" height="800" fill="url(#bg)"/>
      <circle cx="300" cy="500" r="220" fill="url(#magicCircleGlow)"/>
      <circle cx="300" cy="500" r="180" fill="none" stroke="#f59e0b" stroke-width="2" opacity="0.6" filter="url(#glow)"/>
      <circle cx="300" cy="500" r="140" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="10 5" opacity="0.8"/>
      <polygon points="300,320 455,590 145,590" fill="none" stroke="#d97706" stroke-width="2" opacity="0.6" filter="url(#glow)"/>
      <polygon points="300,680 145,410 455,410" fill="none" stroke="#d97706" stroke-width="2" opacity="0.6" filter="url(#glow)"/>
      <rect x="20" y="20" width="560" height="760" rx="8" fill="none" stroke="#d97706" stroke-width="2" opacity="0.4"/>
      <rect x="30" y="30" width="540" height="740" rx="6" fill="none" stroke="#d97706" stroke-width="0.8" opacity="0.2"/>
      <text x="300" y="508" text-anchor="middle" font-family="serif" font-size="28" font-weight="700" fill="#fef08a" opacity="0.8" filter="url(#glow)">🜂 🜔 🜁 🜃</text>
      <text x="300" y="160" text-anchor="middle" font-family="'Outfit', serif" font-size="46" font-weight="900" fill="#fef08a" filter="url(#glow)">THE LOST</text>
      <text x="300" y="225" text-anchor="middle" font-family="'Outfit', serif" font-size="54" font-weight="900" fill="#f59e0b" filter="url(#glow)">ALCHEMIST</text>
      <line x1="200" y1="260" x2="400" y2="260" stroke="#f59e0b" stroke-width="2"/>
      <path d="M 270 420 L 330 420 L 310 490 Q 300 500 300 510 Q 300 520 310 530 L 330 600 L 270 600 L 290 530 Q 300 520 300 510 Q 300 500 290 490 Z" fill="#1e130a" stroke="#d97706" stroke-width="4"/>
      <path d="M 280 560 L 320 560 L 330 600 L 270 600 Z" fill="#ef4444" filter="url(#glow)" opacity="0.8"/>
      <circle cx="300" cy="570" r="5" fill="#ffffff" opacity="0.9"/>
      <circle cx="315" cy="585" r="3" fill="#ffffff" opacity="0.9"/>
      <text x="300" y="730" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" font-weight="600" fill="#d97706">BY AURELIA VANCE</text>
    </svg>`;
}

function generateRomanceCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="40%" stop-color="#ffe4e6"/>
          <stop offset="100%" stop-color="#fecdd3"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="4" flood-opacity="0.15"/>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="600" height="800" fill="url(#bg)"/>
      <g fill="#fda4af" opacity="0.7">
        <path d="M 50 150 Q 55 140 65 145 T 75 160 T 60 170 Z" transform="rotate(15, 60, 155)"/>
        <path d="M 500 200 Q 505 190 515 195 T 525 210 T 510 220 Z" transform="rotate(-10, 510, 205)"/>
        <path d="M 120 500 Q 125 490 135 495 T 145 510 T 130 520 Z" transform="rotate(45, 130, 505)"/>
        <path d="M 450 620 Q 455 610 465 615 T 475 630 T 460 640 Z" transform="rotate(30, 460, 625)"/>
        <path d="M 280 80 Q 285 70 295 75 T 305 90 T 290 100 Z" transform="rotate(-25, 290, 90)"/>
      </g>
      <path d="M 300 480 C 300 480 180 380 180 280 C 180 190 250 160 300 220 C 350 160 420 190 420 280 C 420 380 300 480 300 480 Z" fill="#ffb7c5" opacity="0.5" filter="url(#glow)"/>
      <g transform="translate(180, 450)" filter="url(#shadow)">
        <path d="M 50 250 C 50 150 110 130 110 130 C 110 130 100 80 80 80 C 60 80 40 100 40 100 C 40 100 20 80 20 110 C 20 140 40 150 40 150 C 40 150 20 160 20 190 C 20 220 50 250 50 250 Z" fill="#e11d48"/>
        <path d="M 190 250 C 190 150 130 130 130 130 C 130 130 140 80 160 80 C 180 80 200 100 200 100 C 200 100 220 80 220 110 C 220 140 200 150 200 150 C 200 150 220 160 220 190 C 220 220 190 250 190 250 Z" fill="#0284c7"/>
      </g>
      <line x1="300" y1="120" x2="300" y2="700" stroke="#db2777" stroke-width="2" stroke-dasharray="10 6" opacity="0.4"/>
      <text x="300" y="160" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="44" font-weight="900" fill="#be123c" filter="url(#glow)">LOVE IN</text>
      <text x="300" y="215" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="40" font-weight="900" fill="#db2777">PARALLEL LINES</text>
      <text x="300" y="255" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" font-weight="700" fill="#e11d48" letter-spacing="4">A ROM-COM TALE</text>
      <path d="M 150 720 Q 300 700 450 720" fill="none" stroke="#db2777" stroke-width="4" stroke-linecap="round"/>
      <text x="300" y="760" text-anchor="middle" font-family="'Inter', sans-serif" font-size="15" font-weight="600" fill="#db2777">BY HARU &amp; YUKI</text>
    </svg>`;
}

function generateSovereignCodeCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <rect width="600" height="800" fill="#090d16"/>
      <circle cx="300" cy="400" r="200" fill="none" stroke="#7c5cfc" stroke-width="4" opacity="0.3"/>
      <text x="300" y="250" text-anchor="middle" font-family="'monospace'" font-size="44" font-weight="bold" fill="#7c5cfc">&lt;SOVEREIGN&gt;</text>
      <text x="300" y="320" text-anchor="middle" font-family="'monospace'" font-size="52" font-weight="900" fill="#ffffff">CODE</text>
      <text x="300" y="480" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" fill="#94a3b8">A Reincarnated Coder's Story</text>
      <rect x="150" y="530" width="300" height="4" fill="#7c5cfc"/>
      <text x="300" y="700" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" fill="#94a3b8">BY ELENA VANCE</text>
    </svg>`;
}

function generateApprenticeCoverSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
      <rect width="600" height="800" fill="#1b120c"/>
      <circle cx="300" cy="400" r="180" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10 5" opacity="0.4"/>
      <text x="300" y="240" text-anchor="middle" font-family="serif" font-size="40" font-style="italic" fill="#fef08a">The Alchemist's</text>
      <text x="300" y="310" text-anchor="middle" font-family="serif" font-size="52" font-weight="bold" fill="#f59e0b">APPRENTICE</text>
      <text x="300" y="470" text-anchor="middle" font-family="'Inter', sans-serif" font-size="18" fill="#a1a1aa">Path of the Arcane Formula</text>
      <path d="M280 500 L320 500 L300 560 Z" fill="#ef4444" opacity="0.8"/>
      <text x="300" y="700" text-anchor="middle" font-family="'Inter', sans-serif" font-size="16" fill="#a1a1aa">BY AURELIA VANCE</text>
    </svg>`;
}

function generateComicPageSvg(comicTitle, chTitle, pageNum, text1, text2, accentColor, bgGradientId, stopColor1, stopColor2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900" width="100%" height="100%">
      <defs>
        <linearGradient id="${bgGradientId}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="${stopColor1}"/>
          <stop offset="100%" stop-color="${stopColor2}"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="3" dy="5" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
        <filter id="bubbleShadow">
          <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.2"/>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect width="600" height="900" fill="url(#${bgGradientId})"/>
      <rect x="0" y="0" width="600" height="40" fill="#000000" opacity="0.4"/>
      <text x="20" y="25" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#ffffff" opacity="0.8">${comicTitle.toUpperCase()}</text>
      <text x="580" y="25" text-anchor="end" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="${accentColor}">${chTitle.toUpperCase()} - PAGE ${pageNum}</text>
      <g filter="url(#shadow)">
        <rect x="30" y="70" width="540" height="240" rx="8" fill="#000000" opacity="0.5" stroke="${accentColor}" stroke-width="2"/>
        <g opacity="0.15" stroke="#ffffff" stroke-width="2">
          <line x1="30" y1="70" x2="150" y2="190"/>
          <line x1="570" y1="70" x2="450" y2="190"/>
          <line x1="30" y1="310" x2="150" y2="190"/>
          <line x1="570" y1="310" x2="450" y2="190"/>
          <line x1="300" y1="70" x2="300" y2="310"/>
          <line x1="30" y1="190" x2="570" y2="190"/>
        </g>
        <circle cx="150" cy="190" r="40" fill="${accentColor}" opacity="0.4" filter="url(#glow)"/>
        <line x1="150" y1="190" x2="450" y2="190" stroke="#ffffff" stroke-width="4" stroke-dasharray="10 5"/>
        <g filter="url(#bubbleShadow)" transform="translate(320, 110)">
          <path d="M 10 0 L 200 0 A 10 10 0 0 1 210 10 L 210 60 A 10 10 0 0 1 200 70 L 40 70 L 20 85 L 30 70 L 10 70 A 10 10 0 0 1 0 60 L 0 10 A 10 10 0 0 1 10 0 Z" fill="#ffffff"/>
          <text x="105" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#000000">${text1.split('|')[0] || ''}</text>
          <text x="105" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#000000">${text1.split('|')[1] || ''}</text>
        </g>
      </g>
      <g filter="url(#shadow)">
        <rect x="30" y="340" width="540" height="260" rx="8" fill="#000000" opacity="0.6" stroke="${accentColor}" stroke-width="2"/>
        <g stroke="${accentColor}" stroke-width="1" opacity="0.3">
          <line x1="30" y1="470" x2="570" y2="470"/>
          <line x1="120" y1="340" x2="120" y2="600"/>
          <line x1="480" y1="340" x2="480" y2="600"/>
        </g>
        <polygon points="300,370 340,450 260,450" fill="#ffffff" opacity="0.2"/>
        <circle cx="300" cy="470" r="30" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.4" stroke-dasharray="5 3"/>
        <g filter="url(#bubbleShadow)" transform="translate(60, 470)">
          <path d="M 10 0 L 220 0 A 10 10 0 0 1 230 10 L 230 60 A 10 10 0 0 1 220 70 L 190 70 L 200 85 L 170 70 L 10 70 A 10 10 0 0 1 0 60 L 0 10 A 10 10 0 0 1 10 0 Z" fill="#ffffff"/>
          <text x="115" y="32" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#000000">${text2.split('|')[0] || ''}</text>
          <text x="115" y="48" text-anchor="middle" font-family="'Inter', sans-serif" font-size="12" font-weight="700" fill="#000000">${text2.split('|')[1] || ''}</text>
        </g>
      </g>
      <g filter="url(#shadow)">
        <rect x="30" y="630" width="540" height="210" rx="8" fill="#000000" opacity="0.7" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="6 3"/>
        <path d="M 30 735 Q 300 680 570 735 L 570 840 L 30 840 Z" fill="${accentColor}" opacity="0.2"/>
        <text x="300" y="700" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="2">THWIP! WHOOSH!</text>
        <text x="300" y="760" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#94a3b8">The journey continues in the next chapter...</text>
      </g>
      <text x="300" y="880" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="12" font-weight="700" fill="#ffffff" opacity="0.2" letter-spacing="4">TOONVERSE WEBTOON READER</text>
    </svg>`;
}

function generateMockComments() {
  return [
    {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: 'MangaFan99',
      avatar: 'M',
      content: 'Wow, the art style here is absolutely insane! Love the neon gradients.',
      timestamp: new Date(Date.now() - 3600000 * 2)
    },
    {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: 'WebtoonWatcher',
      avatar: 'W',
      content: 'This cliffhanger is illegal! Need the next chapter immediately!',
      timestamp: new Date(Date.now() - 3600000 * 5)
    },
    {
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      username: 'SaitamaSensei',
      avatar: 'S',
      content: 'Highly recommended! The panel layout is super dynamic.',
      timestamp: new Date(Date.now() - 3600000 * 24)
    }
  ];
}

export async function seedDatabase() {
  try {
    const bookCount = await Book.countDocuments();
    if (bookCount > 0) {
      console.log('Database already has data. Skipping seeder...');
      return;
    }

    console.log('Database empty! Seeding default books and generating SVG files...');

    const COVERS_DIR = path.join(process.cwd(), 'uploads', 'covers');
    const CHAPTERS_DIR = path.join(process.cwd(), 'uploads', 'chapters');

    if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });
    if (!fs.existsSync(CHAPTERS_DIR)) fs.mkdirSync(CHAPTERS_DIR, { recursive: true });

    // Save Cover SVGs to disk
    const cpCoverPath = '/uploads/covers/cyberpunk_cover.svg';
    const alCoverPath = '/uploads/covers/alchemist_cover.svg';
    const rmCoverPath = '/uploads/covers/romance_cover.svg';
    const scCoverPath = '/uploads/covers/sovereign_cover.svg';
    const aaCoverPath = '/uploads/covers/apprentice_cover.svg';

    fs.writeFileSync(path.join(process.cwd(), 'uploads', 'covers', 'cyberpunk_cover.svg'), generateCyberpunkCoverSvg());
    fs.writeFileSync(path.join(process.cwd(), 'uploads', 'covers', 'alchemist_cover.svg'), generateAlchemistCoverSvg());
    fs.writeFileSync(path.join(process.cwd(), 'uploads', 'covers', 'romance_cover.svg'), generateRomanceCoverSvg());
    fs.writeFileSync(path.join(process.cwd(), 'uploads', 'covers', 'sovereign_cover.svg'), generateSovereignCodeCoverSvg());
    fs.writeFileSync(path.join(process.cwd(), 'uploads', 'covers', 'apprentice_cover.svg'), generateApprenticeCoverSvg());

    // 1. Cyberpunk Odyssey Chapters
    const cpChapters = [];
    const cpTitles = [
      'Chapter 1: The Neon Run',
      'Chapter 2: Cyber Grid Hack',
      'Chapter 3: Singularity Breach'
    ];
    const cpPagesText = [
      [
        { t1: 'NEO-TOKYO. 2099.|A city of glass and light.', t2: 'Jax: target acquired.|Initiating mainframe run...' },
        { t1: 'Jax: Uh oh, ice firewall!|They detected my terminal!', t2: 'Jax: Ready the cyber-shields.|This is gonna be rough!' }
      ],
      [
        { t1: 'Jax: Deep in the virtual matrix.|Data packet is inside.', t2: 'A.I. Core: Jax Razer.|You shouldn\'t have come here.' },
        { t1: 'Jax: Access denied?|I\'ll bypass the main terminal!', t2: 'Grid Police: Intruder detected!|Lockdown initiated!' }
      ],
      [
        { t1: 'Jax: The singularity portal...|It\'s opening up!', t2: 'Hacker Overlord: Jax!|Turn back, it\'s a trap!' },
        { t1: 'Jax: No turning back now.|Uploading the firewall core!', t2: ' Jax: System override complete.|Downloading consciousness...' }
      ]
    ];

    for (let c = 0; c < 3; c++) {
      const pageImageIds = [];
      const numPages = 2;
      for (let p = 0; p < numPages; p++) {
        const filename = `cp_ch${c+1}_p${p+1}.svg`;
        const fileContent = generateComicPageSvg(
          'Cyberpunk Odyssey',
          cpTitles[c],
          p + 1,
          cpPagesText[c][p].t1,
          cpPagesText[c][p].t2,
          '#00f2fe',
          `grad_cp_ch${c+1}_p${p+1}`,
          '#0a0813', '#1b082e'
        );
        fs.writeFileSync(path.join(CHAPTERS_DIR, filename), fileContent);
        pageImageIds.push(`/uploads/chapters/${filename}`);
      }

      cpChapters.push({
        id: `ch_cp_${c+1}`,
        title: cpTitles[c],
        pageImageIds,
        group: c % 2 === 0 ? 'Asura Scans' : 'Luminous Scans',
        likes: 124 + c * 43,
        volume: 'Vol. 1',
        createdAt: new Date(Date.now() - (3 - c) * 3600000 * 24),
        comments: generateMockComments(),
      });
    }


    const defaultBooks = [
      {
        id: 'cyberpunk_odyssey',
        title: 'Cyberpunk Odyssey: Neo-Tokyo',
        author: 'Jax Razer',
        description: 'Jax Razer is a freelance netrunner in Neo-Tokyo, 2099. When he takes a contract to extract an encrypted data core from a high-profile corporate mainframe, he uncovers a singularity project that could change humanity forever.',
        genres: ['Action'],
        type: 'comic',
        coverImageId: cpCoverPath,
        rating: 4.9,
        ratingsCount: 22,
        views: 1420,
        isFavorite: true,
        uploadedBy: 'system',
        createdAt: new Date(Date.now() - 5 * 24 * 3600000),
        chapters: cpChapters,
        comments: generateMockComments(),
      },
      {
        id: 'sovereign_code',
        title: 'Sovereign Code',
        author: 'Elena Vance',
        description: 'In a digital fantasy realm, a veteran systems administrator is reincarnated into the body of a low-tier rune scholar. With a virtual debugger terminal built directly into his consciousness, he begins analyzing the world\'s source code. But as he fixes runtime glitches in ancient circles, he realizes someone is intentionally compiling corrupted packages to trigger a worldwide stack overflow.',
        genres: ['Action'],
        type: 'novel',
        coverImageId: scCoverPath,
        rating: 4.8,
        ratingsCount: 35,
        views: 920,
        isFavorite: false,
        uploadedBy: 'system',
        createdAt: new Date(Date.now() - 2 * 24 * 3600000),
        chapters: [
          {
            id: 'ch_sc_1',
            title: 'Chapter 1: The Runtime Awakening',
            content: `I opened my eyes, and the world was rendering in slow motion.\n\nFloating green lines of hexadecimal parameters cascaded across my field of vision. It was a terminal output, yet there was no screen in front of me. The characters resolved directly into my visual cortex.\n\n[Warning: Thread starvation detected in central consciousness engine.]\n[Action: Allocating memory buffers. Initializing system_daemon...]\n\n"What in the...?" I tried to speak, but my throat was parched. My hands were small, thin, and covered in blue ink stains instead of the calloused fingers of a senior systems engineer who had survived thirty years of server room fires.\n\n"He's awake!" a voice cried. A girl in a brown linen dress, her hair braided with dried lavender, leaned over me. "Father, the elixir worked! The spiritual core collapse has stabilized!"\n\nI sat up, my head spinning as the system output updated.\n\n[Process completed. Target status: STABLE. Reincarnation sequence: 100% complete.]\n\nI wasn't in my server room anymore. I was in a body that wasn't mine, in a world where magic was compiled in real-time, and I had a terminal console in my head. This was going to be a long debugging session.`,
            group: 'WuxiaWorld',
            likes: 382,
            volume: 'Vol. 1',
            createdAt: new Date(Date.now() - 2 * 24 * 3600000),
            comments: generateMockComments()
          },
          {
            id: 'ch_sc_2',
            title: 'Chapter 2: Compiling the First Rune',
            content: `The parchment before me was covered in silver ink. To the locals, this was the Rune of Spark—a sacred, volatile inscription that only licensed spell-weavers could craft after years of meditation.\n\nTo me, it looked like a poorly written Bash script with an unclosed if-statement.\n\n"Let's see," I murmured, squinting at the rune's circular boundary. A virtual window popped up in my mind.\n\n[Target Analysis: Spark Inscription]\n[Syntax Error: Missing closing delimiter at offset 124. Compiler will fail with SIGSEGV on activation.]\n\nNo wonder the apprentice next to me had blown off his eyebrows yesterday. The code was literally leaking energy due to a syntax error.\n\nI picked up the quill, dipped it in the silver conduction ink, and carefully drew a small crescent stroke near the outer ring. The unclosed loop was now sealed.\n\n[Syntax check: PASS. Optimization factor: +15%. Ready for compile.]\n\nI channeled a drop of my spiritual energy into the ink. The paper didn't just spark; it emitted a steady, brilliant white flame that burned without consuming the parchment.\n\n"By the gods," my instructor gasped, dropping his lens. "An optimized runic flame! Without chanting?!"\n\n"Just fixed a bug, Master," I smiled, wiping my ink-stained fingers.`,
            group: 'WuxiaWorld',
            likes: 412,
            volume: 'Vol. 1',
            createdAt: new Date(Date.now() - 1 * 24 * 3600000),
            comments: generateMockComments()
          }
        ],
        comments: generateMockComments(),
      }
    ];

    await Book.insertMany(defaultBooks);
    console.log('Example comics database seeding successfully completed!');
  } catch (error) {
    console.error('Failed to seed default books:', error);
  }
}
export default seedDatabase;
