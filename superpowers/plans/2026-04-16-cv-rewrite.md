# CV Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create two print-to-PDF CV versions for Bahaa Mohammed — an ATS-optimized single-column version for job portals, and a visually designed two-column version for direct sends and freelance clients.

**Architecture:** Both CVs are self-contained HTML files with inline `<style>` blocks and `@media print` rules. No external dependencies. Open in browser → Ctrl+P / Cmd+P → Save as PDF. Files live in `docs/cv/`.

**Tech Stack:** HTML5, CSS3 (print media queries, CSS Grid), no JavaScript, no external fonts (system fonts for ATS safety, Google Fonts only in designed version via `<link>`).

---

## File Map

| File | Purpose |
|------|---------|
| `docs/cv/cv-ats.html` | ATS version — single column, system fonts, zero graphics |
| `docs/cv/cv-designed.html` | Designed version — two-column, brand colors, metric callouts, QR code |

---

## Task 1: Create CV directory and ATS skeleton

**Files:**
- Create: `docs/cv/cv-ats.html`

- [ ] **Step 1: Create the file with full ATS HTML skeleton**

Create `/Users/bahaam/Desktop/CV/docs/cv/cv-ats.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bahaa Mohammed - CV (ATS)</title>
  <style>
    /* Reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }

    /* Base - ATS safe: system fonts only, single column, no tables */
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      color: #000000;
      background: #fff;
      padding: 32px 40px;
      max-width: 820px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* Header */
    .header { margin-bottom: 18px; }
    .header h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.5px; }
    .header .title { font-size: 12pt; color: #333; margin: 4px 0 8px; }
    .header .contact { font-size: 10pt; color: #444; }
    .header .contact a { color: #000; text-decoration: none; }
    .header .contact span { margin: 0 6px; color: #aaa; }

    /* Section headings */
    h2 {
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1.5px solid #000;
      padding-bottom: 3px;
      margin: 18px 0 10px;
    }

    /* Summary */
    .summary p { font-size: 10.5pt; line-height: 1.6; }

    /* Skills */
    .skills-grid { display: block; }
    .skill-row { margin-bottom: 4px; font-size: 10.5pt; }
    .skill-row strong { display: inline-block; min-width: 130px; }

    /* Experience */
    .job { margin-bottom: 16px; }
    .job-header { display: flex; justify-content: space-between; align-items: baseline; }
    .job-title { font-weight: 700; font-size: 10.5pt; }
    .job-company { font-size: 10.5pt; }
    .job-date { font-size: 10pt; color: #555; white-space: nowrap; }
    .job ul { margin: 6px 0 0 18px; }
    .job ul li { font-size: 10.5pt; margin-bottom: 3px; line-height: 1.5; }

    /* Education */
    .edu-header { display: flex; justify-content: space-between; }
    .edu-degree { font-weight: 700; font-size: 10.5pt; }
    .edu-date { font-size: 10pt; color: #555; }
    .edu-detail { font-size: 10.5pt; margin-top: 2px; }

    /* Projects */
    .project-item { margin-bottom: 6px; font-size: 10.5pt; }
    .project-item strong { font-weight: 700; }

    /* Languages */
    .lang-item { font-size: 10.5pt; margin-bottom: 3px; }

    /* Print */
    @media print {
      body { padding: 18px 24px; font-size: 10.5pt; }
      @page { margin: 1.2cm 1.5cm; size: A4; }
      h2 { page-break-after: avoid; }
      .job { page-break-inside: avoid; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <h1>Bahaa Mohammed</h1>
    <div class="title">Full-Stack Product Engineer &amp; AI-Augmented Developer</div>
    <div class="contact">
      Dubai, UAE
      <span>·</span> +971 54 321 4323
      <span>·</span> <a href="mailto:Bahaam.coding@gmail.com">Bahaam.coding@gmail.com</a>
      <span>·</span> <a href="https://ibahaaaldin.github.io">ibahaaaldin.github.io</a>
      <span>·</span> <a href="https://linkedin.com/in/ibahaaaldin">linkedin.com/in/ibahaaaldin</a>
    </div>
  </div>

  <!-- PROFESSIONAL SUMMARY -->
  <h2>Professional Summary</h2>
  <div class="summary">
    <p>Full-Stack Developer and AI-Augmented Engineer with 3+ years shipping production marketplaces, SaaS platforms, and web applications. Delivered systems serving 12,400+ users with 1.8M AED/month in transaction volume across 26+ client deployments. Proficient in Python, JavaScript, Next.js, React, Java, and SQL. Expert-level use of AI development tools: Claude, Claude Code, ChatGPT, Gemini, GitHub Copilot. Fluent English and Arabic. Seeking full-time and freelance opportunities in UAE and remotely.</p>
  </div>

  <!-- TECHNICAL SKILLS -->
  <h2>Technical Skills</h2>
  <div class="skills-grid">
    <div class="skill-row"><strong>Languages:</strong> Python, JavaScript, Java, HTML5, CSS3, SQL, PHP</div>
    <div class="skill-row"><strong>Frameworks:</strong> React, Next.js, Node.js, Tailwind CSS, Java Swing, Tkinter</div>
    <div class="skill-row"><strong>Tools:</strong> Git, GitHub, Figma, REST APIs, JSON, Formspree</div>
    <div class="skill-row"><strong>AI Tools:</strong> Claude, Claude Code, ChatGPT, Gemini, Grok, GitHub Copilot, Cursor</div>
    <div class="skill-row"><strong>Specialties:</strong> Marketplace development, SaaS dashboards, multi-role systems, payment integration, bilingual EN/AR web apps, admin panels, UI/UX design</div>
  </div>

  <!-- EXPERIENCE -->
  <h2>Experience</h2>

  <div class="job">
    <div class="job-header">
      <span class="job-title">Full-Stack Developer &amp; IT Lead</span>
      <span class="job-date">Jan 2024 – Present</span>
    </div>
    <div class="job-company">Deluxe Lubricants International · Dubai, UAE</div>
    <ul>
      <li>Built and deployed deluxelube.com — a production product platform serving customers across 50+ countries</li>
      <li>Developed full admin CMS enabling product management, catalog control, and customer tracking</li>
      <li>Improved website performance by 20%; resolved 50+ technical issues monthly</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span class="job-title">Freelance Full-Stack Developer</span>
      <span class="job-date">2022 – Present</span>
    </div>
    <div class="job-company">Self-Employed · Dubai, UAE</div>
    <ul>
      <li>Designed and shipped CarzUAE (carzuae.app) — verified UAE vehicle marketplace with 12,400+ users, dealer subscription tiers, car history reports, and WhatsApp integration, built on Next.js/React</li>
      <li>Built Designers Puzzle (designerspuzzle.com) — multi-role design services marketplace with escrow payments, 2,347+ verified reviews (4.8/5 rating), and 1.8M AED/month transaction volume</li>
      <li>Delivered 26+ production websites for UAE restaurants across Dubai and Sharjah — all bilingual (EN/AR) with admin dashboards and menu management systems</li>
      <li>Leveraged AI tools (Claude Code, ChatGPT, GitHub Copilot) to accelerate delivery, shipping full platforms in 7–10 days</li>
    </ul>
  </div>

  <!-- EDUCATION -->
  <h2>Education</h2>
  <div class="edu-header">
    <span class="edu-degree">B.Sc. Computer Science — Artificial Intelligence</span>
    <span class="edu-date">Sep 2023 – 2027 (Expected)</span>
  </div>
  <div class="edu-detail">The British University in Dubai · GPA: 3.7/4.0 · Focus: AI, Machine Learning, Web Development, Database Systems</div>

  <!-- KEY PROJECTS -->
  <h2>Key Projects</h2>
  <div class="project-item"><strong>CarzUAE</strong> — UAE verified vehicle marketplace · 12,400+ users · <a href="https://carzuae.app/en">carzuae.app/en</a></div>
  <div class="project-item"><strong>Designers Puzzle</strong> — Design services marketplace · 1.8M AED/month · <a href="https://designerspuzzle.com">designerspuzzle.com</a></div>
  <div class="project-item"><strong>DeluxeLube Platform</strong> — Corporate product catalog · 50+ countries · <a href="https://deluxelube.com">deluxelube.com</a></div>
  <div class="project-item"><strong>26+ Restaurant Websites</strong> — Bilingual EN/AR, admin dashboards · e.g. <a href="https://hamasatburger.com">hamasatburger.com</a></div>

  <!-- LANGUAGES -->
  <h2>Languages</h2>
  <div class="lang-item"><strong>Arabic</strong> — Native</div>
  <div class="lang-item"><strong>English</strong> — Fluent (professional)</div>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `docs/cv/cv-ats.html` in Chrome/Safari. Verify:
- All sections render (Summary, Skills, Experience, Education, Projects, Languages)
- No garbled characters in the Arabic name fields
- Text is readable at ~11pt

- [ ] **Step 3: Print test**

Cmd+P (Mac) → Save as PDF. Verify:
- Fits on 1–2 A4 pages
- No content cut off at page breaks
- Links appear as text (not colored/underlined, which wastes ATS parsing)

- [ ] **Step 4: Commit**

```bash
cd /Users/bahaam/Desktop/CV
git add docs/cv/cv-ats.html
git commit -m "feat: add ATS-optimized CV (single-column, print-to-PDF)"
```

---

## Task 2: Build the Designed CV

**Files:**
- Create: `docs/cv/cv-designed.html`

- [ ] **Step 1: Create the designed CV file**

Create `/Users/bahaam/Desktop/CV/docs/cv/cv-designed.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bahaa Mohammed - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --brand: #00a2ff;
      --brand-dark: #0080cc;
      --text: #1a1a1a;
      --muted: #666;
      --light: #f5f8ff;
      --border: #e0e8f0;
    }

    body {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 10.5pt;
      color: var(--text);
      background: #fff;
      display: grid;
      grid-template-columns: 220px 1fr;
      grid-template-rows: auto 1fr;
      min-height: 100vh;
    }

    /* ─── HEADER (full width) ─── */
    .cv-header {
      grid-column: 1 / -1;
      background: var(--text);
      color: #fff;
      padding: 28px 32px 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .cv-header h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 26pt;
      font-weight: 700;
      letter-spacing: -1px;
    }
    .cv-header .title {
      color: var(--brand);
      font-size: 11pt;
      font-weight: 600;
      margin-top: 4px;
    }
    .cv-header .contact-right {
      text-align: right;
      font-size: 9.5pt;
      line-height: 1.8;
      color: #ccc;
    }
    .cv-header .contact-right a { color: #fff; text-decoration: none; }

    /* ─── SIDEBAR ─── */
    .sidebar {
      background: var(--light);
      border-right: 1px solid var(--border);
      padding: 24px 20px;
    }

    .sidebar h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--brand);
      margin: 18px 0 10px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid var(--brand);
    }
    .sidebar h2:first-child { margin-top: 0; }

    /* Metric callouts */
    .metric {
      background: #fff;
      border: 1px solid var(--border);
      border-left: 3px solid var(--brand);
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 8px;
    }
    .metric .number {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16pt;
      font-weight: 700;
      color: var(--brand);
      line-height: 1.1;
    }
    .metric .label {
      font-size: 8.5pt;
      color: var(--muted);
      margin-top: 2px;
    }

    /* Skill tags */
    .skill-tag {
      display: inline-block;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 3px 8px;
      font-size: 8.5pt;
      margin: 0 3px 4px 0;
    }

    /* AI tools */
    .ai-tool {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 9pt;
      margin-bottom: 5px;
    }
    .ai-dot {
      width: 6px; height: 6px;
      background: var(--brand);
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* What I build */
    .build-item {
      font-size: 9pt;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .build-icon { font-size: 11pt; }

    /* Languages */
    .lang-bar {
      margin-bottom: 8px;
    }
    .lang-name { font-size: 9.5pt; font-weight: 600; margin-bottom: 3px; }
    .lang-level { font-size: 8.5pt; color: var(--muted); }

    /* Status badge */
    .status-badge {
      background: var(--brand);
      color: #fff;
      font-size: 8.5pt;
      font-weight: 600;
      border-radius: 20px;
      padding: 5px 12px;
      text-align: center;
      margin-top: 16px;
    }

    /* ─── MAIN CONTENT ─── */
    .main {
      padding: 24px 28px;
    }

    .main h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--brand);
      border-bottom: 1.5px solid var(--brand);
      padding-bottom: 4px;
      margin: 20px 0 12px;
    }
    .main h2:first-child { margin-top: 0; }

    /* Summary */
    .summary { font-size: 10pt; line-height: 1.7; color: #333; }

    /* Job */
    .job { margin-bottom: 18px; }
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }
    .job-title { font-weight: 700; font-size: 10.5pt; }
    .job-date {
      font-size: 9pt;
      color: var(--muted);
      white-space: nowrap;
      background: var(--light);
      padding: 2px 8px;
      border-radius: 10px;
    }
    .job-company { font-size: 9.5pt; color: var(--muted); margin-bottom: 6px; }
    .job ul { margin-left: 16px; }
    .job ul li { font-size: 9.5pt; margin-bottom: 3px; line-height: 1.5; }

    /* Education */
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .edu-degree { font-weight: 700; font-size: 10.5pt; }
    .edu-date {
      font-size: 9pt;
      color: var(--muted);
      background: var(--light);
      padding: 2px 8px;
      border-radius: 10px;
    }
    .edu-detail { font-size: 9.5pt; color: var(--muted); margin-top: 3px; }
    .gpa-badge {
      display: inline-block;
      background: var(--brand);
      color: #fff;
      font-size: 8.5pt;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
      margin-left: 8px;
    }

    /* Projects */
    .project-card {
      border: 1px solid var(--border);
      border-left: 3px solid var(--brand);
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .project-name { font-weight: 700; font-size: 10pt; }
    .project-desc { font-size: 9pt; color: var(--muted); margin-top: 2px; }
    .project-link { font-size: 8.5pt; color: var(--brand); text-decoration: none; white-space: nowrap; }

    /* Print */
    @media print {
      body { font-size: 9.5pt; }
      @page { margin: 0.8cm 1cm; size: A4; }
      .cv-header { padding: 18px 24px 16px; }
      .cv-header h1 { font-size: 22pt; }
      .main, .sidebar { padding: 16px 18px; }
      .job { margin-bottom: 12px; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="cv-header">
    <div>
      <h1>Bahaa Mohammed</h1>
      <div class="title">Full-Stack Product Engineer &amp; AI-Augmented Developer</div>
    </div>
    <div class="contact-right">
      Dubai, UAE<br>
      <a href="tel:+971543214323">+971 54 321 4323</a><br>
      <a href="mailto:Bahaam.coding@gmail.com">Bahaam.coding@gmail.com</a><br>
      <a href="https://ibahaaaldin.github.io">ibahaaaldin.github.io</a><br>
      <a href="https://linkedin.com/in/ibahaaaldin">linkedin.com/in/ibahaaaldin</a>
    </div>
  </header>

  <!-- SIDEBAR -->
  <aside class="sidebar">

    <h2>Impact</h2>
    <div class="metric">
      <div class="number">1.8M AED</div>
      <div class="label">Monthly transaction volume</div>
    </div>
    <div class="metric">
      <div class="number">12,400+</div>
      <div class="label">Platform users</div>
    </div>
    <div class="metric">
      <div class="number">26+</div>
      <div class="label">Client websites delivered</div>
    </div>
    <div class="metric">
      <div class="number">3.7 GPA</div>
      <div class="label">British University in Dubai</div>
    </div>

    <h2>AI Tools</h2>
    <div class="ai-tool"><span class="ai-dot"></span>Claude &amp; Claude Code</div>
    <div class="ai-tool"><span class="ai-dot"></span>ChatGPT &amp; Gemini</div>
    <div class="ai-tool"><span class="ai-dot"></span>Grok</div>
    <div class="ai-tool"><span class="ai-dot"></span>GitHub Copilot</div>
    <div class="ai-tool"><span class="ai-dot"></span>Cursor</div>

    <h2>Tech Stack</h2>
    <span class="skill-tag">Python</span>
    <span class="skill-tag">JavaScript</span>
    <span class="skill-tag">React</span>
    <span class="skill-tag">Next.js</span>
    <span class="skill-tag">Java</span>
    <span class="skill-tag">Node.js</span>
    <span class="skill-tag">HTML5</span>
    <span class="skill-tag">CSS3</span>
    <span class="skill-tag">SQL</span>
    <span class="skill-tag">PHP</span>
    <span class="skill-tag">Git</span>
    <span class="skill-tag">Figma</span>

    <h2>What I Build</h2>
    <div class="build-item"><span class="build-icon">🏪</span>Marketplace platforms</div>
    <div class="build-item"><span class="build-icon">🍽️</span>Restaurant websites</div>
    <div class="build-item"><span class="build-icon">🤖</span>AI integrations</div>
    <div class="build-item"><span class="build-icon">🏢</span>Corporate platforms</div>

    <h2>Languages</h2>
    <div class="lang-bar">
      <div class="lang-name">Arabic</div>
      <div class="lang-level">Native speaker</div>
    </div>
    <div class="lang-bar">
      <div class="lang-name">English</div>
      <div class="lang-level">Fluent — professional</div>
    </div>

    <div class="status-badge">✓ Available for hire</div>

  </aside>

  <!-- MAIN CONTENT -->
  <main class="main">

    <h2>Professional Summary</h2>
    <div class="summary">
      Full-Stack Developer and AI-Augmented Engineer with 3+ years shipping production marketplaces, SaaS platforms, and web applications. Delivered systems serving 12,400+ users with 1.8M AED/month in transaction volume across 26+ client deployments. Expert-level use of all major AI development tools. Fluent English and Arabic. Seeking full-time and freelance opportunities in UAE and remotely.
    </div>

    <h2>Experience</h2>

    <div class="job">
      <div class="job-header">
        <span class="job-title">Full-Stack Developer &amp; IT Lead</span>
        <span class="job-date">Jan 2024 – Present</span>
      </div>
      <div class="job-company">Deluxe Lubricants International · Dubai, UAE</div>
      <ul>
        <li>Built and deployed deluxelube.com — production platform serving customers across 50+ countries</li>
        <li>Developed full admin CMS: product management, catalog control, customer tracking</li>
        <li>Improved website performance by 20%; resolved 50+ technical issues monthly</li>
      </ul>
    </div>

    <div class="job">
      <div class="job-header">
        <span class="job-title">Freelance Full-Stack Developer</span>
        <span class="job-date">2022 – Present</span>
      </div>
      <div class="job-company">Self-Employed · Dubai, UAE</div>
      <ul>
        <li>Shipped CarzUAE (carzuae.app) — verified UAE vehicle marketplace, 12,400+ users, dealer subscription tiers, car history reports, Next.js/React</li>
        <li>Built Designers Puzzle (designerspuzzle.com) — multi-role marketplace, escrow payments, 2,347+ reviews (4.8/5), 1.8M AED/month transaction volume</li>
        <li>Delivered 26+ production restaurant websites across Dubai &amp; Sharjah — bilingual EN/AR, admin dashboards, menu management systems</li>
        <li>Uses AI tools (Claude Code, ChatGPT, Copilot) to ship full platforms in 7–10 days</li>
      </ul>
    </div>

    <h2>Education</h2>
    <div class="edu-header">
      <span class="edu-degree">B.Sc. Computer Science — Artificial Intelligence <span class="gpa-badge">3.7 GPA</span></span>
      <span class="edu-date">2023 – 2027</span>
    </div>
    <div class="edu-detail">The British University in Dubai · Focus: AI, Machine Learning, Web Development, Database Systems</div>

    <h2>Key Projects</h2>

    <div class="project-card">
      <div>
        <div class="project-name">CarzUAE</div>
        <div class="project-desc">UAE verified vehicle marketplace · 12,400+ users · Next.js, React, Payments</div>
      </div>
      <a class="project-link" href="https://carzuae.app/en">carzuae.app ↗</a>
    </div>

    <div class="project-card">
      <div>
        <div class="project-name">Designers Puzzle</div>
        <div class="project-desc">Design services marketplace · 1.8M AED/month · Multi-role, Escrow, Dashboards</div>
      </div>
      <a class="project-link" href="https://designerspuzzle.com">designerspuzzle.com ↗</a>
    </div>

    <div class="project-card">
      <div>
        <div class="project-name">DeluxeLube Platform</div>
        <div class="project-desc">Corporate product catalog · 50+ countries · Admin CMS</div>
      </div>
      <a class="project-link" href="https://deluxelube.com">deluxelube.com ↗</a>
    </div>

    <div class="project-card">
      <div>
        <div class="project-name">26+ Restaurant Websites</div>
        <div class="project-desc">Bilingual EN/AR · Admin dashboards · Menu systems · Dubai &amp; Sharjah</div>
      </div>
      <a class="project-link" href="https://hamasatburger.com">hamasatburger.com ↗</a>
    </div>

  </main>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify layout**

Open `docs/cv/cv-designed.html` in Chrome/Safari. Verify:
- Two-column layout renders (sidebar left, content right)
- Header spans full width in dark background
- Blue metric callouts show (1.8M AED, 12,400+, 26+, 3.7 GPA)
- Skill tags and AI tools list render in sidebar
- All 4 project cards render with live links

- [ ] **Step 3: Print test**

Cmd+P → Save as PDF → Verify:
- Fits on 1 A4 page (or max 2 if content overflows)
- Colors print (check "Background graphics" in print dialog)
- Links show correctly
- No content cut off

- [ ] **Step 4: Commit**

```bash
cd /Users/bahaam/Desktop/CV
git add docs/cv/cv-designed.html
git commit -m "feat: add designed two-column CV with metric callouts and brand styling"
```

---

## Task 3: Final verification and PDF export

**Files:**
- No code changes — verification only

- [ ] **Step 1: ATS keyword check**

Open `docs/cv/cv-ats.html` in browser. Use Ctrl+F to confirm these ATS keywords appear verbatim:
- "Full-Stack Developer"
- "AI-Augmented"
- "Next.js"
- "React"
- "Python"
- "JavaScript"
- "marketplace"
- "bilingual"
- "English and Arabic"

All must be in plain text (not inside images or SVGs).

- [ ] **Step 2: Export both PDFs**

ATS version:
1. Open `docs/cv/cv-ats.html` in Chrome
2. Cmd+P → Destination: Save as PDF → Paper: A4 → Margins: Default → Save as `docs/cv/Bahaa-Mohammed-CV-ATS.pdf`

Designed version:
1. Open `docs/cv/cv-designed.html` in Chrome
2. Cmd+P → Destination: Save as PDF → Paper: A4 → Margins: None → **Enable "Background graphics"** → Save as `docs/cv/Bahaa-Mohammed-CV.pdf`

- [ ] **Step 3: Replace root CV.pdf with designed version**

```bash
cp /Users/bahaam/Desktop/CV/docs/cv/Bahaa-Mohammed-CV.pdf /Users/bahaam/Desktop/CV/CV.pdf
```

- [ ] **Step 4: Final commit**

```bash
cd /Users/bahaam/Desktop/CV
git add docs/cv/Bahaa-Mohammed-CV-ATS.pdf docs/cv/Bahaa-Mohammed-CV.pdf CV.pdf
git commit -m "feat: export and publish both CV versions as PDF"
```

---

## Self-Review

**Spec coverage:**
- [x] Version 1A (ATS) — Task 1
- [x] Version 1B (Designed) — Task 2
- [x] Two-column layout with skill sidebar — Task 2
- [x] Metric callouts (12,400+, 1.8M AED, 26+) — Task 2
- [x] ATS keyword list (Python, React, Next.js, etc.) — Task 1 skills section
- [x] Experience rewrites ("built and deployed" not "assisted") — Tasks 1 & 2
- [x] All 4 live project URLs — Tasks 1 & 2
- [x] "Available for hire" status badge — Task 2 sidebar
- [x] When-to-send-which guidance — covered in spec (reference `docs/superpowers/specs/2026-04-16-cv-portfolio-design.md`)
- [x] PDF export — Task 3
- [x] ATS keyword verification — Task 3 Step 1

**Gaps found:** None. All spec requirements covered.

**Placeholder scan:** No TBDs, TODOs, or vague steps. Every step has exact file paths, exact HTML, or exact commands.

**Type/name consistency:** No functions or types — HTML only. Element class names are consistent across tasks (`.job`, `.job-header`, `.metric`, `.skill-tag`, etc.).
