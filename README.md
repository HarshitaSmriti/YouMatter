<div align="center">

<br/>

<!-- Logo placeholder — replace src with your actual logo -->
<img width="125" height="125" alt="image" src="https://github.com/user-attachments/assets/cdc943a9-9e4e-48a0-aee4-b11e50b3afce" />

<br/><br/>

# YouMatter 💙

### *Your AI companion that cares.*

<p align="center">
  A compassionate AI-powered mental health companion and lab report interpreter —<br/>
  built to make wellbeing support accessible to everyone, everywhere, always.
</p>

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-youmatter.app-C4B5F4?style=for-the-badge&labelColor=2D2350)](https://youmatter.app)
[![License](https://img.shields.io/badge/License-MIT-93C5FD?style=for-the-badge&labelColor=2D2350)](LICENSE)

[![Welcome](https://img.shields.io/badge/PRs-welcome-FBBF9A?style=for-the-badge&labelColor=2D2350)](CONTRIBUTING.md)

<br/>

![YouMatter Banner](https://placehold.co/900x300/C4B5F4/2D2350?text=YouMatter+%E2%80%94+Your+AI+Companion+That+Cares&font=playfair-display)

</div>

---

## 🌸 What is YouMatter?

**YouMatter** is a free, judgment-free AI mental health companion and health report interpreter built for everyone — especially students, young adults, and anyone navigating the maze of modern healthcare without a guide.

We believe two things deeply:

> **1. Mental health support should never be a luxury.**
> **2. No one should feel lost looking at their own lab report.**

YouMatter bridges both gaps with a warm, human-first AI experience powered by cutting-edge language models — wrapped in a design that feels like a hug, not a hospital.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 💬 Talk to Aasha
Your 24/7 AI companion trained in CBT and mindfulness principles. Listens without judgment, validates your feelings, and guides you toward calm — at 3am or 3pm.

</td>
<td width="50%">

### 📋 Lab Report Interpreter
Upload any PDF blood test. Our AI reads 50+ parameters, flags what's low/high/critical, and explains everything in plain language you actually understand.

</td>
</tr>
<tr>
<td width="50%">

### 🌬️ Guided Breathing
Box breathing, 4-7-8, Deep Calm — animated exercises that ground your nervous system in minutes. No app downloads. Just breathe.

</td>
<td width="50%">

### 📓 Mood Journal
Log your feelings daily. Watch patterns emerge. Celebrate your growth. Every entry is private, encrypted, and yours alone.

</td>
</tr>
<tr>
<td width="50%">

### 📊 Mood Tracker
Visualize your emotional journey over days, weeks, and months. Aasha notices your patterns and gently checks in when you need it most.

</td>
<td width="50%">

### 🆘 Crisis Support
Built-in crisis detection. Instant access to iCall, Vandrevala Foundation, and Snehi helplines. You are never alone — we make sure of it.

</td>
</tr>
</table>

---

## 🖥️ Screenshots

<div align="center">

| Landing Page | Chat with Aasha | Lab Report |
|:---:|:---:|:---:|
| ![Landing](https://placehold.co/280x180/F5EEFF/6B5CA5?text=Landing+Page) | ![Chat](https://placehold.co/280x180/EBF4FF/2D2350?text=Chat+Interface) | ![Report](https://placehold.co/280x180/FFF0F5/9B8ED4?text=Lab+Report) |

| Dashboard | Breathing | Mood Tracker |
|:---:|:---:|:---:|
| ![Dashboard](https://placehold.co/280x180/F5EEFF/6B5CA5?text=Dashboard) | ![Breathe](https://placehold.co/280x180/EBF4FF/2D2350?text=Breathing) | ![Mood](https://placehold.co/280x180/FFF0F5/9B8ED4?text=Mood+Tracker) |

*Replace placeholders with actual screenshots before publishing*

</div>

---

## 🎨 Design Language

YouMatter's visual identity is built around **softness, warmth, and trust** — inspired by the logo's lavender-human and blue-AI silhouettes forming a heart together.

```
Colors ────────────────────────────────────────────────────
  Primary Lavender   #C4B5F4   ████  Warmth, calm, human
  Soft Blue          #93C5FD   ████  Technology, clarity
  Blush Pink         #F4A8C0   ████  Empathy, care
  Warm Peach         #FBBF9A   ████  Energy, optimism
  Deep Navy          #2D2350   ████  Stability, trust

Typography ────────────────────────────────────────────────
  Display  →  Playfair Display (emotional, editorial)
  Body     →  Nunito (warm, friendly, highly readable)

Shapes ────────────────────────────────────────────────────
  Pill buttons · Cloud-like cards · Glass morphism surfaces
  No sharp corners. Anywhere. Ever.
```

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) + TypeScript | SSR, type safety, production-ready |
| **Styling** | Tailwind CSS | Utility-first, rapid UI, responsive |
| **Auth** | Supabase Auth (Magic Link) | No passwords, frictionless onboarding |
| **Database** | Supabase PostgreSQL + RLS | Free tier, row-level security by default |
| **File Storage** | Supabase Storage | Private PDF storage, 1GB free |
| **PDF Parsing** | pdf-parse / PyMuPDF | Extract lab parameters server-side |
| **AI Core** | Anthropic Claude API (claude-haiku) | Fast, accurate, empathetic responses |
| **Hosting** | Vercel | Free tier, auto CI/CD, edge network |
| **Analytics** | PostHog (free tier) | Privacy-first user analytics |

> 💡 **Total infrastructure cost for MVP: $0.** Built entirely on free tiers.

---
## Frontend Overview

- Built using modern UI practices
- Communicates with backend via REST APIs
- Handles user interaction, mood input, and chat interface
- Designed for responsive and accessible user experience

---

## 🏗️ Project Structure

```
youmatter/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + fonts
│   ├── page.tsx                  # Landing page
│   ├── auth/page.tsx             # Magic link auth
│   └── dashboard/
│       ├── layout.tsx            # Dashboard shell (sidebar + topbar)
│       ├── page.tsx              # Home dashboard
│       ├── chat/[id]/page.tsx    # Aasha chat interface
│       ├── breathe/page.tsx      # Guided breathing
│       ├── journal/page.tsx      # Mood journal
│       ├── mood/page.tsx         # Mood tracker
│       └── reports/[id]/page.tsx # Lab report detail
│
├── components/
│   ├── layout/                   # Sidebar, Navbar, BottomNav
│   ├── ui/                       # Button, Card, Badge, Modal
│   ├── chat/                     # ChatBubble, TypingIndicator, CrisisPanel
│   ├── lab/                      # ParameterCard, ReportSummary, UploadZone
│   ├── mood/                     # MoodOrb, MoodHistory, MoodCheckIn
│   ├── breathe/                  # BreathingCircle (animated SVG)
│   └── landing/                  # Hero, Features, HowItWorks, Footer
│
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── claude.ts                 # Anthropic API helpers
│   ├── pdfParser.ts              # PDF extraction logic
│   ├── mockData.ts               # Dev mock data
│   └── types.ts                  # TypeScript interfaces
│
├── supabase/
│   └── schema.sql                # Full DB schema with RLS policies
│
└── public/
    └── logo.png                  # YouMatter logo
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account (free) → [supabase.com](https://supabase.com)
- An Anthropic API key → [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the repository

```bash
git clone https://github.com/a4e-team/youmatter.git
cd youmatter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Anthropic
ANTHROPIC_API_KEY=sk-ant-your-key-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up the database

```bash
# Run the schema in your Supabase SQL editor, or:
npx supabase db push
```

Or paste the contents of `supabase/schema.sql` directly into your Supabase SQL editor.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see YouMatter's landing page. 🌸

---

## 🗄️ Database Schema

```sql
-- Core tables (all with Row Level Security enabled)

profiles          -- User profiles (extends Supabase Auth)
  └── id, name, age, created_at

lab_reports       -- Uploaded lab PDFs and AI analysis
  └── id, user_id, file_url, raw_text, parameters (jsonb), summary, created_at

chat_sessions     -- Mental health chat sessions
  └── id, user_id, title, created_at

chat_messages     -- Individual messages in a session
  └── id, session_id, role (user|assistant), content, created_at

mood_logs         -- Daily mood check-ins
  └── id, user_id, mood, score, note, created_at

journal_entries   -- Private journal entries
  └── id, user_id, title, content, mood, tags, created_at
```

> 🔒 All tables have **Row Level Security (RLS)** enabled. Users can only ever access their own data.

---

## 🤖 AI Prompt Architecture

YouMatter uses two core AI prompts, carefully engineered for safety and empathy:

### Aasha — Mental Health Companion

```
System: You are Aasha, a compassionate AI mental health companion.
You are trained in CBT and mindfulness. You listen, validate, and guide.

Rules:
- Never diagnose. Never prescribe.
- On crisis signals → immediately surface iCall (9152987821)
  and Vandrevala Foundation (1860-2662-345)
- Keep responses warm, 2-4 sentences, end with an open question
- Ground responses in evidence-based techniques
```

### Lab Report Interpreter

```
System: You are a medical lab report interpreter.

Output: Structured JSON with:
  - parameters[]: name, value, unit, range, status, plain-English explanation
  - summary: 3-sentence overview in simple language
  - doctor_questions: 3 questions to ask at next appointment

Rules:
- Never diagnose. Always "consult your doctor."
- Flag critical values clearly but calmly
- Output ONLY valid JSON
```

---

## 🛡️ Safety & Privacy

YouMatter was built with safety as a first principle, not an afterthought.

- 🔒 **End-to-end data isolation** — Supabase RLS ensures users only ever see their own data
- 🚫 **Zero data selling** — we never monetize user health data
- 🆘 **Crisis detection** — keyword monitoring surfaces emergency resources immediately
- 📋 **Clear disclaimers** — every AI output is clearly labelled as non-medical advice
- 🗂️ **Private PDF storage** — lab reports stored in private Supabase buckets, never public
- ⚖️ **Terms & Privacy** — full legal coverage via Termly (free tier)

**Emergency Resources (always accessible):**

| Helpline | Number |
|---|---|
| iCall (India) | 9152987821 |
| Vandrevala Foundation | 1860-2662-345 |
| Snehi | 044-24640050 |
| NIMHANS | 080-46110007 |

---

## 📅 4-Week Roadmap

```
Week 1  ████████░░░░░░░░░░░░  Foundation
        Supabase setup · Auth · DB schema · Next.js scaffold · PDF pipeline

Week 2  ░░░░████████░░░░░░░░  Core AI Features
        Lab report AI · Aasha chat + streaming · Dashboard build

Week 3  ░░░░░░░░████████░░░░  Polish & Safety
        Mobile responsive · Crisis detection · Breathing · Journal

Week 4  ░░░░░░░░░░░░████████  Ship 🚀
        Deploy · ProductHunt · College network · Clinic outreach
        Target: 100–200 users
```

---

## 👥 Team

Built with 💙 by 7 pre-final year CSE-AIML students from **Haldia Istitute of Technology** as part of the **A4E (AI for Everyone)** initiative.

| Role | Responsibility |
|---|---|
| Tech Lead | Architecture · Code Review · API Keys · Supabase |
| Frontend (×2) | Next.js · Components · Tailwind · Animations |
| AI / Backend (×2) | Claude API · PDF Parsing · Vercel Functions |
| Design + Mobile | Figma · Responsive UI · UX Flows |
| Growth + QA | Testing · Analytics · Community · Social Media |

---

## 🤝 Contributing

We welcome contributions from anyone who cares about mental health and accessible healthcare.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/your-amazing-feature

# Commit your changes
git commit -m "Add: your amazing feature"

# Push and open a Pull Request
git push origin feature/your-amazing-feature
```

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for our code of conduct and contribution guidelines.

---

## 📊 KPIs & Metrics

We track the following (via PostHog, privacy-first):

- Daily Active Users
- Lab Reports Uploaded
- Chat Sessions Started (total + per user)
- Breathing Sessions Completed
- Journal Entries Written
- Crisis Panel Views (anonymized)

**Month 1 Target: 100–200 users**

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## ⚠️ Disclaimer

> YouMatter is **not a medical device** and does not provide medical advice, diagnosis, or treatment. All AI-generated content is for educational and informational purposes only. Always consult a qualified healthcare professional before making any health-related decisions. In case of a mental health emergency, please contact your local emergency services or a crisis helpline immediately.

---

<div align="center">

<br/>

Made with 💙 by the A4E Team

*"Taking care of your mind is the bravest thing you can do."*

<br/>

[![Star this repo](https://img.shields.io/github/stars/a4e-team/youmatter?style=social)](https://github.com/a4e-team/youmatter)
[![Follow us](https://img.shields.io/twitter/follow/YouMatterApp?style=social)](https://twitter.com/YouMatterApp)

</div>
